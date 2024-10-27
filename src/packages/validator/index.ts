import { z } from 'zod';

export const description = 'Use this file to place global validation';

export const fileImageValidator = z
  .instanceof(File)
  .refine((file) =>
    ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
  )
  .refine((file) => file?.size <= 5000000);
