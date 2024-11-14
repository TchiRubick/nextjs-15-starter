'use server';

import { upload as s3Upload } from '@/packages/s3';
import { fileImageValidator } from '@/packages/validator';

export const uploadImage = async (files: FileList) => {
  const file = fileImageValidator.parse(files[0]);

  const arrayBuffer = await file.arrayBuffer();

  const buffer = new Uint8Array(arrayBuffer);

  const result = await s3Upload(file.name, Buffer.from(buffer));

  return result;
};
