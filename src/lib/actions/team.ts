"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";
import { saveUploadedPhoto } from "@/lib/uploads";

function parseForm(formData: FormData) {
  return teamMemberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio"),
    published: formData.get("published") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createTeamMember(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const photoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.teamMember.create({
    data: { ...data, bio: data.bio || null, photoUrl },
  });
  revalidatePath("/admin/equipe");
  revalidatePath("/equipe");
  revalidatePath("/");
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  const photoUrl = await saveUploadedPhoto(formData.get("photo"));
  await prisma.teamMember.update({
    where: { id },
    data: { ...data, bio: data.bio || null, ...(photoUrl ? { photoUrl } : {}) },
  });
  revalidatePath("/admin/equipe");
  revalidatePath("/equipe");
  revalidatePath("/");
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/equipe");
  revalidatePath("/equipe");
  revalidatePath("/");
}
