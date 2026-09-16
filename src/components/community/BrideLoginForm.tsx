"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/actions/brideAuth";
import type { BrideAuthState } from "@/lib/actions/brideAuth";
import { Button } from "@/components/ui/Button";

const initialState: BrideAuthState = {};

export function BrideLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-accent/25 p-8"
    >
      <div>
        <p className="font-serif-display text-2xl text-foreground">Entrar</p>
        <p className="text-sm text-muted-foreground">Acesse a comunidade</p>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">E-mail</span>
        <input name="email" type="email" required className="input" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Senha</span>
        <input name="password" type="password" required className="input" />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link href="/comunidade/cadastro" className="text-accent hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
