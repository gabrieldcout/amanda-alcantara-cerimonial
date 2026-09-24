import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  adminAddItem,
  adminDeleteItem,
  adminSaveItemNote,
  adminSetNotApplicable,
  adminToggleItem,
  adminUpdateItem,
  deleteChecklist,
  regenerateChecklistToken,
} from "@/lib/actions/checklists";
import { toChecklistItemView } from "@/lib/checklistItemView";
import { ChecklistShareLink } from "@/components/admin/ChecklistShareLink";
import { ChecklistBoard } from "@/components/checklist/ChecklistBoard";
import { DeleteButton } from "@/components/ui/DeleteButton";

const weddingDateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function AdminChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const checklist = await prisma.clientChecklist.findUnique({
    where: { id },
    include: {
      couple: true,
      items: { orderBy: [{ phase: "asc" }, { order: "asc" }] },
    },
  });
  if (!checklist) notFound();
  const { couple } = checklist;

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-1">
        <Link href="/admin/checklists" className="text-sm text-muted-foreground hover:underline">
          ← Checklist dos noivos
        </Link>
        <h1 className="font-serif-display text-2xl text-foreground">
          Checklist · {couple.names}
        </h1>
        <p className="text-sm text-muted-foreground">
          {couple.weddingDate
            ? `Casamento em ${weddingDateFormat.format(couple.weddingDate)}`
            : "Sem data do casamento"}
          {" · "}
          <Link href={`/admin/casais/${couple.id}`} className="text-accent underline">
            editar nomes/data do casal
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Tudo que você marcar aqui também aparece pro casal, e vice-versa.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-6">
        <p className="font-medium text-foreground">Link do casal</p>
        <p className="text-sm text-muted-foreground">
          Envie este link pros noivos. Qualquer pessoa com o link consegue ver
          e marcar o checklist, então mande só pra eles.
        </p>
        <ChecklistShareLink path={`/checklist/${checklist.token}`} names={couple.names} />
        <form action={regenerateChecklistToken.bind(null, id)} className="self-start">
          <DeleteButton
            confirmText="Gerar um link novo? O link atual vai parar de funcionar e você vai precisar enviar o novo pro casal."
            label="Gerar novo link (se o atual vazou)"
          />
        </form>
      </div>

      <ChecklistBoard
        isAdmin
        initialItems={checklist.items.map(toChecklistItemView)}
        weddingDate={couple.weddingDate?.toISOString() ?? null}
        actions={{
          toggle: adminToggleItem.bind(null, id),
          saveNote: adminSaveItemNote.bind(null, id),
          add: adminAddItem.bind(null, id),
          remove: adminDeleteItem.bind(null, id),
          setNotApplicable: adminSetNotApplicable.bind(null, id),
          update: adminUpdateItem.bind(null, id),
        }}
      />

      <form action={deleteChecklist.bind(null, id)} className="self-start">
        <DeleteButton
          confirmText="Excluir este checklist? O link do casal vai parar de funcionar e todas as marcações serão perdidas. (O cadastro do casal continua.)"
          label="Excluir checklist"
        />
      </form>
    </div>
  );
}
