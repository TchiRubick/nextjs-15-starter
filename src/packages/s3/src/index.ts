import 'server-only';

import { env } from '@/env';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from './config';

export const upload = async (
  name: string,
  body: PutObjectCommand['input']['Body']
) =>
  s3.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: name,
      Body: body,
    })
  );
