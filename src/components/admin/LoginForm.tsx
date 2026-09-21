"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { AdminField } from "@/components/admin/AdminField";
import { PasswordInput } from "@/components/ui/PasswordInput";

const initialState: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      <p className="font-serif-display text-2xl text-foreground">Painel Admin</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Amanda Alcântara Cerimonial
      </p>

      <input type="hidden" name="next" value={next} />

      <div className="mt-6 flex flex-col gap-4">
        <AdminField label="E-mail" name="email">
          <input name="email" type="email" required className="input" />
        </AdminField>
        <AdminField label="Senha" name="password">
          <PasswordInput name="password" required className="input" />
        </AdminField>
      </div>

      {state.error && (
        <p className="mt-4 text-sm text-red-600">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending} className="mt-6 w-full">
        {isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
