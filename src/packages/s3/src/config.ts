import 'server-only';

import { env } from '@/env';
import * as Minio from "minio";

export const s3 = new Minio.Client({
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
  port: 9000,
  region: env.MINIO_REGION,
  endPoint: env.MINIO_DOMAIN,
  useSSL: env.MINIO_SSL === 'true',
});
