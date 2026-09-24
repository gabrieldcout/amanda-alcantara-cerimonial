import { sub, type Duration } from "date-fns";

export type ChecklistPhase = {
  period: string;
  tag: string;
  note?: string;
  // Até quanto tempo antes do casamento a fase deveria estar concluída.
  dueBefore: Duration;
  items: string[];
};

// Fases do cronograma de contratação. Usadas na página pública
// /cronograma-contratacao e como modelo inicial do checklist de cada casal.
// A posição no array é o "phase" salvo em ChecklistItem — ao adicionar fases
// novas, adicione no final pra não bagunçar os checklists já criados.
export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    period: "12 a 18 meses antes",
    tag: "Fase estratégica: decisões mais importantes",
    note: "Esses são os primeiros porque tudo depende deles.",
    dueBefore: { months: 12 },
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
    dueBefore: { months: 10 },
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
    dueBefore: { months: 8 },
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
    dueBefore: { months: 6 },
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
    dueBefore: { months: 4 },
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
    dueBefore: { months: 2 },
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
    dueBefore: { months: 1 },
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
    dueBefore: { days: 15 },
    items: [
      "Entrega de materiais para cerimonial",
      "Reunião de alinhamento final",
      "Conferência de horários de montagem",
      "Checklist completo",
    ],
  },
];

export function getPhaseDueDate(phaseIndex: number, weddingDate: Date | null) {
  const phase = CHECKLIST_PHASES[phaseIndex];
  if (!phase || !weddingDate) return null;
  return sub(weddingDate, phase.dueBefore);
}

export function buildDefaultChecklistItems() {
  return CHECKLIST_PHASES.flatMap((phase, phaseIndex) =>
    phase.items.map((title, order) => ({ phase: phaseIndex, title, order }))
  );
}

type ProgressItem = { phase: number; done: boolean; notApplicable: boolean };

// Resumo usado na lista do admin: % concluído, itens atrasados e a próxima
// fase com pendências.
export function summarizeChecklist(
  items: ProgressItem[],
  weddingDate: Date | null,
  now = new Date()
) {
  // Itens marcados como "não se aplica" não entram na conta.
  items = items.filter((i) => !i.notApplicable);
  const total = items.length;
  const done = items.filter((i) => i.done).length;
  const overdue = items.filter((i) => {
    if (i.done) return false;
    const due = getPhaseDueDate(i.phase, weddingDate);
    return due !== null && due < now;
  }).length;
  const nextPhase = CHECKLIST_PHASES.findIndex((_, index) =>
    items.some((i) => i.phase === index && !i.done)
  );
  return {
    total,
    done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    overdue,
    nextPhase: nextPhase === -1 ? null : nextPhase,
  };
}
