import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getSiteSettings } from "@/lib/data";

// Todas as páginas do site consultam o banco (settings, casais, gallery etc),
// então são renderizadas em runtime (evita pre-render sem DATABASE_URL no build).
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/sobre-mim/paisagem-recepcao.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.05] blur-sm"
        />
      </div>
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Header siteName={settings.heroTitle} />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={settings.heroTitle}
          instagramUrl={settings.instagramUrl}
          tiktokUrl={settings.tiktokUrl}
          whatsappNumber={settings.whatsappNumber}
          email={settings.email}
        />
      </div>
      <WhatsAppButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
