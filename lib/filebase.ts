import "server-only";

import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const marker = "filebase:v1:";
let client: S3Client | undefined;

function configuration() {
  const bucket = process.env.FILEBASE_BUCKET;
  const accessKeyId = process.env.FILEBASE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.FILEBASE_SECRET_ACCESS_KEY;
  if (!bucket || !accessKeyId || !secretAccessKey) throw new Error("Filebase is not configured.");
  if (!client) {
    client = new S3Client({
      endpoint: "https://s3.filebase.io",
      region: "auto",
      forcePathStyle: true,
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return { client, bucket };
}

export async function uploadContributorImage(id: string, data: Buffer) {
  const { client, bucket } = configuration();
  const key = `contributor-images/${id}.webp`;
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: data, ContentType: "image/webp" }));
  return `${marker}${key}`;
}

export async function readContributorImage(content: string) {
  if (!content.startsWith(marker)) return Buffer.from(content, "base64");
  const key = content.slice(marker.length);
  if (!/^contributor-images\/[a-f0-9-]{36}\.webp$/i.test(key)) throw new Error("Invalid image key.");
  const { client, bucket } = configuration();
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  if (!response.Body || (response.ContentLength && response.ContentLength > 4 * 1024 * 1024)) throw new Error("Invalid image.");
  return Buffer.from(await response.Body.transformToByteArray());
}

export async function removeContributorImage(content: string) {
  if (!content.startsWith(marker)) return;
  const key = content.slice(marker.length);
  if (!/^contributor-images\/[a-f0-9-]{36}\.webp$/i.test(key)) throw new Error("Invalid image key.");
  const { client, bucket } = configuration();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

function stagingKey(id: string, part: number) {
  if (!/^[a-f0-9-]{36}$/i.test(id) || !Number.isInteger(part) || part < 0 || part > 4) {
    throw new Error("Invalid upload part.");
  }
  return `contributor-staging/${id}/${part}`;
}

export async function uploadImagePart(id: string, part: number, data: Buffer) {
  const { client, bucket } = configuration();
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: stagingKey(id, part), Body: data, ContentType: "application/octet-stream" }));
}

export async function readImagePart(id: string, part: number, expectedBytes: number) {
  const { client, bucket } = configuration();
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: stagingKey(id, part) }));
  if (!response.Body || response.ContentLength !== expectedBytes) throw new Error("Invalid upload part.");
  const bytes = Buffer.from(await response.Body.transformToByteArray());
  if (bytes.length !== expectedBytes) throw new Error("Invalid upload part.");
  return bytes;
}

export async function removeImageParts(id: string, count: number) {
  const { client, bucket } = configuration();
  await Promise.all(Array.from({ length: count }, (_, part) =>
    client.send(new DeleteObjectCommand({ Bucket: bucket, Key: stagingKey(id, part) }))));
}
