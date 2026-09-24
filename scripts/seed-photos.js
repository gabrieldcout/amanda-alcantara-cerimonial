const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Remove os casais placeholder antigos (sem fotos) criados no seed-community
  await prisma.couple.deleteMany({ where: { slug: { in: ["casal-1", "casal-2"] } } });

  const casal1 = await prisma.couple.upsert({
    where: { slug: "casal-1" },
    update: {
      coverUrl: "/fotos/casal-1/capa-beijo-cachoeira.jpg",
    },
    create: {
      names: "Casal 1",
      slug: "casal-1",
      coverUrl: "/fotos/casal-1/capa-beijo-cachoeira.jpg",
      story:
        "Edite este perfil no painel admin com o nome real do casal e a história do casamento.",
      published: false,
      showInStories: true,
      order: 0,
    },
  });

  const casal1Media = [
    { type: "photo", url: "/fotos/casal-1/capa-beijo-cachoeira.jpg", caption: "Beijo na cachoeira", order: 0 },
    { type: "photo", url: "/fotos/casal-1/votos-caverna.jpg", caption: "Troca de votos na gruta", order: 1 },
    { type: "photo", url: "/fotos/casal-1/beijo-caverna.jpg", caption: "Saída da cerimônia", order: 2 },
    { type: "photo", url: "/fotos/casal-1/retrato-noiva.jpg", caption: "Retrato da noiva", order: 3 },
    { type: "photo", url: "/fotos/casal-1/maos-aliancas.jpg", caption: "Alianças", order: 4 },
    { type: "photo", url: "/fotos/casal-1/caminhando.jpg", caption: "Passeio pelo jardim", order: 5 },
  ];
  for (const m of casal1Media) {
    const existing = await prisma.coupleMedia.findFirst({
      where: { coupleId: casal1.id, url: m.url },
    });
    if (!existing) {
      await prisma.coupleMedia.create({ data: { ...m, coupleId: casal1.id } });
    }
  }

  const casal2 = await prisma.couple.upsert({
    where: { slug: "casal-2" },
    update: { coverUrl: "/fotos/casal-2/capa-buque.jpg" },
    create: {
      names: "Casal 2",
      slug: "casal-2",
      coverUrl: "/fotos/casal-2/capa-buque.jpg",
      story:
        "Edite este perfil no painel admin com o nome real do casal e a história do casamento.",
      published: false,
      showInStories: true,
      order: 1,
    },
  });
  const casal2MediaExisting = await prisma.coupleMedia.findFirst({
    where: { coupleId: casal2.id, url: "/fotos/casal-2/capa-buque.jpg" },
  });
  if (!casal2MediaExisting) {
    await prisma.coupleMedia.create({
      data: {
        coupleId: casal2.id,
        type: "photo",
        url: "/fotos/casal-2/capa-buque.jpg",
        caption: "Buquê de outono",
        order: 0,
      },
    });
  }

  const casal3 = await prisma.couple.upsert({
    where: { slug: "casal-3" },
    update: { coverUrl: "/fotos/casal-3/capa-recepcao.jpg" },
    create: {
      names: "Casal 3",
      slug: "casal-3",
      coverUrl: "/fotos/casal-3/capa-recepcao.jpg",
      story:
        "Edite este perfil no painel admin com o nome real do casal e a história do casamento.",
      published: false,
      showInStories: true,
      order: 2,
    },
  });
  const casal3Media = [
    { type: "photo", url: "/fotos/casal-3/capa-recepcao.jpg", caption: "Recepção com luzes", order: 0 },
    { type: "photo", url: "/fotos/casal-3/com-amanda-noite.jpg", caption: "Com a cerimonialista Amanda", order: 1 },
  ];
  for (const m of casal3Media) {
    const existing = await prisma.coupleMedia.findFirst({
      where: { coupleId: casal3.id, url: m.url },
    });
    if (!existing) {
      await prisma.coupleMedia.create({ data: { ...m, coupleId: casal3.id } });
    }
  }

  // Foto da Amanda na equipe
  const amanda = await prisma.teamMember.findFirst({ where: { name: "Amanda Alcântara" } });
  if (amanda) {
    await prisma.teamMember.update({
      where: { id: amanda.id },
      data: { photoUrl: "/fotos/amanda/direcionando.jpg" },
    });
  }

  // Destaques no portfólio geral
  const portfolioHighlights = [
    { url: "/fotos/casal-1/capa-beijo-cachoeira.jpg", caption: "Cerimônia na cachoeira", category: "Casamento", order: 0 },
    { url: "/fotos/casal-1/beijo-caverna.jpg", caption: "Cerimônia na gruta", category: "Casamento", order: 1 },
    { url: "/fotos/casal-3/capa-recepcao.jpg", caption: "Recepção decorada", category: "Casamento", order: 2 },
    { url: "/fotos/casal-2/capa-buque.jpg", caption: "Detalhes de outono", category: "Casamento", order: 3 },
  ];
  for (const p of portfolioHighlights) {
    const existing = await prisma.galleryImage.findFirst({ where: { url: p.url } });
    if (!existing) {
      await prisma.galleryImage.create({ data: p });
    }
  }

  console.log("Fotos organizadas: casais, equipe e portfólio atualizados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
