import type { ChecklistItem } from "@prisma/client";

// Versão serializável de um ChecklistItem (datas em string), passada pro
// componente do checklist no navegador.
export type ChecklistItemView = {
  id: string;
  phase: number;
  title: string;
  note: string | null;
  done: boolean;
  doneAt: string | null;
  priority: boolean;
  notApplicable: boolean;
  notApplicableByCouple: boolean;
  addedByCouple: boolean;
};

export function toChecklistItemView(item: ChecklistItem): ChecklistItemView {
  return {
    id: item.id,
    phase: item.phase,
    title: item.title,
    note: item.note,
    done: item.done,
    doneAt: item.doneAt ? item.doneAt.toISOString() : null,
    priority: item.priority,
    notApplicable: item.notApplicable,
    notApplicableByCouple: item.notApplicableByCouple,
    addedByCouple: item.addedByCouple,
  };
}
