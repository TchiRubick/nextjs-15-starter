'use server';

import { env } from '@/env';

import { z } from 'zod';

const schemasIncludeAddresses = z.object({
  id: z.string(),
  type: z.literal('addresses'),
  attributes: z.object({
    street: z.string(),
    suite: z.null(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const schemasIncludePhotos = z.object({
  id: z.string(),
  type: z.literal('photos'),
  attributes: z.object({
    url: z.string(),
    order: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

const schemasIncludeAmenities = z.object({
  id: z.string(),
  type: z.literal('amenities'),
  attributes: z.object({ name: z.string(), group: z.string() }),
});

const schema = z.object({
  data: z.array(
    z.union([
      z.object({
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
          description: z.string(),
          bedrooms: z.number(),
          beds: z.number(),
          bathrooms: z.number(),
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
        }),
      }),
      z.object({
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
          description: z.string(),
          bedrooms: z.number(),
          beds: z.number(),
          bathrooms: z.number(),
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
          multi_units: z.object({ data: z.array(z.unknown()) }),
        }),
      }),
    ])
  ),
  included: z.array(
    z.union([
      schemasIncludeAddresses,
      schemasIncludePhotos,
      schemasIncludeAmenities,
    ])
  ),
});

const getAdress = (
  id: string,
  included: z.infer<typeof schema>['included']
) => {
  return included.find((item) => item.id === id && item.type === 'addresses')
    ?.attributes as z.infer<typeof schemasIncludeAddresses>['attributes'];
};

const getPhotos = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  return ids.map(
    (id) =>
      included.find((item) => item.id === id && item.type === 'photos')
        ?.attributes as z.infer<typeof schemasIncludePhotos>['attributes']
  );
};

const getAmenities = (
  ids: string[],
  included: z.infer<typeof schema>['included']
) => {
  const amenities = ids.map(
    (id) =>
      included.find((item) => item.id === id && item.type === 'amenities')
        ?.attributes
  ) as z.infer<typeof schemasIncludeAmenities>['attributes'][];

  const groupedObj = amenities.reduce(
    (acc, amenity) => {
      if (!amenity) return acc;
      const { group, name } = amenity;

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return Object.entries(groupedObj).map(([group, values]) => ({
    group,
    values,
  }));
};

const adapter = (values: z.infer<typeof schema>) => {
  return values.data.map((item) => ({
    id: item.id,
    slug: item.attributes.property_slug,
    description: item.attributes.description,
    name: item.attributes.name ?? item.attributes.nickname,
    direct_url: item.attributes.uplisting_domain,
    currency: item.attributes.currency,
    address: getAdress(item.relationships.address.data.id, values.included),
    photos: getPhotos(
      item.relationships.photos.data.map((item) => item.id),
      values.included
    ),
    amenities: getAmenities(
      item.relationships.amenities.data.map((item) => item.id),
      values.included
    ),
    capacity: item.attributes.maximum_capacity,
    rooms: {
      bedrooms: item.attributes.bedrooms,
      beds: item.attributes.beds,
      bathrooms: item.attributes.bathrooms,
    },
  }));
};

export async function getAvailability() {
  const response = await fetch(`${env.UPLISTING_URL}/availability`, {
    headers: {
      Authorization: `Basic ${env.UPLISTING_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const validatedResponse = schema.parse(await response.json());

  return adapter(validatedResponse);
}
