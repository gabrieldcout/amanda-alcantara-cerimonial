"use client";

import Link from "next/link";

export default function AdminError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex max-w-xl flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <h1 className="font-serif-display text-2xl text-foreground">
        Não foi possível concluir esta ação
      </h1>
      <p className="text-sm text-muted-foreground">
        Recarregue a página e tente de novo. Se o erro continuar, mande um print
        desta tela e da página{" "}
        <Link href="/admin/erros" className="text-accent underline">
          Erros do site
        </Link>{" "}
        para o suporte técnico.
      </p>
      <p className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        {error.message}
        {error.digest ? ` (código ${error.digest})` : ""}
      </p>
      <div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}
