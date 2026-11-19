"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { SITE_TEXT_FIELDS } from "@/lib/siteTexts";

export async function updateSiteTexts(formData: FormData) {
  await requireAdmin();

  const ops: Prisma.PrismaPromise<unknown>[] = [];
  for (const field of SITE_TEXT_FIELDS) {
    const raw = formData.get(field.key);
    if (typeof raw !== "string") continue;
    const value = raw.replace(/\r\n/g, "\n").trim();
    // Vazio ou igual ao padrão: apaga a linha e volta a valer o texto original.
    if (!value || value === field.default) {
      ops.push(prisma.siteText.deleteMany({ where: { key: field.key } }));
    } else {
      ops.push(
        prisma.siteText.upsert({
          where: { key: field.key },
          update: { value },
          create: { key: field.key, value },
        }),
      );
    }
  }

  await prisma.$transaction(ops);
  revalidatePath("/admin/textos");
  revalidatePath("/");
}
