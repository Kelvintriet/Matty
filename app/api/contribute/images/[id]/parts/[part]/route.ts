import { and, eq } from "drizzle-orm";
import { authorizeContributor } from "@/lib/contributor-access";
import { getDatabase } from "@/lib/db";
import { contributorImages } from "@/lib/db/schema";
import { uploadImagePart } from "@/lib/filebase";
import { imagePartBytes, pendingImageSize } from "@/lib/image-upload";

export async function PUT(request: Request, context: { params: Promise<{ id: string; part: string }> }) {
  try {
    const user = await authorizeContributor(request);
    if (!user) return Response.json({ message: "Access denied." }, { status: 403 });
    const { id, part: partText } = await context.params;
    if (!/^[a-f0-9-]{36}$/i.test(id) || !/^[0-4]$/.test(partText)) return Response.json({ message: "Invalid upload." }, { status: 400 });
    const [image] = await getDatabase().select({ content: contributorImages.content }).from(contributorImages)
      .where(and(eq(contributorImages.id, id), eq(contributorImages.ownerId, user.id))).limit(1);
    const size = image && pendingImageSize(image.content);
    const part = Number(partText);
    if (!size || part >= Math.ceil(size / imagePartBytes)) return Response.json({ message: "Upload not found." }, { status: 404 });
    const expected = Math.min(imagePartBytes, size - part * imagePartBytes);
    const length = Number(request.headers.get("content-length"));
    if (length && length !== expected) return Response.json({ message: "Invalid upload size." }, { status: 400 });
    if (!request.body) return Response.json({ message: "Invalid upload size." }, { status: 400 });
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > expected) {
        await reader.cancel();
        return Response.json({ message: "Invalid upload size." }, { status: 400 });
      }
      chunks.push(value);
    }
    if (received !== expected) return Response.json({ message: "Invalid upload size." }, { status: 400 });
    const data = Buffer.concat(chunks, received);
    await uploadImagePart(id, part, data);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ message: "Unable to upload the image." }, { status: 503 });
  }
}
