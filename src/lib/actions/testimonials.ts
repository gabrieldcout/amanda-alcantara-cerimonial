"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { publicTestimonialSchema, testimonialSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";
import { plainTextToSafeHtml, sanitizeRichText } from "@/lib/sanitizeHtml";

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
      quote: sanitizeRichText(data.quote),
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
      quote: sanitizeRichText(data.quote),
      eventType: data.eventType || null,
      ...(photoUrl ? { photoUrl } : {}),
    },
  });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/depoimentos");
  revalidatePath("/");
}

export type SubmitTestimonialState = {
  error?: string;
  success?: boolean;
};

export async function submitTestimonial(
  _prevState: SubmitTestimonialState,
  formData: FormData,
): Promise<SubmitTestimonialState> {
  const parsed = publicTestimonialSchema.safeParse({
    clientName: formData.get("clientName"),
    eventType: formData.get("eventType"),
    quote: formData.get("quote"),
    rating: formData.get("rating"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const photoUrl = await saveUploadedPhoto(formData.get("photo"));

  await prisma.testimonial.create({
    data: {
      clientName: parsed.data.clientName,
      eventType: parsed.data.eventType || null,
      quote: plainTextToSafeHtml(parsed.data.quote),
      rating: parsed.data.rating,
      photoUrl,
      published: false,
    },
  });

  revalidatePath("/admin/depoimentos");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/depoimentos");
  revalidatePath("/");
}
