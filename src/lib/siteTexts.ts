import { prisma } from "@/lib/prisma";

type TextField = {
  key: string;
  section: string;
  label: string;
  default: string;
  multiline?: boolean;
};

// Textos da página inicial editáveis em Admin → Textos do site.
// Nos campos de várias linhas, cada parágrafo é separado por uma linha em branco.
export const SITE_TEXT_FIELDS = [
  { key: "hero.eyebrow", section: "Topo da página", label: "Frase pequena acima do título", default: "Assessoria Cerimonial" },
  { key: "hero.text", section: "Topo da página", label: "Texto abaixo do subtítulo", multiline: true, default: "Experiências bem construídas não acontecem por acaso. Elas nascem da sensibilidade em perceber o que realmente importa, da escuta atenta que acolhe desejos, histórias e expectativas, e de escolhas feitas com intenção em cada detalhe." },

  { key: "sobre.eyebrow", section: "Sobre mim", label: "Frase pequena acima do título", default: "Sobre mim" },
  { key: "sobre.title", section: "Sobre mim", label: "Título", default: "A paixão que se tornou profissão" },
  { key: "sobre.text", section: "Sobre mim", label: "Texto", multiline: true, default: "Sou carioca, esposa do Lucas, mamãe da Ayla e uma mulher apaixonada por celebrar a vida. Desde pequena, o encantamento por festas e comemorações já fazia parte de quem eu sou. Organizar festas e criar momentos especiais sempre foi natural para mim, mas meu caminho inicial foi guiado por outra paixão: o Direito.\n\nGraduada na área e com trajetória sólida em grandes empresas, como L'Oréal Brasil e AMBEV, desenvolvi habilidades como planejamento, organização, liderança e atenção aos detalhes, que hoje são pilares no meu trabalho com eventos.\n\nHoje minha trajetória combina formação em Direito, MBA em Marketing e especialização técnica em eventos, trazendo uma abordagem estratégica, criativa e detalhista para cada evento que eu assessoro." },

  { key: "compromisso.eyebrow", section: "O meu compromisso", label: "Frase pequena acima do título", default: "O meu compromisso" },
  { key: "compromisso.title", section: "O meu compromisso", label: "Título", default: "Que vocês sejam protagonistas da própria história" },
  { key: "compromisso.text", section: "O meu compromisso", label: "Texto", multiline: true, default: "Com uma assessoria completa, eu integro todos os aspectos do evento: planejamento, curadoria de fornecedores, gestão de prazos e contratos, construção de cronogramas e coordenação total do grande dia, garantindo harmonia entre o planejamento e a execução.\n\nÉ estar verdadeiramente presente em cada etapa, ouvir o que vocês desejam, entender as prioridades do casal e transformar tudo isso em um planejamento seguro, estratégico e possível.\n\nDurante a assessoria, vocês terão ao lado uma profissional que acompanha de perto cada decisão, antecipa necessidades, organiza processos, conecta fornecedores e cuida dos detalhes que muitas vezes passam despercebidos.\n\nMeu papel é trazer clareza quando houver dúvidas, tranquilidade quando surgirem imprevistos e segurança para que vocês possam tomar decisões conscientes e alinhadas ao que realmente importa." },

  { key: "assessoria.eyebrow", section: "Sobre a minha assessoria", label: "Frase pequena acima do título", default: "Sobre a minha assessoria" },
  { key: "assessoria.title", section: "Sobre a minha assessoria", label: "Título", default: "Acompanhamento personalizado em cada etapa" },
  { key: "assessoria.subtitle", section: "Sobre a minha assessoria", label: "Texto", multiline: true, default: "Cada reunião, cada escolha e cada decisão são conduzidas de forma estratégica e sensível, respeitando a essência e os desejos de vocês. Mais do que organizar, meu papel é orientar, simplificar processos e trazer segurança em cada passo." },

  { key: "acompanho.eyebrow", section: "Como te acompanho", label: "Frase pequena acima do título", default: "Como te acompanho" },
  { key: "acompanho.title", section: "Como te acompanho", label: "Título", default: "Do primeiro encontro ao pós-evento" },
  { key: "acompanho.card1.title", section: "Como te acompanho", label: "Cartão 1 · título", default: "O início do planejamento juntos" },
  { key: "acompanho.card1.text", section: "Como te acompanho", label: "Cartão 1 · texto", multiline: true, default: "Atendimento personalizado para entender o perfil do casal, seus desejos, sonhos, orçamento e estilo de evento. Apresentação da proposta de trabalho e cronograma de atuação com checklist mês a mês, além de acesso a plataforma, grupo no WhatsApp e planilha de organização financeira." },
  { key: "acompanho.card2.title", section: "Como te acompanho", label: "Cartão 2 · título", default: "Curadoria de fornecedores" },
  { key: "acompanho.card2.text", section: "Como te acompanho", label: "Cartão 2 · texto", multiline: true, default: "Indicação baseada em experiência, sensibilidade e entendimento profundo do estilo, orçamento e personalidade dos noivos. Cada profissional indicado já foi previamente validado. Acompanho visitas técnicas e degustações, e negocio sempre buscando o melhor custo-benefício." },
  { key: "acompanho.card3.title", section: "Como te acompanho", label: "Cartão 3 · título", default: "Controle financeiro" },
  { key: "acompanho.card3.text", section: "Como te acompanho", label: "Cartão 3 · texto", multiline: true, default: "Planilha personalizada e exclusiva para o casal, com controle de prazos, orçamentos e status de cada contratação. Lembretes para pagamentos, provas e ensaios, além de análise de contratos e assinatura digital de todos os documentos do evento." },
  { key: "acompanho.card4.title", section: "Como te acompanho", label: "Cartão 4 · título", default: "Durante o casamento" },
  { key: "acompanho.card4.text", section: "Como te acompanho", label: "Cartão 4 · texto", multiline: true, default: "Suporte completo ao casal, centralizando informações e acompanhando cada etapa. Gestão de convites e RSVP, mapeamento estratégico das mesas, cronograma oficial do grande dia e grupo exclusivo no WhatsApp para alinhar cortejo, padrinhos e madrinhas." },
  { key: "acompanho.card5.title", section: "Como te acompanho", label: "Cartão 5 · título", default: "No pós-evento" },
  { key: "acompanho.card5.text", section: "Como te acompanho", label: "Cartão 5 · texto", multiline: true, default: "Acompanho a desmontagem até o término do evento, faço a conferência final com fornecedores, auxilio no feedback e em questões pontuais do pós-casamento, e entrego um resumo completo com o cronograma executado e a planilha financeira consolidada." },

  { key: "identifica.eyebrow", section: "Organizar um casamento", label: "Frase pequena acima do título", default: "Organizar um casamento" },
  { key: "identifica.title", section: "Organizar um casamento", label: "Título", default: "Vai muito além de escolher fornecedores e definir datas" },
  { key: "identifica.subtitle", section: "Organizar um casamento", label: "Texto", multiline: true, default: "Envolve planejamento, logística, controle de prazos, gestão de imprevistos e, claro, emoção. Se vocês se identificam com alguns destes pontos, é sinal de que a assessoria cerimonial é essencial:" },
  { key: "identifica.items", section: "Organizar um casamento", label: "Pontos (cada parágrafo vira um cartão)", multiline: true, default: "Você nunca organizou um evento desse porte antes e está com medo de esquecer algo importante ou cometer erros por falta de experiência.\n\nVocê trabalha, estuda ou tem a agenda cheia e falta tempo para cuidar de tudo com calma.\n\nVocê não sabe por onde começar, local, buffet, decoração, DJ, convite, cerimonial, e só de pensar dá um nó na cabeça.\n\nVocê quer curtir o seu evento sem preocupações e, no dia da festa, viver cada momento sem se preocupar com cronograma, fornecedores ou imprevistos.\n\nVocê valoriza um evento bem organizado, bonito, com emoção, e sonha com uma celebração fluida, elegante, sem correria." },

  { key: "destaque1.stat", section: "Destaques (números)", label: "Destaque 1 · número", default: "+50" },
  { key: "destaque1.label", section: "Destaques (números)", label: "Destaque 1 · texto", default: "Casamentos realizados" },
  { key: "destaque2.stat", section: "Destaques (números)", label: "Destaque 2 · número", default: "100%" },
  { key: "destaque2.label", section: "Destaques (números)", label: "Destaque 2 · texto", default: "Atendimento personalizado" },
  { key: "destaque3.stat", section: "Destaques (números)", label: "Destaque 3 · número", default: "Equipe própria" },
  { key: "destaque3.label", section: "Destaques (números)", label: "Destaque 3 · texto", default: "Presente no grande dia" },
  { key: "destaque4.stat", section: "Destaques (números)", label: "Destaque 4 · número", default: "Do início ao fim" },
  { key: "destaque4.label", section: "Destaques (números)", label: "Destaque 4 · texto", default: "Acompanhamento completo" },

  { key: "cta.title", section: "Chamada final", label: "Título", default: "Vamos planejar o seu grande dia?" },
  { key: "cta.text", section: "Chamada final", label: "Texto", multiline: true, default: "Conte um pouco sobre o seu evento e receba um orçamento personalizado." },
] as const satisfies readonly TextField[];

export type SiteTextKey = (typeof SITE_TEXT_FIELDS)[number]["key"];
export type SiteTexts = Record<SiteTextKey, string>;

export function isSiteTextKey(value: string): value is SiteTextKey {
  return SITE_TEXT_FIELDS.some((f) => f.key === value);
}

// Quebra um texto em parágrafos (separados por linha em branco).
export function paragraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Texto salvo pelo painel ou o padrão. Se a tabela ainda não existir em
// produção, usa os padrões sem quebrar o site.
export async function getSiteTexts(): Promise<SiteTexts> {
  const result = Object.fromEntries(
    SITE_TEXT_FIELDS.map((f) => [f.key, f.default]),
  ) as SiteTexts;
  try {
    const rows = await prisma.siteText.findMany();
    for (const row of rows) {
      if (isSiteTextKey(row.key) && row.value.trim()) result[row.key] = row.value;
    }
  } catch (error) {
    console.error("SiteText indisponível, usando textos padrão:", error);
  }
  return result;
}
