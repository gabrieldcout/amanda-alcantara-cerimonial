"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  resetPasswordAction,
  type BridePasswordResetState,
} from "@/lib/actions/brideAuth";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";

const initialState: BridePasswordResetState = {};

export function BridePasswordResetForm() {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-accent/25 p-8 text-center">
        <p className="font-serif-display text-2xl text-foreground">
          Senha alterada!
        </p>
        <p className="text-sm text-muted-foreground">
          Você já pode entrar na comunidade com a nova senha.
        </p>
        <Link
          href="/comunidade/entrar"
          className="text-accent hover:underline"
        >
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-accent/25 p-8"
    >
      <div>
        <p className="font-serif-display text-2xl text-foreground">
          Recuperar senha
        </p>
        <p className="text-sm text-muted-foreground">
          Confirme seus dados pra criar uma nova senha.
        </p>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">E-mail</span>
        <input name="email" type="email" required className="input" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">CPF</span>
        <input
          name="cpf"
          type="text"
          required
          inputMode="numeric"
          placeholder="000.000.000-00"
          className="input"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Data de nascimento</span>
        <input name="birthDate" type="date" required className="input" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Nova senha</span>
        <PasswordInput
          name="newPassword"
          required
          minLength={6}
          className="input"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Alterando..." : "Alterar senha"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Lembrou da senha?{" "}
        <Link href="/comunidade/entrar" className="text-accent hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
