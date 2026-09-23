"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { backstageMediaSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";

export async function createBackstageMedia(formData: FormData) {
  await requireAdmin();
  const type = formData.get("type");

  let url: string;
  if (type === "photo") {
    const uploaded = await saveUploadedPhoto(formData.get("photo"));
    if (!uploaded) throw new Error("Selecione uma foto para enviar");
    url = uploaded;
  } else {
    url = String(formData.get("url") || "").trim();
    if (!url) throw new Error("Informe a URL do vídeo");
  }

  const data = backstageMediaSchema.parse({
    type,
    url,
    caption: formData.get("caption"),
    published: formData.get("published") === "on",
    order: formData.get("order") || 0,
  });

  await prisma.backstageMedia.create({
    data: { ...data, caption: data.caption || null },
  });
  revalidatePath("/admin/bastidores");
  revalidatePath("/bastidores");
}

export async function deleteBackstageMedia(id: string) {
  await requireAdmin();
  await prisma.backstageMedia.delete({ where: { id } });
  revalidatePath("/admin/bastidores");
  revalidatePath("/bastidores");
}
