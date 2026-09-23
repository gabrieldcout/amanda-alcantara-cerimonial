import { mkdir, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";

// Fica fora da pasta do app (que é recriada a cada deploy na Hostinger),
// então as fotos sobrevivem a atualizações de código.
export const UPLOAD_DIR = path.join(os.homedir(), "uploads-persistent", "amandacerimonial");

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

export async function saveUploadedPhoto(value: FormDataEntryValue | null): Promise<string | null> {
  if (!isUploadedFile(value)) return null;

  const ext = EXT_BY_MIME[value.type] ?? value.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await value.arrayBuffer());

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}
