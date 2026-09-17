import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/", label: "Sobre mim" },
  { href: "/manual-noivos", label: "Manual dos Noivos" },
  { href: "/cronograma-contratacao", label: "Cronograma de Contratação" },
  { href: "/servicos", label: "O que inclui" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/casais", label: "Histórias reais" },
  { href: "/bastidores", label: "Bastidores" },
  { href: "/comunidade", label: "Comunidade Noivas AA" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/orcamento", label: "Orçamento" },
];

export function Footer({
  siteName,
  instagramUrl,
  whatsappNumber,
  email,
}: {
  siteName: string;
  instagramUrl?: string | null;
  whatsappNumber?: string | null;
  email?: string | null;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-serif-display text-xl text-foreground">{siteName}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Assessoria intencional, estratégica e personalizada para quem
            deseja viver o grande dia.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Navegação
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Contato
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  Instagram
                </a>
              </li>
            )}
            {whatsappNumber && (
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container>
          <p className="text-center text-xs text-muted-foreground">
            © {year} {siteName}. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
