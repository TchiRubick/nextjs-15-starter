import 'server-only';

import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  credentials: {
    accessKeyId: env.S3_APP_ID,
    secretAccessKey: env.S3_APP_KEY,
  },
  endpoint: env.S3_BUCKET_URL,
  region: 'eu-central-003',
});
