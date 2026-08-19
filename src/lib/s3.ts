import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export const S3_BUCKET = process.env.S3_BUCKET_NAME ?? "";
export const S3_BASE_URL = `https://${S3_BUCKET}.s3.${process.env.AWS_REGION ?? "ap-south-1"}.amazonaws.com`;
