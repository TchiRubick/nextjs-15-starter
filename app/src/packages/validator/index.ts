import { z } from 'zod';

export const description = 'Use this file to place global validation';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const fileImageValidator = z
  .instanceof(File, { message: 'File is required' })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    (file) => ({
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB. Got: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    })
  )
  .refine(
    (file) =>
      ACCEPTED_IMAGE_TYPES.includes(
        file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
      ),
    (file) => ({
      message: `Invalid file type. Accepted types are: ${ACCEPTED_IMAGE_TYPES.join(', ')}. Got: ${file.type}`,
    })
  )
  .refine((file) => !file.name.includes('..'), {
    message: 'File name contains invalid characters',
  })
  .refine((file) => file.name.length <= 255, {
    message: 'File name is too long',
  });

// Type for successful validation
export type ValidImageFile = z.infer<typeof fileImageValidator>;
