import { prisma } from "@/lib/prisma";

export const SITE_PHOTO_SLOTS = [
  { slot: "hero", section: "Topo da página", label: "Fundo do topo", src: "/fotos/sobre-mim/por-do-sol-caminhando.jpg" },
  { slot: "sobre-mim", section: "Sobre mim", label: "Foto da Amanda", src: "/fotos/sobre-mim/amanda-poltrona.jpg" },
  { slot: "compromisso-1", section: "O meu compromisso", label: "Foto da esquerda", src: "/fotos/sobre-mim/casal-cerimonia-1.jpg" },
  { slot: "compromisso-2", section: "O meu compromisso", label: "Foto da direita", src: "/fotos/sobre-mim/casal-beijo-noite.jpg" },
  { slot: "assessoria-1", section: "Sobre a minha assessoria", label: "Foto 1", src: "/fotos/sobre-mim/mesa-posta.jpg" },
  { slot: "assessoria-2", section: "Sobre a minha assessoria", label: "Foto 2", src: "/fotos/sobre-mim/criancas-girassois.jpg" },
  { slot: "assessoria-3", section: "Sobre a minha assessoria", label: "Foto 3", src: "/fotos/sobre-mim/ajustando-vestido-janela.jpg" },
  { slot: "assessoria-4", section: "Sobre a minha assessoria", label: "Foto 4", src: "/fotos/sobre-mim/noiva-madrinha-noite.jpg" },
  { slot: "cta-final", section: "Rodapé (chamada final)", label: "Fundo da chamada final", src: "/fotos/sobre-mim/celebracao-confete.jpg" },
] as const;

export type SitePhotoSlot = (typeof SITE_PHOTO_SLOTS)[number]["slot"];

export function isSitePhotoSlot(value: string): value is SitePhotoSlot {
  return SITE_PHOTO_SLOTS.some((s) => s.slot === value);
}

// Devolve a URL de cada slot: a foto enviada pelo painel ou a padrão.
// Se a tabela ainda não existir em produção, cai nas padrões sem quebrar o site.
export async function getSitePhotos(): Promise<Record<SitePhotoSlot, string>> {
  const result = Object.fromEntries(
    SITE_PHOTO_SLOTS.map((s) => [s.slot, s.src]),
  ) as Record<SitePhotoSlot, string>;
  try {
    const rows = await prisma.sitePhoto.findMany();
    for (const row of rows) {
      if (isSitePhotoSlot(row.slot)) result[row.slot] = row.url;
    }
  } catch (error) {
    console.error("SitePhoto indisponível, usando fotos padrão:", error);
  }
  return result;
}
