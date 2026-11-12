"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function approvePost(id: string) {
  await requireAdmin();
  await prisma.post.update({ where: { id }, data: { published: true } });
  revalidatePath("/admin/comunidade/posts");
  revalidatePath("/comunidade");
}

export async function deletePostAdmin(id: string) {
  await requireAdmin();
  await prisma.post.deleteMany({ where: { id } });
  revalidatePath("/admin/comunidade/posts");
  revalidatePath("/comunidade");
}

export async function approveComment(id: string) {
  await requireAdmin();
  await prisma.comment.update({ where: { id }, data: { published: true } });
  revalidatePath("/admin/comunidade/comentarios");
}

export async function deleteCommentAdmin(id: string) {
  await requireAdmin();
  await prisma.comment.deleteMany({ where: { id } });
  revalidatePath("/admin/comunidade/comentarios");
}

export async function toggleBanBrideUser(id: string, banned: boolean) {
  await requireAdmin();
  await prisma.brideUser.update({ where: { id }, data: { banned } });
  revalidatePath("/admin/comunidade/usuarias");
}

export async function deleteBrideUser(id: string) {
  await requireAdmin();
  await prisma.brideUser.delete({ where: { id } });
  revalidatePath("/admin/comunidade/usuarias");
}
