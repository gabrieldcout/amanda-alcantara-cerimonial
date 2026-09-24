"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Volta um nível na URL do painel (ex: /admin/casais/123 → /admin/casais).
// Não aparece no início do painel (/admin).
export function AdminBackButton() {
  const pathname = usePathname();
  if (!pathname || pathname === "/admin") return null;

  const parent = pathname.split("/").slice(0, -1).join("/") || "/admin";

  return (
    <Link
      href={parent}
      className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <span aria-hidden>←</span> Voltar
    </Link>
  );
}
