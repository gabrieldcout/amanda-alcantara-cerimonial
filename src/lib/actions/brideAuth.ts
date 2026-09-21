"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createBrideSession,
  destroyBrideSession,
  hashPassword,
  verifyPassword,
} from "@/lib/brideAuth";
import {
  brideLoginSchema,
  brideSignupSchema,
  bridePasswordResetSchema,
} from "@/lib/validations";

export type BrideAuthState = {
  error?: string;
};

export async function signupAction(
  _prevState: BrideAuthState,
  formData: FormData
): Promise<BrideAuthState> {
  const parsed = brideSignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    cpf: formData.get("cpf"),
    birthDate: formData.get("birthDate"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { name, email, password, cpf, birthDate } = parsed.data;

  const existing = await prisma.brideUser.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing) {
    return { error: "Já existe uma conta com esse e-mail." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.brideUser.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      cpf,
      birthDate: new Date(birthDate),
    },
  });

  await createBrideSession({ userId: user.id, name: user.name });
  redirect("/comunidade");
}

export type BridePasswordResetState = {
  error?: string;
  success?: boolean;
};

export async function resetPasswordAction(
  _prevState: BridePasswordResetState,
  formData: FormData
): Promise<BridePasswordResetState> {
  const parsed = bridePasswordResetSchema.safeParse({
    email: formData.get("email"),
    cpf: formData.get("cpf"),
    birthDate: formData.get("birthDate"),
    newPassword: formData.get("newPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { email, cpf, birthDate, newPassword } = parsed.data;

  const user = await prisma.brideUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  // Mensagem genérica pra não vazar se o e-mail existe ou não.
  const genericError = "Dados não conferem. Verifique e-mail, CPF e data de nascimento.";

  if (!user) return { error: genericError };
  if (user.cpf !== cpf) return { error: genericError };

  const storedDate = user.birthDate.toISOString().slice(0, 10);
  if (storedDate !== birthDate) return { error: genericError };

  if (user.banned) return { error: "Esta conta foi bloqueada." };

  const passwordHash = await hashPassword(newPassword);
  await prisma.brideUser.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return { success: true };
}

export async function loginAction(
  _prevState: BrideAuthState,
  formData: FormData
): Promise<BrideAuthState> {
  const parsed = brideLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { email, password } = parsed.data;

  const user = await prisma.brideUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "E-mail ou senha incorretos." };
  }

  if (user.banned) {
    return { error: "Esta conta foi bloqueada." };
  }

  await createBrideSession({ userId: user.id, name: user.name });
  redirect("/comunidade");
}

export async function logoutAction() {
  await destroyBrideSession();
  redirect("/comunidade");
}
