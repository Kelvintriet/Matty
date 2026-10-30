export const maxImageBytes = 15 * 1024 * 1024;
export const imagePartBytes = 3 * 1024 * 1024;
export const imageUploadPrefix = "pending-upload:v1:";

export function pendingImageSize(content: string) {
  if (!content.startsWith(imageUploadPrefix)) return null;
  const size = Number(content.slice(imageUploadPrefix.length));
  return Number.isInteger(size) && size > 0 && size <= maxImageBytes ? size : null;
}
