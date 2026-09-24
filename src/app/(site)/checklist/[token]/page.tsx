import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { ChecklistBoard } from "@/components/checklist/ChecklistBoard";
import {
  coupleAddItem,
  coupleDeleteItem,
  coupleSaveItemNote,
  coupleSetNotApplicable,
  coupleToggleItem,
} from "@/lib/actions/checklists";
import { toChecklistItemView } from "@/lib/checklistItemView";

// Link privado de cada casal — não deve aparecer no Google.
export const metadata: Metadata = {
  title: "Nosso checklist | Amanda Alcântara Cerimonial",
  robots: { index: false, follow: false },
};

const weddingDateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function CoupleChecklistPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const checklist = await prisma.clientChecklist.findUnique({
    where: { token },
    include: {
      couple: true,
      items: { orderBy: [{ phase: "asc" }, { order: "asc" }] },
    },
  });
  if (!checklist) notFound();
  const { couple } = checklist;

  const daysLeft = couple.weddingDate
    ? differenceInCalendarDays(couple.weddingDate, new Date())
    : null;

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Checklist do casamento
          </span>
          <h1 className="font-serif-display text-3xl text-foreground sm:text-4xl">
            {couple.names}
          </h1>
          {couple.weddingDate && (
            <p className="text-muted-foreground">
              {weddingDateFormat.format(couple.weddingDate)}
              {daysLeft !== null && daysLeft > 0 && (
                <> · faltam <strong className="text-foreground">{daysLeft}</strong> dias</>
              )}
              {daysLeft === 0 && <> · é hoje! 💍</>}
            </p>
          )}
          <p className="max-w-xl text-sm text-muted-foreground">
            Marque cada etapa conforme for concluindo — a Amanda acompanha o
            progresso de vocês em tempo real. Use as anotações pra guardar
            fornecedor, valor ou contato. Se alguma etapa não fizer sentido pro
            casamento de vocês, toque em &quot;Não se aplica&quot;. Salvem este
            link nos favoritos: ele é só de vocês.
          </p>
        </div>

        <ChecklistBoard
          initialItems={checklist.items.map(toChecklistItemView)}
          weddingDate={couple.weddingDate?.toISOString() ?? null}
          actions={{
            toggle: coupleToggleItem.bind(null, token),
            saveNote: coupleSaveItemNote.bind(null, token),
            add: coupleAddItem.bind(null, token),
            remove: coupleDeleteItem.bind(null, token),
            setNotApplicable: coupleSetNotApplicable.bind(null, token),
          }}
        />
      </div>
    </Container>
  );
}
