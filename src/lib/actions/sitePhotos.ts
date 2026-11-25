"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { saveUploadedPhoto } from "@/lib/uploads";
import crypto from "node:crypto";
import {
  GALLERY_STRIPS,
  type GalleryStripId,
  isGalleryStripId,
  isSitePhotoSlot,
  stripOfSlot,
} from "@/lib/sitePhotos";

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

function newGallerySlot(stripId: GalleryStripId, index: number) {
  return `${stripId}:${Date.now()}-${String(index).padStart(4, "0")}-${crypto.randomUUID().slice(0, 6)}`;
}

// Na primeira foto enviada, as fotos de exemplo viram registros de verdade,
// assim a Amanda pode tirar uma a uma em vez de sumirem todas de uma vez.
async function ensureStripMaterialized(stripId: GalleryStripId) {
  const count = await prisma.sitePhoto.count({ where: { slot: { startsWith: `${stripId}:` } } });
  if (count > 0) return;
  const strip = GALLERY_STRIPS.find((s) => s.id === stripId)!;
  await prisma.sitePhoto.createMany({
    data: strip.defaults.map((url, i) => ({ slot: newGallerySlot(stripId, i), url })),
  });
  // Garante que as próximas fiquem depois das de exemplo na ordem.
  await new Promise((r) => setTimeout(r, 2));
}

function revalidateGallery() {
  revalidatePath("/admin/fotos");
  revalidatePath("/");
}

export async function addGalleryPhotos(stripId: string, formData: FormData) {
  await requireAdmin();
  if (!isGalleryStripId(stripId)) throw new Error("Faixa inválida.");
  const files = formData.getAll("photos");
  const urls: string[] = [];
  for (const file of files) {
    const url = await saveUploadedPhoto(file);
    if (url) urls.push(url);
  }
  if (urls.length === 0) return;
  await ensureStripMaterialized(stripId);
  await prisma.sitePhoto.createMany({
    data: urls.map((url, i) => ({ slot: newGallerySlot(stripId, i), url })),
  });
  revalidateGallery();
}

export async function addGalleryVideo(stripId: string, formData: FormData) {
  await requireAdmin();
  if (!isGalleryStripId(stripId)) throw new Error("Faixa inválida.");
  const url = String(formData.get("url") ?? "").trim();
  if (!/^https?:\/\//i.test(url) || url.length > 190) {
    throw new Error("Cole o link completo do vídeo (começando com https://).");
  }
  await ensureStripMaterialized(stripId);
  await prisma.sitePhoto.create({ data: { slot: newGallerySlot(stripId, 0), url } });
  revalidateGallery();
}

export async function removeGalleryItem(slot: string) {
  await requireAdmin();
  if (!stripOfSlot(slot)) throw new Error("Foto inválida.");
  await prisma.sitePhoto.deleteMany({ where: { slot } });
  revalidateGallery();
}
