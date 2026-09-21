"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  const data = siteSettingsSchema.parse({
    heroTitle: formData.get("heroTitle"),
    heroSubtitle: formData.get("heroSubtitle"),
    aboutText: formData.get("aboutText"),
    instagramUrl: formData.get("instagramUrl"),
    tiktokUrl: formData.get("tiktokUrl"),
    whatsappNumber: formData.get("whatsappNumber"),
    email: formData.get("email"),
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      ...data,
      instagramUrl: data.instagramUrl || null,
      tiktokUrl: data.tiktokUrl || null,
      whatsappNumber: data.whatsappNumber || null,
      email: data.email || null,
    },
    create: {
      id: 1,
      ...data,
      instagramUrl: data.instagramUrl || null,
      tiktokUrl: data.tiktokUrl || null,
      whatsappNumber: data.whatsappNumber || null,
      email: data.email || null,
    },
  });

  revalidatePath("/admin/configuracoes");
  revalidatePath("/", "layout");
}
