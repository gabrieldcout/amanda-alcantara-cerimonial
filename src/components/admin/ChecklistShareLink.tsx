"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function ChecklistShareLink({
  path,
  names,
}: {
  path: string;
  names: string;
}) {
  // A origem (domínio) só existe no navegador; no servidor fica só o caminho.
  const origin = useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin,
    () => ""
  );
  const url = `${origin}${path}`;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt("Copie o link:", url);
    }
  }

  const whatsappText = encodeURIComponent(
    `Oi, ${names}! 💍 Aqui está o checklist do casamento de vocês. É só abrir e ir marcando cada etapa conforme forem concluindo:\n${url}`
  );

  return (
    <div className="flex flex-col gap-3">
      <input readOnly value={url} className="input" onFocus={(e) => e.target.select()} />
      <div className="flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-accent px-4 py-2 text-white hover:bg-accent-dark"
        >
          {copied ? "Link copiado ✓" : "Copiar link"}
        </button>
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-4 py-2 text-foreground hover:bg-muted"
        >
          Enviar pelo WhatsApp
        </a>
        <a
          href={path}
          target="_blank"
          className="rounded-full border border-border px-4 py-2 text-foreground hover:bg-muted"
        >
          Abrir como o casal vê ↗
        </a>
      </div>
    </div>
  );
}
