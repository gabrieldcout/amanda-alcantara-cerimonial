"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";

function parseForm(formData: FormData) {
  return testimonialSchema.parse({
    clientName: formData.get("clientName"),
    eventType: formData.get("eventType"),
    quote: formData.get("quote"),
    rating: formData.get("rating"),
    published: formData.get("published") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const photoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.testimonial.create({
    data: {
      ...data,
      eventType: data.eventType || null,
      photoUrl,
    },
  });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/depoimentos");
  revalidatePath("/");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const photoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.testimonial.update({
    where: { id },
    data: {
      ...data,
      eventType: data.eventType || null,
      ...(photoUrl ? { photoUrl } : {}),
    },
  });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/depoimentos");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/depoimentos");
  revalidatePath("/");
}
