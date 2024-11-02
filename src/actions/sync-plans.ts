import 'server-only';

import { env } from '@/env';
import {
  getProduct,
  listPrices,
  listProducts,
  Variant,
  type ListPrices,
} from '@lemonsqueezy/lemonsqueezy.js';
import { createPlan, getPlans, PlanSelect } from '@packages/db/models/plan';
import { configureLemonSqueezy } from '@packages/payment';

type VariantData = Variant['data'];
type PriceAttributes = ListPrices['data'][number]['attributes'];

const formatPrice = (price: number | string | null): string => {
  return price?.toString() ?? '';
};

const isValidVariant = (
  variant: VariantData,
  allVariants: VariantData[]
): boolean => variant.attributes.status !== 'draft' && allVariants.length === 1;

const extractPriceInfo = (priceAttributes: PriceAttributes) => {
  const isUsageBased = priceAttributes.usage_aggregation !== null;
  return {
    isUsageBased,
    price: isUsageBased
      ? priceAttributes.unit_price_decimal
      : priceAttributes.unit_price,
    interval: priceAttributes.renewal_interval_unit,
    intervalCount: priceAttributes.renewal_interval_quantity,
    trialInterval: priceAttributes.trial_interval_unit,
    trialIntervalCount: priceAttributes.trial_interval_quantity,
  };
};

async function getProductName(productId: number): Promise<string> {
  try {
    const product = await getProduct(productId);
    return product.data?.data.attributes.name ?? '';
  } catch (error) {
    console.error(`Failed to fetch product name for ID ${productId}:`, error);
    return '';
  }
}

async function processVariant(variant: VariantData): Promise<PlanSelect> {
  const productName = await getProductName(variant.attributes.product_id);

  const priceResponse = await listPrices({
    filter: { variantId: variant.id },
  });

  const currentPrice = priceResponse.data?.data[0]?.attributes;

  if (!currentPrice) {
    throw new Error(`No price found for variant ${variant.id}`);
  }

  const {
    isUsageBased,
    price,
    interval,
    intervalCount,
    trialInterval,
    trialIntervalCount,
  } = extractPriceInfo(currentPrice);

  return {
    id: parseInt(variant.id),
    variantId: parseInt(variant.id),
    name: variant.attributes.name,
    description: variant.attributes.description,
    price: formatPrice(price),
    interval: interval ?? null,
    intervalCount: intervalCount ?? null,
    isUsageBased,
    productId: variant.attributes.product_id,
    productName,
    trialInterval: trialInterval ?? null,
    trialIntervalCount: trialIntervalCount ?? null,
    sort: variant.attributes.sort,
  };
}

export async function syncPlans() {
  try {
    configureLemonSqueezy();
    const existingPlans = await getPlans();

    const products = await listProducts({
      filter: { storeId: env.LEMONSQUEEZY_STORE_ID },
      include: ['variants'],
    });

    const variants = products.data?.included as VariantData[] | undefined;
    if (!variants) {
      console.warn('No variants found to sync');
      return existingPlans;
    }

    for (const variant of variants) {
      if (!isValidVariant(variant, variants)) continue;

      try {
        const planData = await processVariant(variant);
        console.log(`Syncing variant ${planData.name} with the database...`);

        await createPlan(planData);
        existingPlans.push(planData);

        console.log(`${planData.name} successfully synced with the database`);
      } catch (error) {
        console.error(`Failed to sync variant ${variant.id}:`, error);
      }
    }

    return existingPlans;
  } catch (error) {
    console.error('Failed to sync plans:', error);
    throw new Error('Failed to sync plans with LemonSqueezy');
  }
}
