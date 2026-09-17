import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cronograma de Contratação | Amanda Alcântara Cerimonial",
};

const PHASES = [
  {
    period: "12 a 18 meses antes",
    tag: "Fase estratégica: decisões mais importantes",
    note: "Esses são os primeiros porque tudo depende deles.",
    items: [
      "Definição da data",
      "Definição do estilo do casamento",
      "Definição do orçamento total",
      "Contratação da assessoria/cerimonial",
      "Escolha e contratação do local (espaço/igreja/praia/campo)",
      "Reserva do celebrante (religioso ou simbólico)",
      "Início da lista de convidados",
    ],
  },
  {
    period: "10 a 12 meses antes",
    tag: "Fase estrutural",
    items: [
      "Buffet (se não incluso no espaço)",
      "Fotografia",
      "Filmagem",
      "Decoração (empresa ou decorador)",
      "Banda ou DJ principal",
      "Mobiliário (mesas, cadeiras, lounges, se necessário)",
      "Identidade visual (convites, papelaria)",
    ],
  },
  {
    period: "8 a 10 meses antes",
    tag: "Fase técnica + experiência",
    items: [
      "Iluminação cênica",
      "Sonorização completa (cerimônia + festa)",
      "Estrutura (tenda, palco, cobertura)",
      "Gerador de energia",
      "Bar / drinks (bartender/mixologista)",
      "Bolo e doces finos",
      "Vestido da noiva (início da escolha)",
      "Traje do noivo",
    ],
  },
  {
    period: "6 a 8 meses antes",
    tag: "Fase estética e detalhes",
    items: [
      "Cabelo e maquiagem",
      "Convites (criação e envio)",
      "Lembranças para convidados",
      "Louças e itens especiais (se for decoração personalizada)",
      "Escolha da playlist ou alinhamento musical",
      "Hospedagem para convidados (se necessário)",
      "Transfer / logística",
    ],
  },
  {
    period: "4 a 6 meses antes",
    tag: "Fase de confirmação",
    items: [
      "Prova do vestido",
      "Definição do menu com buffet",
      "Degustação de doces e bolo",
      "Definição do layout do evento (planta)",
      "Escolha das músicas da cerimônia",
      "Contratação de atrações extras (robô de LED, saxofonista, coral etc.)",
    ],
  },
  {
    period: "2 a 4 meses antes",
    tag: "Fase operacional",
    items: [
      "Envio dos convites (se ainda não enviados)",
      "Confirmação de fornecedores contratados",
      "Definição da ordem da cerimônia",
      "Definição de padrinhos e cortejo",
      "Criação do cronograma do grande dia",
    ],
  },
  {
    period: "1 mês antes",
    tag: "Fase final",
    items: [
      "RSVP (confirmação de presença)",
      "Reunião final com todos os fornecedores",
      "Ajustes finais de layout",
      "Definição da lista de mesas",
      "Conferência geral de contratos",
    ],
  },
  {
    period: "15 dias antes",
    tag: "Detalhes",
    items: [
      "Entrega de materiais para cerimonial",
      "Reunião de alinhamento final",
      "Conferência de horários de montagem",
      "Checklist completo",
    ],
  },
];

const ORDEM_IDEAL = [
  "Local + data",
  "Fornecedores com agenda concorrida (foto, vídeo, banda)",
  "Estrutura base (buffet, bebidas, decoração)",
  "Técnico (luz, som, gerador)",
  "Detalhes e experiência",
];

export default function CronogramaContratacaoPage() {
  return (
    <>
      <div className="relative overflow-hidden py-20 text-center text-white sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/cronograma/casal-noite-luzes.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-accent-dark/80" />
        <Container className="relative flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Planejamento sem estresse
          </span>
          <h1 className="max-w-2xl font-serif-display text-3xl sm:text-4xl">
            Cronograma de Contratação para o Casamento
          </h1>
          <p className="max-w-xl text-white/80">
            Um bom cronograma de contratação é o que evita estresse,
            economiza dinheiro e garante que você consiga os melhores
            fornecedores.
          </p>
        </Container>
      </div>

      <Container className="flex flex-col gap-14 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Passo a passo"
          title="O momento certo para contratar cada etapa"
          subtitle="Uma linha do tempo pensada para que nada fique de última hora e cada fornecedor seja contratado no melhor momento possível."
        />

        <div className="relative flex flex-col gap-8">
          <div className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-border sm:block" />
          {PHASES.map((phase, index) => (
            <div key={phase.period} className="relative flex gap-6 sm:pl-0">
              <div className="hidden sm:flex flex-col items-center">
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-accent/25 p-6 sm:p-8">
                <div className="flex flex-col gap-1">
                  <h2 className="font-serif-display text-xl text-foreground">
                    {phase.period}
                  </h2>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                    {phase.tag}
                  </span>
                  {phase.note && (
                    <p className="mt-1 text-sm italic text-muted-foreground">
                      {phase.note}
                    </p>
                  )}
                </div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 text-accent">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-accent-dark px-6 py-10 text-center text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            A ordem de contratação ideal sempre segue essa lógica
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {ORDEM_IDEAL.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-white/30 px-4 py-2 text-sm">
                  {step}
                </span>
                {index < ORDEM_IDEAL.length - 1 && (
                  <span className="text-white/40">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto text-center">
          <ButtonLink href="/orcamento">Solicitar orçamento</ButtonLink>
        </div>
      </Container>
    </>
  );
}
