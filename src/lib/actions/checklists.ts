"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  CHECKLIST_PHASES,
  buildDefaultChecklistItems,
} from "@/lib/checklistTemplate";
import { toChecklistItemView } from "@/lib/checklistItemView";

const titleSchema = z.string().trim().min(1, "Escreva o item").max(191);
const noteSchema = z.string().trim().max(2000);
const phaseSchema = z.coerce
  .number()
  .int()
  .min(0)
  .max(CHECKLIST_PHASES.length - 1);

function newToken() {
  return randomBytes(18).toString("base64url");
}

function revalidateChecklist(checklist: ChecklistRef) {
  revalidatePath("/admin/checklists");
  revalidatePath(`/admin/checklists/${checklist.id}`);
  revalidatePath(`/admin/casais/${checklist.coupleId}`);
  revalidatePath(`/checklist/${checklist.token}`);
}

// ---- Admin ----

// Só dá pra criar o checklist de um casal já cadastrado em "Histórias reais"
// com a data do casamento preenchida.
export async function createChecklist(coupleId: string, formData: FormData) {
  await requireAdmin();
  const couple = await prisma.couple.findUniqueOrThrow({
    where: { id: coupleId },
    include: { checklist: true },
  });
  if (couple.checklist) redirect(`/admin/checklists/${couple.checklist.id}`);
  if (!couple.weddingDate) {
    throw new Error("Cadastre a data do casamento antes de criar o checklist");
  }

  const useTemplate = formData.get("useTemplate") === "on";
  const checklist = await prisma.clientChecklist.create({
    data: {
      coupleId,
      token: newToken(),
      items: { create: useTemplate ? buildDefaultChecklistItems() : [] },
    },
  });
  revalidateChecklist(checklist);
  redirect(`/admin/checklists/${checklist.id}`);
}

// Gera um link novo — o antigo para de funcionar (útil se o link vazou).
export async function regenerateChecklistToken(id: string) {
  await requireAdmin();
  const old = await prisma.clientChecklist.findUniqueOrThrow({ where: { id } });
  const checklist = await prisma.clientChecklist.update({
    where: { id },
    data: { token: newToken() },
  });
  revalidatePath(`/checklist/${old.token}`);
  revalidateChecklist(checklist);
}

export async function deleteChecklist(id: string) {
  await requireAdmin();
  const checklist = await prisma.clientChecklist.delete({ where: { id } });
  revalidateChecklist(checklist);
  redirect("/admin/checklists");
}

async function getAdminChecklist(checklistId: string) {
  await requireAdmin();
  return prisma.clientChecklist.findUniqueOrThrow({
    where: { id: checklistId },
  });
}

export async function adminToggleItem(
  checklistId: string,
  itemId: string,
  done: boolean
) {
  const checklist = await getAdminChecklist(checklistId);
  return setItemDone(checklist, itemId, done);
}

export async function adminSaveItemNote(
  checklistId: string,
  itemId: string,
  note: string
) {
  const checklist = await getAdminChecklist(checklistId);
  return setItemNote(checklist, itemId, note);
}

export async function adminAddItem(
  checklistId: string,
  phase: number,
  title: string,
  priority = false
) {
  const checklist = await getAdminChecklist(checklistId);
  return addItem(checklist, phase, title, false, priority === true);
}

// Editar texto, fase e prioridade de um item (ex: durante a reunião de
// briefing com o casal).
export async function adminUpdateItem(
  checklistId: string,
  itemId: string,
  changes: { title: string; phase: number; priority: boolean }
) {
  const checklist = await getAdminChecklist(checklistId);
  const current = await findItem(checklist, itemId);
  const title = titleSchema.parse(changes.title);
  const phase = phaseSchema.parse(changes.phase);

  let order = current.order;
  if (phase !== current.phase) {
    const last = await prisma.checklistItem.findFirst({
      where: { checklistId: checklist.id, phase },
      orderBy: { order: "desc" },
    });
    order = (last?.order ?? -1) + 1;
  }

  const item = await prisma.checklistItem.update({
    where: { id: itemId },
    data: { title, phase, order, priority: changes.priority === true },
  });
  revalidateChecklist(checklist);
  return toChecklistItemView(item);
}

export async function adminSetNotApplicable(
  checklistId: string,
  itemId: string,
  value: boolean
) {
  const checklist = await getAdminChecklist(checklistId);
  return setItemNotApplicable(checklist, itemId, value, false);
}

export async function adminDeleteItem(checklistId: string, itemId: string) {
  const checklist = await getAdminChecklist(checklistId);
  await prisma.checklistItem.deleteMany({
    where: { id: itemId, checklistId: checklist.id },
  });
  revalidateChecklist(checklist);
}

// ---- Casal (acesso pelo link privado) ----

async function getChecklistByToken(token: string) {
  const checklist = await prisma.clientChecklist.findUnique({
    where: { token },
  });
  if (!checklist) throw new Error("Checklist não encontrado");
  return checklist;
}

export async function coupleToggleItem(
  token: string,
  itemId: string,
  done: boolean
) {
  const checklist = await getChecklistByToken(token);
  return setItemDone(checklist, itemId, done);
}

export async function coupleSaveItemNote(
  token: string,
  itemId: string,
  note: string
) {
  const checklist = await getChecklistByToken(token);
  return setItemNote(checklist, itemId, note);
}

export async function coupleAddItem(token: string, phase: number, title: string) {
  const checklist = await getChecklistByToken(token);
  return addItem(checklist, phase, title, true);
}

export async function coupleSetNotApplicable(
  token: string,
  itemId: string,
  value: boolean
) {
  const checklist = await getChecklistByToken(token);
  return setItemNotApplicable(checklist, itemId, value, true);
}

// O casal só pode apagar os itens que ele mesmo adicionou.
export async function coupleDeleteItem(token: string, itemId: string) {
  const checklist = await getChecklistByToken(token);
  await prisma.checklistItem.deleteMany({
    where: { id: itemId, checklistId: checklist.id, addedByCouple: true },
  });
  revalidateChecklist(checklist);
}

// ---- Compartilhado ----

type ChecklistRef = { id: string; token: string; coupleId: string };

async function findItem(checklist: ChecklistRef, itemId: string) {
  const item = await prisma.checklistItem.findFirst({
    where: { id: itemId, checklistId: checklist.id },
  });
  if (!item) throw new Error("Item não encontrado");
  return item;
}

async function setItemDone(
  checklist: ChecklistRef,
  itemId: string,
  done: boolean
) {
  await findItem(checklist, itemId);
  const item = await prisma.checklistItem.update({
    where: { id: itemId },
    data: { done, doneAt: done ? new Date() : null },
  });
  revalidateChecklist(checklist);
  return toChecklistItemView(item);
}

async function setItemNotApplicable(
  checklist: ChecklistRef,
  itemId: string,
  value: boolean,
  byCouple: boolean
) {
  await findItem(checklist, itemId);
  const item = await prisma.checklistItem.update({
    where: { id: itemId },
    data: {
      notApplicable: value,
      notApplicableByCouple: value && byCouple,
      // Um item que "não se aplica" não fica como concluído.
      ...(value ? { done: false, doneAt: null } : {}),
    },
  });
  revalidateChecklist(checklist);
  return toChecklistItemView(item);
}

async function setItemNote(
  checklist: ChecklistRef,
  itemId: string,
  note: string
) {
  await findItem(checklist, itemId);
  const parsed = noteSchema.parse(note);
  const item = await prisma.checklistItem.update({
    where: { id: itemId },
    data: { note: parsed || null },
  });
  revalidateChecklist(checklist);
  return toChecklistItemView(item);
}

async function addItem(
  checklist: ChecklistRef,
  phase: number,
  title: string,
  addedByCouple: boolean,
  priority = false
) {
  const parsedPhase = phaseSchema.parse(phase);
  const parsedTitle = titleSchema.parse(title);
  const last = await prisma.checklistItem.findFirst({
    where: { checklistId: checklist.id, phase: parsedPhase },
    orderBy: { order: "desc" },
  });
  const item = await prisma.checklistItem.create({
    data: {
      checklistId: checklist.id,
      phase: parsedPhase,
      title: parsedTitle,
      addedByCouple,
      priority,
      order: (last?.order ?? -1) + 1,
    },
  });
  revalidateChecklist(checklist);
  return toChecklistItemView(item);
}
