'use server';

import { env } from '@/env';
import InternalError from '@/lib/error';

import { z } from 'zod';

const addressSchema = z.object({
  id: z.string(),
  type: z.literal('addresses'),
  attributes: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const photoSchema = z.object({
  id: z.string(),
  type: z.literal('photos'),
  attributes: z.object({
    url: z.string(),
    order: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

const amenitiesSchema = z.object({
  id: z.string(),
  type: z.literal('amenities'),
  attributes: z.object({ name: z.string(), group: z.string() }),
});

const multiUnitsSchema = z.object({
  id: z.string(),
  type: z.literal('multi_units'),
  attributes: z.object({ name: z.string() }),
});

const propertyFeesSchema = z.object({
  id: z.string(),
  type: z.literal('property_fees'),
  attributes: z.object({
    name: z.string(),
    label: z.string(),
    enabled: z.boolean(),
    guests_included: z.null(),
    amount: z.number(),
  }),
});

const propertyTaxesSchemas = z.object({
  id: z.string(),
  type: z.literal('property_taxes'),
  attributes: z.object({
    name: z.string(),
    label: z.string(),
    type: z.string(),
    per: z.string(),
    amount: z.number(),
  }),
});

const propertyDiscountsSchema = z.object({
  id: z.string(),
  type: z.literal('property_discounts'),
  attributes: z.object({
    name: z.string(),
    label: z.string(),
    type: z.string(),
    days: z.number(),
    amount: z.number(),
  }),
});

const suitabilitySchema = z.object({
  id: z.string(),
  type: z.literal('suitabilities'),
  attributes: z.object({
    children: z.boolean(),
    pets: z.boolean(),
    events: z.boolean(),
    smoking: z.boolean(),
  }),
});

const policySchema = z.object({
  id: z.string(),
  type: z.literal('policies'),
  attributes: z.object({ type: z.string(), description: z.string() }),
});

const protectSecurityDepositSettingSchema = z.object({
  id: z.string(),
  type: z.literal('protect_security_deposit_settings'),
  attributes: z.object({ amount: z.number(), enabled: z.boolean() }),
});

const schema = z.object({
  data: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.object({
      name: z.string(),
      nickname: z.string(),
      currency: z.string(),
      time_zone: z.string(),
      check_in_time: z.number(),
      check_out_time: z.number(),
      type: z.string(),
      maximum_capacity: z.number(),
      bedrooms: z.number(),
      beds: z.number(),
      bathrooms: z.number(),
      bed_types: z.array(z.string()),
      description: z.string(),
      created_at: z.string(),
      uplisting_domain: z.string(),
      property_slug: z.string(),
    }),
    relationships: z.object({
      address: z.object({
        data: z.object({ id: z.string(), type: z.string() }),
      }),
      photos: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      amenities: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      multi_units: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      fees: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      taxes: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      discounts: z.object({
        data: z.array(z.object({ id: z.string(), type: z.string() })),
      }),
      suitability: z.object({
        data: z.object({ id: z.string(), type: z.string() }),
      }),
      policy: z.object({
        data: z.object({ id: z.string(), type: z.string() }),
      }),
      protect_security_deposit_setting: z.object({
        data: z.object({ id: z.string(), type: z.string() }),
      }),
    }),
  }),
  included: z.array(
    z.union([
      addressSchema,
      photoSchema,
      amenitiesSchema,
      multiUnitsSchema,
      propertyFeesSchema,
      propertyTaxesSchemas,
      propertyDiscountsSchema,
      suitabilitySchema,
      policySchema,
      protectSecurityDepositSettingSchema,
    ])
  ),
});

const getAdress = (
  id: string,
  included: z.infer<typeof schema>['included']
) => {
  const address = included.find(
    (item) => item.id === id && item.type === 'addresses'
  );
  return address?.attributes as z.infer<typeof addressSchema>['attributes'];
};

const getPhotos = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter((item) => ids.includes(item.id) && item.type === 'photos')
    .map((item) => item.attributes) as z.infer<
    typeof photoSchema
  >['attributes'][];
};

const getAmenities = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter((item) => ids.includes(item.id) && item.type === 'amenities')
    .map((item) => item.attributes) as z.infer<
    typeof amenitiesSchema
  >['attributes'][];
};

const getMultiUnits = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter((item) => ids.includes(item.id) && item.type === 'multi_units')
    .map((item) => item.attributes) as z.infer<
    typeof multiUnitsSchema
  >['attributes'][];
};

const getPropertyFees = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter((item) => ids.includes(item.id) && item.type === 'property_fees')
    .map((item) => item.attributes) as z.infer<
    typeof propertyFeesSchema
  >['attributes'][];
};

const getPropertyTaxes = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter((item) => ids.includes(item.id) && item.type === 'property_taxes')
    .map((item) => item.attributes) as z.infer<
    typeof propertyTaxesSchemas
  >['attributes'][];
};

const getPropertyDiscounts = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return included
    .filter(
      (item) => ids.includes(item.id) && item.type === 'property_discounts'
    )
    .map((item) => item.attributes) as z.infer<
    typeof propertyDiscountsSchema
  >['attributes'][];
};

const getSuitability = (
  id: string,
  included: z.infer<typeof schema>['included']
) => {
  const suitability = included.find(
    (item) => item.id === id && item.type === 'suitabilities'
  );
  return suitability?.attributes as z.infer<
    typeof suitabilitySchema
  >['attributes'];
};

const getPolicy = (
  id: string,
  included: z.infer<typeof schema>['included']
) => {
  const policy = included.find(
    (item) => item.id === id && item.type === 'policies'
  );
  return policy?.attributes as z.infer<typeof policySchema>['attributes'];
};

const getProtectSecurityDepositSetting = (
  id: string,
  included: z.infer<typeof schema>['included']
) => {
  const protectSecurityDepositSetting = included.find(
    (item) =>
      item.id === id && item.type === 'protect_security_deposit_settings'
  );
  return protectSecurityDepositSetting?.attributes as z.infer<
    typeof protectSecurityDepositSettingSchema
  >['attributes'];
};

const adapter = (item: z.infer<typeof schema>) => ({
  id: item.data.id,
  slug: item.data.attributes.property_slug,
  description: item.data.attributes.description,
  name: item.data.attributes.name ?? item.data.attributes.nickname,
  direct_url: item.data.attributes.uplisting_domain,
  currency: item.data.attributes.currency,
  address: getAdress(item.data.relationships.address.data.id, item.included),
  capacity: item.data.attributes.maximum_capacity,
  photos: getPhotos(
    item.data.relationships.photos.data.map((item) => item.id),
    item.included
  ),
  amenities: getAmenities(
    item.data.relationships.amenities.data.map((item) => item.id),
    item.included
  ),
  multi_units: getMultiUnits(
    item.data.relationships.multi_units.data.map((item) => item.id),
    item.included
  ),
  property_fees: getPropertyFees(
    item.data.relationships.fees.data.map((item) => item.id),
    item.included
  ),
  property_taxes: getPropertyTaxes(
    item.data.relationships.taxes.data.map((item) => item.id),
    item.included
  ),
  property_discounts: getPropertyDiscounts(
    item.data.relationships.discounts.data.map((item) => item.id),
    item.included
  ),
  suitability: getSuitability(
    item.data.relationships.suitability.data.id,
    item.included
  ),
  policy: getPolicy(item.data.relationships.policy.data.id, item.included),
  protect_security_deposit_setting: getProtectSecurityDepositSetting(
    item.data.relationships.protect_security_deposit_setting.data.id,
    item.included
  ),
  rooms: {
    bedrooms: item.data.attributes.bedrooms,
    beds: item.data.attributes.beds,
    bathrooms: item.data.attributes.bathrooms,
  },
});

export async function getProperty(id: number | string) {
  try {
    const response = await fetch(`${env.UPLISTING_URL}/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${env.UPLISTING_API_KEY}`,
      },
    });

    const validatedResponse = schema.parse(await response.json());

    return adapter(validatedResponse);
  } catch (error) {
    console.error('UPLISTING_ERROR', error);
    return new InternalError(
      'Failed to fetch property from Uplisting',
      'UPLISTING_ERROR'
    );
  }
}
