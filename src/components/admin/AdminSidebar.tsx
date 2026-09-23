"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/actions/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/orcamentos", label: "Pedidos de orçamento" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/casais", label: "Histórias reais" },
  { href: "/admin/bastidores", label: "Bastidores" },
  { href: "/admin/comunidade/posts", label: "Comunidade · Posts" },
  { href: "/admin/comunidade/comentarios", label: "Comunidade · Comentários" },
  { href: "/admin/comunidade/usuarias", label: "Comunidade · Usuárias" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
  { href: "/admin/equipe", label: "Equipe" },
  { href: "/admin/parcerias", label: "Parcerias" },
  { href: "/admin/galeria", label: "Galeria / Portfólio" },
  { href: "/admin/configuracoes", label: "Configurações do site" },
  { href: "/admin/tutorial", label: "Tutorial" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-border px-6 py-6">
        <p className="font-serif-display text-lg text-foreground">Painel Admin</p>
        <p className="text-xs text-muted-foreground">Amanda Cerimonial</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        {LINKS.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-foreground/80 hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted"
        >
          Ver site ↗
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Sair
          </button>
        </form>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Barra superior mobile/tablet */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <p className="font-serif-display text-lg text-foreground">Painel Admin</p>
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </div>

      {/* Sidebar fixa em telas grandes */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <SidebarContent />
      </aside>

      {/* Drawer em telas pequenas/médias */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-card shadow-xl">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
