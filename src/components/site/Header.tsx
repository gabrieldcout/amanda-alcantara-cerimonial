"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Sobre mim" },
  { href: "/manual-noivos", label: "Manual dos Noivos" },
  { href: "/cronograma-contratacao", label: "Cronograma" },
  { href: "/servicos", label: "O que inclui" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/casais", label: "Histórias reais" },
  { href: "/bastidores", label: "Bastidores" },
  { href: "/comunidade", label: "Comunidade Noivas AA" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/duvidas", label: "Dúvidas" },
];

export function Header({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[100rem] items-center justify-between gap-6 px-6">
        <Link href="/" onClick={() => setOpen(false)} aria-label={siteName} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={siteName} className="h-14 w-auto sm:h-16" />
        </Link>

        <div className="hidden md:block">
          <ButtonLink href="/orcamento" className="whitespace-nowrap px-5 py-2.5">
            Solicitar orçamento
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Todas as abas sempre visíveis, sem menu escondido, a partir de tablet */}
      <nav className="hidden md:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border/70 px-6 py-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] tracking-wide transition-colors hover:text-accent whitespace-nowrap ${
              pathname === link.href
                ? "text-accent font-medium"
                : "text-foreground/80"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm ${
                  pathname === link.href
                    ? "bg-muted text-accent font-medium"
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/orcamento" className="mt-2">
              Solicitar orçamento
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
