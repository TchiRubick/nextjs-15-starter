import 'server-only';

import { env } from '@/env';
import {
  getProduct,
  listPrices,
  listProducts,
  Variant,
} from '@lemonsqueezy/lemonsqueezy.js';
import { createPlan, getPlans, PlanSelect } from '@packages/db/models/plan';
import { configureLemonSqueezy } from '@packages/payment';

export const syncPlans = async () => {
  configureLemonSqueezy();

  const productVariants = await getPlans();

  const _addVariant = async (variant: PlanSelect) => {
    console.log(`Syncing variant ${variant.name} with the database...`);

    await createPlan(variant);

    console.log(`${variant.name} synced with the database...`);

    productVariants.push(variant);
  };

  const products = await listProducts({
    filter: { storeId: env.LEMONSQUEEZY_STORE_ID },
    include: ['variants'],
  });

  const allVariants = products.data?.included as Variant['data'][] | undefined;

  if (allVariants) {
    for (const v of allVariants) {
      const variant = v.attributes;

      if (variant.status === 'draft' || allVariants.length !== 1) {
        continue;
      }

      const productName =
        (await getProduct(variant.product_id)).data?.data.attributes.name ?? '';

      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      const currentPriceObj = variantPriceObject.data?.data.at(0);
      const isUsageBased =
        currentPriceObj?.attributes.usage_aggregation !== null;
      const interval = currentPriceObj?.attributes.renewal_interval_unit;
      const intervalCount =
        currentPriceObj?.attributes.renewal_interval_quantity;
      const trialInterval = currentPriceObj?.attributes.trial_interval_unit;
      const trialIntervalCount =
        currentPriceObj?.attributes.trial_interval_quantity;

      const price = isUsageBased
        ? currentPriceObj?.attributes.unit_price_decimal
        : currentPriceObj.attributes.unit_price;

      const priceString = price !== null ? (price?.toString() ?? '') : '';

      await _addVariant({
        name: variant.name,
        description: variant.description,
        price: priceString,
        interval: interval ?? null,
        intervalCount: intervalCount ?? null,
        isUsageBased,
        productId: variant.product_id,
        productName,
        variantId: parseInt(v.id) as unknown as number,
        trialInterval: trialInterval ?? null,
        trialIntervalCount: trialIntervalCount ?? null,
        sort: variant.sort,
        id: parseInt(v.id) as unknown as number,
      });
    }
  }

  return productVariants;
};
