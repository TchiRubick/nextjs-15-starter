import 'server-only';

import { env } from '@/env';
import { s3 } from './config';

export const upload = async (name: string, body: Buffer) => {
  const existBucket = await s3.bucketExists(env.MINIO_BUCKET_NAME);

  if (!existBucket) {
    await s3.makeBucket(env.MINIO_BUCKET_NAME, env.MINIO_REGION, {
      ObjectLocking: false,
    });
  }

  return await s3.putObject(env.MINIO_BUCKET_NAME, name, body, undefined, {
    'Content-type': 'image',
  });
};
