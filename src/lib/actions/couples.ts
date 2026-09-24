"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { coupleMediaSchema, coupleSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";
import { sanitizeRichText } from "@/lib/sanitizeHtml";

function parseCoupleForm(formData: FormData) {
  return coupleSchema.parse({
    names: formData.get("names"),
    slug: formData.get("slug"),
    weddingDate: formData.get("weddingDate"),
    story: formData.get("story"),
    published: formData.get("published") === "on",
    showInStories: formData.get("showInStories") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createCouple(formData: FormData) {
  await requireAdmin();
  const data = parseCoupleForm(formData);
  const coverUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.couple.create({
    data: {
      ...data,
      weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
      coverUrl,
      story: data.story ? sanitizeRichText(data.story) : null,
    },
  });
  revalidatePath("/admin/casais");
  revalidatePath("/admin/checklists");
  revalidatePath("/casais");
}

export async function updateCouple(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseCoupleForm(formData);
  const coverUrl = await saveUploadedPhoto(formData.get("photo"));
  const couple = await prisma.couple.update({
    where: { id },
    data: {
      ...data,
      weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
      ...(coverUrl ? { coverUrl } : {}),
      story: data.story ? sanitizeRichText(data.story) : null,
    },
  });
  revalidatePath("/admin/casais");
  revalidatePath(`/admin/casais/${id}`);
  revalidatePath("/admin/checklists");
  revalidatePath("/casais");
  revalidatePath(`/casais/${couple.slug}`);
}

export async function deleteCouple(id: string) {
  await requireAdmin();
  const couple = await prisma.couple.delete({ where: { id } });
  revalidatePath("/admin/casais");
  revalidatePath("/admin/checklists");
  revalidatePath("/casais");
  revalidatePath(`/casais/${couple.slug}`);
}

export async function addCoupleMedia(coupleId: string, formData: FormData) {
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

  const data = coupleMediaSchema.parse({
    type,
    url,
    caption: formData.get("caption"),
    order: formData.get("order") || 0,
  });

  await prisma.coupleMedia.create({
    data: { ...data, coupleId, caption: data.caption || null },
  });

  revalidatePath(`/admin/casais/${coupleId}`);

  const couple = await prisma.couple.findUnique({ where: { id: coupleId } });
  if (couple) revalidatePath(`/casais/${couple.slug}`);
}

export async function deleteCoupleMedia(id: string, coupleId: string) {
  await requireAdmin();
  await prisma.coupleMedia.delete({ where: { id } });
  revalidatePath(`/admin/casais/${coupleId}`);

  const couple = await prisma.couple.findUnique({ where: { id: coupleId } });
  if (couple) revalidatePath(`/casais/${couple.slug}`);
}
