const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const MORE_TESTIMONIALS = [
  {
    clientName: "Renata & Thiago",
    eventType: "Casamento",
    quote:
      "A Amanda transformou o que seria um caos de última hora em um dia tranquilo. Confiamos cegamente e não foi à toa: cada detalhe saiu exatamente como planejado.",
    rating: 5,
  },
  {
    clientName: "Vanessa Prado",
    eventType: "Debutante (15 anos)",
    quote:
      "Contratamos a assessoria pra festa de 15 anos da minha filha e foi surpreendente ver o nível de organização. Os convidados nem perceberam a logística por trás, só aproveitaram a festa.",
    rating: 5,
  },
  {
    clientName: "Carla & Eduardo",
    eventType: "Casamento",
    quote:
      "O que mais valorizamos foi a curadoria de fornecedores. Cada indicação da Amanda era certeira, e isso economizou muito tempo de pesquisa pra gente.",
    rating: 5,
  },
  {
    clientName: "Priscila Andrade",
    eventType: "Aniversário",
    quote:
      "Simplesmente impecável. A supervisão no dia do evento foi tão discreta e eficiente que eu esqueci que existia uma logística inteira rolando por trás.",
    rating: 5,
  },
  {
    clientName: "Marcos & Letícia",
    eventType: "Casamento",
    quote:
      "Fizemos um casamento em um espaço com bastante desafio logístico e a Amanda resolveu tudo com uma calma admirável. Recomendamos de olhos fechados.",
    rating: 5,
  },
  {
    clientName: "Tatiane Ribeiro",
    eventType: "Batizado",
    quote:
      "Contratei pra organizar o batizado do meu filho e me surpreendi com o nível de cuidado, mesmo sendo um evento menor. Atenção total aos detalhes.",
    rating: 5,
  },
  {
    clientName: "Gustavo & Amanda P.",
    eventType: "Casamento",
    quote:
      "Ela cuidou de tudo, desde o cronograma até o pós-evento, fechando contas com fornecedores. A gente só teve que aparecer e curtir o nosso dia.",
    rating: 5,
  },
  {
    clientName: "Isabela Martins",
    eventType: "Evento corporativo",
    quote:
      "Contratamos pra um evento corporativo grande e a coordenação foi impecável, com todos os horários e protocolos muito bem alinhados com nossa equipe.",
    rating: 4,
  },
];

const NEW_COMMUNITY_USERS = [
  {
    name: "Renata Prado",
    email: "renata.prado.demo@exemplo.com",
    post: "Meninas, alguém mais super indecisa sobre o cronograma do dia? A Amanda me ajudou a organizar cada minuto, desde a hora de acordar até o último brinde. Recomendo demais essa etapa de planejamento!",
  },
  {
    name: "Vanessa Cardoso",
    email: "vanessa.cardoso.demo@exemplo.com",
    post: "Semana que vem é meu casamento e estou tão tranquila graças à assessoria da Amanda. Antes eu vivia ansiosa pensando em mil detalhes, agora sei que está tudo nas mãos certas!",
  },
  {
    name: "Carolina Dias",
    email: "carolina.dias.demo@exemplo.com",
    post: "Casei em outubro e até hoje penso em como a equipe dela conseguiu resolver um imprevisto com o buffet sem que eu soubesse na hora. Só fiquei sabendo depois, no dia seguinte!",
  },
  {
    name: "Amanda Torres",
    email: "amanda.torres.demo@exemplo.com",
    post: "Quem mais amou a ideia do grupo exclusivo no WhatsApp? Facilitou muito tirar dúvidas rápidas durante o planejamento, sem ficar esperando retorno de e-mail.",
  },
  {
    name: "Letícia Farias",
    email: "leticia.farias.demo@exemplo.com",
    post: "Gente, a visita técnica que ela fez no espaço do nosso casamento evitou um perrengue enorme com a logística de fornecedores. Sem isso, ia dar ruim no dia!",
  },
  {
    name: "Natália Borges",
    email: "natalia.borges.demo@exemplo.com",
    post: "Fechei a assessoria completa e recomendo muito pra quem tá naquela fase de contratar fornecedor atrás de fornecedor sem saber por onde começar.",
  },
  {
    name: "Sabrina Nogueira",
    email: "sabrina.nogueira.demo@exemplo.com",
    post: "O cortejo do nosso casamento tinha bastante gente (padrinhos, daminhas, pajem) e achei que ia ser um caos, mas ficou tudo super organizado no ensaio antes do grande dia.",
  },
  {
    name: "Bruna Castro",
    email: "bruna.castro.demo@exemplo.com",
    post: "Amei ter recebido a planilha financeira consolidada no final. Deu pra ver exatamente onde foi cada centavo do orçamento do casamento, sem susto nenhum.",
  },
];

const NEW_COMMENTS = [
  "Migaaa, também tive essa experiência incrível com ela!",
  "Que ótimo saber disso, tô pesquisando assessoria ainda.",
  "Amei ler isso, super me identifiquei com a sua experiência!",
  "Sortuda! Queria ter contratado mais cedo, ia ter poupado tanto estresse.",
  "Concordo total, o grupo de WhatsApp facilita muito mesmo.",
  "Parabéns pelo casamento! Que Deus abençoe muito a união de vocês 🤍",
];

const TEAM_ADDITIONS = [
  {
    name: "Rafael Menezes",
    role: "Filmmaker",
    bio: "Responsável por eternizar cada momento em vídeo, com um olhar cinematográfico e discreto durante toda a celebração.",
  },
  {
    name: "Isabela Ferraz",
    role: "Ensaio e Direção",
    bio: "Conduz o ensaio do cortejo e a direção do roteiro da cerimônia, garantindo que todo mundo saiba exatamente a hora certa de entrar.",
  },
  {
    name: "Lucas Andrade",
    role: "Gerenciamento de Cronogramas",
    bio: "Monta e acompanha o cronograma oficial do evento, do horário de montagem ao encerramento, alinhando todos os fornecedores.",
  },
  {
    name: "Fernanda Vieira",
    role: "Supervisão no Dia do Evento",
    bio: "No grande dia, cuida de cada detalhe operacional para que os noivos só precisem aproveitar a festa.",
  },
  {
    name: "Camila Rezende",
    role: "Planejamento e Design de Eventos",
    bio: "Desenvolve o conceito visual do evento, alinhando decoração, ambientação e identidade do casal a cada detalhe.",
  },
];

const PARTNERS = [
  { name: "Luz & Instante Fotografia", category: "Fotografia" },
  { name: "Studio Frame Filmes", category: "Filmagem" },
  { name: "Doce Encanto Buffet", category: "Buffet" },
  { name: "Flor de Lis Decorações", category: "Decoração" },
  { name: "Ateliê Botânico", category: "Flores" },
  { name: "DJ Marcelo Ramos", category: "Música / DJ" },
  { name: "Doce Ponto Confeitaria", category: "Doces e Bolo" },
  { name: "Convite Certo Papelaria", category: "Convites" },
  { name: "Espaço Villa Jardim", category: "Espaço / Local" },
  { name: "Bela Noiva Beauty", category: "Beleza" },
];

async function main() {
  // Depoimentos
  for (const t of MORE_TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({ where: { quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...t, published: true, order: 1 } });
    }
  }
  console.log(`Depoimentos: +${MORE_TESTIMONIALS.length}`);

  // Comunidade - novas usuárias fictícias
  const passwordHash = await bcrypt.hash("ComunidadeAA2026!", 10);
  const createdUsers = [];
  for (const u of NEW_COMMUNITY_USERS) {
    const user = await prisma.brideUser.upsert({
      where: { email: u.email },
      update: {},
      create: { name: u.name, email: u.email, passwordHash },
    });
    createdUsers.push({ ...user, postContent: u.post });
  }

  const allUsers = await prisma.brideUser.findMany();

  const createdPosts = [];
  for (const user of createdUsers) {
    const existing = await prisma.post.findFirst({
      where: { authorId: user.id, content: user.postContent },
    });
    const post =
      existing ??
      (await prisma.post.create({
        data: { authorId: user.id, content: user.postContent, published: true },
      }));
    createdPosts.push(post);
  }

  let idx = 0;
  for (const post of createdPosts) {
    const commenters = allUsers.filter((u) => u.id !== post.authorId);
    const numComments = 1 + (idx % 3);
    for (let i = 0; i < numComments; i++) {
      const commenter = commenters[(idx + i) % commenters.length];
      const content = NEW_COMMENTS[(idx + i) % NEW_COMMENTS.length];
      const existing = await prisma.comment.findFirst({
        where: { postId: post.id, authorId: commenter.id, content },
      });
      if (!existing) {
        await prisma.comment.create({
          data: { postId: post.id, authorId: commenter.id, content, published: true },
        });
      }
    }

    const reactors = commenters;
    const numReactions = 4 + (idx % 6);
    const REACTION_TYPES = ["amei", "parabens", "fofo", "bravo"];
    for (let i = 0; i < numReactions && i < reactors.length; i++) {
      const reactor = reactors[i];
      const type = REACTION_TYPES[(idx + i) % REACTION_TYPES.length];
      await prisma.reaction.upsert({
        where: { postId_authorId: { postId: post.id, authorId: reactor.id } },
        update: { type },
        create: { postId: post.id, authorId: reactor.id, type },
      });
    }
    idx++;
  }
  console.log(`Comunidade: +${NEW_COMMUNITY_USERS.length} contas e posts, com comentários/reações.`);

  // Equipe
  let order = 10;
  for (const member of TEAM_ADDITIONS) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({
        data: { ...member, published: true, order: order++ },
      });
    }
  }
  console.log(`Equipe: +${TEAM_ADDITIONS.length} membros`);

  // Parcerias
  let pOrder = 0;
  for (const p of PARTNERS) {
    const existing = await prisma.partner.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.partner.create({ data: { ...p, published: true, order: pOrder++ } });
    }
  }
  console.log(`Parcerias: +${PARTNERS.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
