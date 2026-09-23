"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { partnerSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";

function parseForm(formData: FormData) {
  return partnerSchema.parse({
    name: formData.get("name"),
    category: formData.get("category"),
    website: formData.get("website"),
    published: formData.get("published") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createPartner(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const logoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.partner.create({
    data: {
      ...data,
      category: data.category || null,
      logoUrl,
      website: data.website || null,
    },
  });
  revalidatePath("/admin/parcerias");
  revalidatePath("/parcerias");
  revalidatePath("/");
}

export async function updatePartner(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const logoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.partner.update({
    where: { id },
    data: {
      ...data,
      category: data.category || null,
      ...(logoUrl ? { logoUrl } : {}),
      website: data.website || null,
    },
  });
  revalidatePath("/admin/parcerias");
  revalidatePath("/parcerias");
  revalidatePath("/");
}

export async function deletePartner(id: string) {
  await requireAdmin();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/parcerias");
  revalidatePath("/parcerias");
  revalidatePath("/");
}
