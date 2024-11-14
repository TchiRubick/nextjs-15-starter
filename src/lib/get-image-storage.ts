import { env } from "@/env";

export const getImageStorage = (name: string) => {
  return `http${env.MINIO_SSL === 'true' ? 's' : ''}://${env.MINIO_DOMAIN}:9000/${env.MINIO_BUCKET_NAME}/${name}`;
};
