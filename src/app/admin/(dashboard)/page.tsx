import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    newQuotes,
    totalQuotes,
    testimonials,
    team,
    partners,
    gallery,
    pendingPosts,
    pendingComments,
    couples,
    brideUsers,
    checklists,
  ] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: "novo" } }),
    prisma.quoteRequest.count(),
    prisma.testimonial.count(),
    prisma.teamMember.count(),
    prisma.partner.count(),
    prisma.galleryImage.count(),
    prisma.post.count({ where: { published: false } }),
    prisma.comment.count({ where: { published: false } }),
    prisma.couple.count(),
    prisma.brideUser.count(),
    prisma.clientChecklist.count(),
  ]);

  const cards = [
    { label: "Novos pedidos de orçamento", value: newQuotes, href: "/admin/orcamentos" },
    { label: "Total de pedidos", value: totalQuotes, href: "/admin/orcamentos" },
    {
      label: "Posts aguardando aprovação",
      value: pendingPosts,
      href: "/admin/comunidade/posts",
    },
    {
      label: "Comentários aguardando aprovação",
      value: pendingComments,
      href: "/admin/comunidade/comentarios",
    },
    { label: "Checklists de noivos", value: checklists, href: "/admin/checklists" },
    { label: "Noivas cadastradas", value: brideUsers, href: "/admin/comunidade/usuarias" },
    { label: "Casais no book", value: couples, href: "/admin/casais" },
    { label: "Depoimentos", value: testimonials, href: "/admin/depoimentos" },
    { label: "Membros da equipe", value: team, href: "/admin/equipe" },
    { label: "Parcerias", value: partners, href: "/admin/parcerias" },
    { label: "Fotos no portfólio", value: gallery, href: "/admin/galeria" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do site da Amanda Cerimonial.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-semibold text-foreground">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
