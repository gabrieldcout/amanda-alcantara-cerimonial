import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Amanda Alcântara Cerimonial",
};

const FAQ = [
  {
    q: "Quando é o melhor momento para contratar a assessoria?",
    a: "O ideal é contratar entre 10 e 12 meses antes do evento — isso dá tempo pra planejar tudo com calma, encontrar os melhores fornecedores nas datas desejadas e evitar decisões apressadas. Mas também atendo casais com prazos mais curtos, adaptando o cronograma pra cada caso.",
  },
  {
    q: "Qual é a diferença entre assessoria completa e coordenação do dia?",
    a: "A assessoria completa acompanha todo o planejamento — desde a escolha de fornecedores até o pós-evento. A coordenação do dia é focada só na execução (dia da festa), quando o casal já organizou tudo por conta própria e quer suporte apenas no grande dia.",
  },
  {
    q: "O que está incluído no serviço de assessoria completa?",
    a: "Curadoria de fornecedores, planilha financeira, gestão de contratos e prazos, cronograma detalhado, RSVP e mapeamento de mesas, coordenação do dia com equipe presencial, gestão do pós-evento e muito mais. A lista completa está na página \"O que inclui\".",
  },
  {
    q: "Vocês atendem eventos fora do Rio de Janeiro?",
    a: "Sim! Atendo eventos em outras cidades e estados, e também casamentos destination. Nesses casos, o orçamento inclui deslocamento, hospedagem e logística da equipe.",
  },
  {
    q: "A Amanda estará presente no dia do evento?",
    a: "Sim, sempre. A Amanda coordena pessoalmente cada evento assessorado, acompanhada de uma equipe treinada dimensionada de acordo com o porte da festa.",
  },
  {
    q: "Como funciona o processo de contratação?",
    a: "Você preenche o formulário de orçamento com os dados do evento. Marcamos uma conversa (presencial ou online) para entender o seu perfil e apresentar a proposta. Se houver interesse, formalizamos por contrato com assinatura digital e sinal.",
  },
  {
    q: "Vocês indicam fornecedores? Recebem comissão?",
    a: "Indico fornecedores baseado em experiência e no perfil de cada casal — todos previamente validados. Não trabalho com comissão de fornecedores: minha receita vem exclusivamente do casal, o que garante que as indicações sejam sempre no seu melhor interesse.",
  },
  {
    q: "Como é feito o pagamento? Posso parcelar?",
    a: "Sim, o valor da assessoria pode ser parcelado em até 12x. Combinamos o cronograma de pagamento na assinatura do contrato, ajustado ao seu planejamento financeiro.",
  },
  {
    q: "Trabalham com casamentos de qualquer porte?",
    a: "Sim, de intimistas (até 40 pessoas) a grandes celebrações. O que importa é o seu sonho — o que muda é o dimensionamento da equipe e do escopo, sempre pensado sob medida.",
  },
  {
    q: "E se algo der errado no dia do evento?",
    a: "É pra isso que existe uma assessoria experiente. Trabalho com plano B em cada etapa crítica, e minha equipe é treinada pra resolver imprevistos discretamente, sem envolver o casal ou os convidados. Você vive o dia sem se preocupar.",
  },
];

export default function DuvidasPage() {
  return (
    <Container className="flex flex-col gap-14 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Dúvidas Frequentes"
        title="Tudo o que você precisa saber antes de contratar"
        subtitle="Se restou alguma dúvida, é só chamar no WhatsApp ou solicitar um orçamento — vou te responder pessoalmente."
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl bg-accent/25 p-5 transition-colors open:bg-accent/35"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
              <span className="font-serif-display text-lg text-foreground">
                {item.q}
              </span>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mx-auto text-center">
        <p className="mb-4 text-muted-foreground">
          Ficou com outra dúvida?
        </p>
        <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
      </div>
    </Container>
  );
}
