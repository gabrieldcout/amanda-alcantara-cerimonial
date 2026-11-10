"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { saveUploadedPhoto } from "@/lib/uploads";
import { isSitePhotoSlot } from "@/lib/sitePhotos";

export async function updateSitePhoto(slot: string, formData: FormData) {
  await requireAdmin();
  if (!isSitePhotoSlot(slot)) throw new Error("Foto inválida.");
  const url = await saveUploadedPhoto(formData.get("photo"));
  if (!url) return;
  await prisma.sitePhoto.upsert({
    where: { slot },
    update: { url },
    create: { slot, url },
  });
  revalidatePath("/admin/fotos");
  revalidatePath("/");
}

export async function resetSitePhoto(slot: string) {
  await requireAdmin();
  if (!isSitePhotoSlot(slot)) throw new Error("Foto inválida.");
  await prisma.sitePhoto.deleteMany({ where: { slot } });
  revalidatePath("/admin/fotos");
  revalidatePath("/");
}
