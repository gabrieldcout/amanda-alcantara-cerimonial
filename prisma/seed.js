const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "Amanda Alcântara",
      heroSubtitle:
        "Assessoria intencional, estratégica e personalizada para quem deseja viver o grande dia.",
      aboutText:
        "Cuido de cada detalhe da sua cerimônia com carinho, organização e experiência, para que você viva o seu grande dia com leveza, do planejamento ao último brinde.",
      instagramUrl: "https://www.instagram.com/aamandacerimonial/",
      whatsappNumber: "+55 48 8444-8087",
      email: "",
    },
  });

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: "Exemplo: Ana & João",
          eventType: "Casamento",
          quote:
            "Este é um depoimento de exemplo. Edite ou substitua pelo depoimento real de um cliente no painel admin.",
          rating: 5,
          order: 0,
        },
      ],
    });
  }

  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    await prisma.teamMember.createMany({
      data: [
        {
          name: "Amanda Alcântara",
          role: "Cerimonialista",
          bio: "Edite esta bio no painel admin em Equipe.",
          order: 0,
        },
      ],
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
