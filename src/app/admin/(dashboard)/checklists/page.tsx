import Link from "next/link";
import { startOfDay } from "date-fns";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createChecklist } from "@/lib/actions/checklists";
import { CHECKLIST_PHASES, summarizeChecklist } from "@/lib/checklistTemplate";

const itemSelect = {
  phase: true,
  done: true,
  doneAt: true,
  notApplicable: true,
} as const;

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const activityFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminChecklistsPage() {
  // Só aparecem aqui os casamentos cadastrados em "Histórias reais" com data
  // (ou que já tenham checklist, caso a data tenha sido apagada depois).
  const couples = await prisma.couple.findMany({
    where: { OR: [{ weddingDate: { not: null } }, { checklist: { isNot: null } }] },
    orderBy: { weddingDate: "asc" },
    include: {
      checklist: {
        include: {
          items: { select: itemSelect },
        },
      },
    },
  });
  const couplesWithoutDate = await prisma.couple.count({
    where: { weddingDate: null, checklist: { is: null } },
  });

  const today = startOfDay(new Date());
  const upcoming = couples.filter((c) => !c.weddingDate || c.weddingDate >= today);
  const past = couples.filter((c) => c.weddingDate && c.weddingDate < today).reverse();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Checklist dos noivos
        </h1>
        <p className="text-sm text-muted-foreground">
          Os casamentos cadastrados aparecem aqui automaticamente. Clique em
          &quot;Fazer checklist&quot; pra gerar o link privado do casal — eles
          marcam o que já fizeram e você acompanha tudo por aqui.
        </p>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
        <p className="font-medium">Não achou o casal?</p>
        <p className="mt-1 text-muted-foreground">
          Cadastre o casamento em{" "}
          <Link href="/admin/casais" className="text-accent underline">
            Histórias reais
          </Link>{" "}
          com a <strong>data do casamento</strong> preenchida — ele aparece
          aqui na hora.
          {couplesWithoutDate > 0 && (
            <>
              {" "}
              Hoje há {couplesWithoutDate} casal(is) cadastrado(s) sem data,
              que por isso não aparecem nesta lista.
            </>
          )}
        </p>
      </div>

      <CoupleList
        title="Próximos casamentos"
        couples={upcoming}
        emptyText="Nenhum casamento futuro cadastrado."
      />
      {past.length > 0 && (
        <CoupleList title="Casamentos que já aconteceram" couples={past} />
      )}
    </div>
  );
}

type CoupleWithChecklist = Prisma.CoupleGetPayload<{
  include: { checklist: { include: { items: { select: typeof itemSelect } } } };
}>;

function CoupleList({
  title,
  couples,
  emptyText,
}: {
  title: string;
  couples: CoupleWithChecklist[];
  emptyText?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-serif-display text-xl text-foreground">{title}</h2>
      {couples.length === 0 && emptyText && (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {couples.map((couple) => (
          <CoupleCard key={couple.id} couple={couple} />
        ))}
      </div>
    </div>
  );
}

function CoupleCard({ couple }: { couple: CoupleWithChecklist }) {
  const header = (
    <div>
      <p className="font-medium text-foreground">{couple.names}</p>
      <p className="text-sm text-muted-foreground">
        {couple.weddingDate ? dateFormat.format(couple.weddingDate) : "Sem data definida"}
      </p>
    </div>
  );

  if (!couple.checklist) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-card p-4">
        {header}
        <form action={createChecklist.bind(null, couple.id)} className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" name="useTemplate" defaultChecked className="h-4 w-4" />
            Começar com o cronograma padrão (desmarque pra montar do zero)
          </label>
          <button
            type="submit"
            className="self-start rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Fazer checklist
          </button>
        </form>
      </div>
    );
  }

  const { checklist } = couple;
  const summary = summarizeChecklist(checklist.items, couple.weddingDate);
  const lastActivity = checklist.items
    .map((i) => i.doneAt)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  return (
    <Link
      href={`/admin/checklists/${checklist.id}`}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        {header}
        <span className="font-serif-display text-xl text-foreground">{summary.percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-accent" style={{ width: `${summary.percent}%` }} />
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {summary.overdue > 0 && (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-red-700">
            {summary.overdue} item(ns) atrasado(s)
          </span>
        )}
        {summary.nextPhase !== null && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent-dark">
            Etapa atual: {CHECKLIST_PHASES[summary.nextPhase].period}
          </span>
        )}
        <span className="text-muted-foreground">
          {lastActivity
            ? `Último check: ${activityFormat.format(lastActivity)}`
            : "Nenhum check ainda"}
        </span>
      </div>
      <span className="text-sm font-medium text-accent">Abrir checklist →</span>
    </Link>
  );
}
