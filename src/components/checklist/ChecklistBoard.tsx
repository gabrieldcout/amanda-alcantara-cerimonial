"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { CHECKLIST_PHASES, getPhaseDueDate } from "@/lib/checklistTemplate";
import type { ChecklistItemView } from "@/lib/checklistItemView";

type Actions = {
  toggle: (itemId: string, done: boolean) => Promise<ChecklistItemView>;
  saveNote: (itemId: string, note: string) => Promise<ChecklistItemView>;
  add: (phase: number, title: string, priority?: boolean) => Promise<ChecklistItemView>;
  remove: (itemId: string) => Promise<void>;
  setNotApplicable: (itemId: string, value: boolean) => Promise<ChecklistItemView>;
  // Só no painel: editar texto, fase e prioridade.
  update?: (itemId: string, changes: ItemChanges) => Promise<ChecklistItemView>;
};

type ItemChanges = { title: string; phase: number; priority: boolean };

type Filter = "all" | "pending" | "done";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "done", label: "Concluídas" },
];

// Datas do casamento são salvas como meia-noite UTC, então formatamos em UTC
// pra não "voltar um dia" no fuso do Brasil.
const dueDateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const doneAtFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export function ChecklistBoard({
  initialItems,
  weddingDate,
  actions,
  isAdmin = false,
}: {
  initialItems: ChecklistItemView[];
  weddingDate: string | null;
  actions: Actions;
  isAdmin?: boolean;
}) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<Filter>("all");
  const [, startTransition] = useTransition();

  const wedding = weddingDate ? new Date(weddingDate) : null;
  const now = new Date();
  // Itens marcados como "não se aplica" não entram na conta.
  const counted = items.filter((i) => !i.notApplicable);
  const total = counted.length;
  const doneCount = counted.filter((i) => i.done).length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const currentPhase = CHECKLIST_PHASES.findIndex((_, index) =>
    counted.some((i) => i.phase === index && !i.done)
  );

  function replaceItem(updated: ChecklistItemView) {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  }

  function toggle(item: ChecklistItemView) {
    const done = !item.done;
    replaceItem({
      ...item,
      done,
      doneAt: done ? new Date().toISOString() : null,
    });
    startTransition(async () => {
      try {
        replaceItem(await actions.toggle(item.id, done));
      } catch {
        replaceItem(item);
        alert("Não foi possível salvar. Verifique sua conexão e tente de novo.");
      }
    });
  }

  function setNotApplicable(item: ChecklistItemView, value: boolean) {
    replaceItem({
      ...item,
      notApplicable: value,
      notApplicableByCouple: value && !isAdmin,
      ...(value ? { done: false, doneAt: null } : {}),
    });
    startTransition(async () => {
      try {
        replaceItem(await actions.setNotApplicable(item.id, value));
      } catch {
        replaceItem(item);
        alert("Não foi possível salvar. Verifique sua conexão e tente de novo.");
      }
    });
  }

  async function saveNote(item: ChecklistItemView, note: string) {
    try {
      replaceItem(await actions.saveNote(item.id, note));
      return true;
    } catch {
      alert("Não foi possível salvar a anotação. Tente de novo.");
      return false;
    }
  }

  async function addItem(phase: number, title: string, priority = false) {
    try {
      const created = await actions.add(phase, title, priority);
      setItems((prev) => [...prev, created]);
      return true;
    } catch {
      alert("Não foi possível adicionar o item. Tente de novo.");
      return false;
    }
  }

  async function updateItem(item: ChecklistItemView, changes: ItemChanges) {
    if (!actions.update) return false;
    try {
      replaceItem(await actions.update(item.id, changes));
      return true;
    } catch {
      alert("Não foi possível salvar o item. Tente de novo.");
      return false;
    }
  }

  function removeItem(item: ChecklistItemView) {
    if (!confirm(`Excluir "${item.title}" do checklist?`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    startTransition(async () => {
      try {
        await actions.remove(item.id);
      } catch {
        setItems((prev) => [...prev, item]);
        alert("Não foi possível excluir o item. Tente de novo.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Progresso geral
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {doneCount} de {total} etapas concluídas
            </p>
          </div>
          <p className="font-serif-display text-3xl text-foreground">{percent}%</p>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        {total > 0 && doneCount === total && (
          <p className="text-sm font-medium text-accent-dark">
            🎉 Tudo concluído! Agora é só aproveitar o grande dia.
          </p>
        )}
      </div>

      {isAdmin && (
        <QuickAddForm
          defaultPhase={currentPhase === -1 ? 0 : currentPhase}
          onAdd={addItem}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              filter === f.value
                ? "bg-accent text-white"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {CHECKLIST_PHASES.map((phase, phaseIndex) => {
          const phaseItems = items.filter((i) => i.phase === phaseIndex);
          const phaseCounted = phaseItems.filter((i) => !i.notApplicable);
          const phaseDone = phaseCounted.filter((i) => i.done).length;
          const complete =
            phaseCounted.length > 0 && phaseDone === phaseCounted.length;
          const due = wedding ? getPhaseDueDate(phaseIndex, wedding) : null;
          const late = !complete && due !== null && due < now;
          const visible = phaseItems
            .filter((i) =>
              filter === "all"
                ? true
                : filter === "done"
                  ? i.done
                  : !i.done && !i.notApplicable
            )
            .sort(
              (a, b) =>
                Number(a.notApplicable) - Number(b.notApplicable) ||
                Number(b.priority) - Number(a.priority)
            );
          if (filter !== "all" && visible.length === 0) return null;

          return (
            <section
              key={phase.period}
              className={`flex flex-col gap-4 rounded-2xl border p-5 sm:p-6 ${
                phaseIndex === currentPhase
                  ? "border-accent/50 bg-accent/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      complete ? "bg-accent text-white" : "bg-accent/15 text-accent-dark"
                    }`}
                  >
                    {complete ? "✓" : phaseIndex + 1}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h2 className="font-serif-display text-lg text-foreground">
                      {phase.period}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                      {phase.tag}
                    </span>
                    {due && (
                      <span className="text-xs text-muted-foreground">
                        Ideal concluir até {dueDateFormat.format(due)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {complete ? (
                    <Badge className="bg-green-50 text-green-700">Concluída</Badge>
                  ) : late ? (
                    <Badge className="bg-red-50 text-red-700">Atrasada</Badge>
                  ) : phaseIndex === currentPhase ? (
                    <Badge className="bg-accent/20 text-accent-dark">Etapa atual</Badge>
                  ) : null}
                  <span className="text-sm text-muted-foreground">
                    {phaseDone}/{phaseCounted.length}
                  </span>
                </div>
              </div>

              {phaseItems.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum item nesta fase ainda.</p>
              )}

              <ul className="flex flex-col divide-y divide-border">
                {visible.map((item) => (
                  <ChecklistRow
                    key={item.id}
                    item={item}
                    canDelete={isAdmin || item.addedByCouple}
                    isAdmin={isAdmin}
                    onToggle={() => toggle(item)}
                    onNotApplicable={(value) => setNotApplicable(item, value)}
                    onSaveNote={(note) => saveNote(item, note)}
                    onUpdate={
                      actions.update ? (changes) => updateItem(item, changes) : undefined
                    }
                    onRemove={() => removeItem(item)}
                  />
                ))}
              </ul>

              {filter === "all" && (
                <AddItemForm onAdd={(title) => addItem(phaseIndex, title)} />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Badge({ className, children }: { className: string; children: string }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${className}`}>
      {children}
    </span>
  );
}

function ChecklistRow({
  item,
  canDelete,
  isAdmin,
  onToggle,
  onNotApplicable,
  onSaveNote,
  onUpdate,
  onRemove,
}: {
  item: ChecklistItemView;
  canDelete: boolean;
  isAdmin: boolean;
  onToggle: () => void;
  onNotApplicable: (value: boolean) => void;
  onSaveNote: (note: string) => Promise<boolean>;
  onUpdate?: (changes: ItemChanges) => Promise<boolean>;
  onRemove: () => void;
}) {
  const [editingItem, setEditingItem] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.note ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const ok = await onSaveNote(draft);
    setSaving(false);
    if (ok) setEditing(false);
  }

  if (editingItem && onUpdate) {
    return (
      <li className="py-3">
        <EditItemForm
          item={item}
          onCancel={() => setEditingItem(false)}
          onSave={async (changes) => {
            const ok = await onUpdate(changes);
            if (ok) setEditingItem(false);
          }}
        />
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-2 py-3">
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={item.done}
          aria-label={item.title}
          onClick={onToggle}
          disabled={item.notApplicable}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-sm transition-colors ${
            item.notApplicable
              ? "border-foreground/10 bg-muted text-muted-foreground"
              : item.done
                ? "border-accent bg-accent text-white"
                : "border-foreground/25 bg-white hover:border-accent"
          }`}
        >
          {item.notApplicable ? "–" : item.done && "✓"}
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <button
            type="button"
            onClick={onToggle}
            disabled={item.notApplicable}
            className={`text-left text-sm leading-relaxed ${
              item.notApplicable
                ? "text-muted-foreground/70 line-through"
                : item.done
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
            }`}
          >
            {item.title}
          </button>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {item.priority && (
              <span className="rounded-full bg-gold/25 px-2 py-0.5 font-medium text-accent-dark">
                ★ Prioridade
              </span>
            )}
            {item.notApplicable && (
              <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                Não se aplica
                {isAdmin && item.notApplicableByCouple && " · marcado pelo casal"}
              </span>
            )}
            {item.done && item.doneAt && (
              <span>Feito em {doneAtFormat.format(new Date(item.doneAt))}</span>
            )}
            {item.addedByCouple && isAdmin && (
              <span className="text-accent">Adicionado pelo casal</span>
            )}
            {!editing && (
              <button
                type="button"
                onClick={() => {
                  setDraft(item.note ?? "");
                  setEditing(true);
                }}
                className="text-accent hover:underline"
              >
                {item.note ? "Editar anotação" : "+ Anotação"}
              </button>
            )}
            {!item.done && (
              <button
                type="button"
                onClick={() => onNotApplicable(!item.notApplicable)}
                className="text-muted-foreground hover:text-foreground hover:underline"
              >
                {item.notApplicable ? "Voltar a valer" : "Não se aplica"}
              </button>
            )}
            {onUpdate && (
              <button
                type="button"
                onClick={() => setEditingItem(true)}
                className="text-accent hover:underline"
              >
                Editar
              </button>
            )}
          </div>
        </div>
        {canDelete && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Excluir "${item.title}"`}
            title="Excluir item"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            Excluir
          </button>
        )}
      </div>

      {item.note && !editing && (
        <p className="ml-9 whitespace-pre-line rounded-lg bg-muted px-3 py-2 text-sm text-foreground/80">
          {item.note}
        </p>
      )}

      {editing && (
        <div className="ml-9 flex flex-col gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            maxLength={2000}
            autoFocus
            placeholder="Ex: fornecedor, valor, contato, data da reunião…"
            className="input"
          />
          <div className="flex gap-3 text-sm">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-accent px-4 py-1.5 text-white hover:bg-accent-dark disabled:opacity-50"
            >
              {saving ? "Salvando…" : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-muted-foreground hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function AddItemForm({ onAdd }: { onAdd: (title: string) => Promise<boolean> }) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const ok = await onAdd(title.trim());
    setSaving(false);
    if (ok) setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={191}
        placeholder="Adicionar outro item nesta fase…"
        className="input flex-1"
      />
      <button
        type="submit"
        disabled={saving || !title.trim()}
        className="shrink-0 rounded-full border border-accent px-4 text-sm text-accent hover:bg-accent/10 disabled:opacity-40"
      >
        {saving ? "…" : "Adicionar"}
      </button>
    </form>
  );
}

function PhaseSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (phase: number) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="input"
    >
      {CHECKLIST_PHASES.map((phase, index) => (
        <option key={phase.period} value={index}>
          {index + 1}. {phase.period}
        </option>
      ))}
    </select>
  );
}

function PriorityCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
      ★ Prioridade
    </label>
  );
}

function EditItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: ChecklistItemView;
  onSave: (changes: ItemChanges) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [phase, setPhase] = useState(item.phase);
  const [priority, setPriority] = useState(item.priority);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({ title: title.trim(), phase, priority });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl bg-muted p-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={191}
        autoFocus
        className="input"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:flex-1">
          <PhaseSelect value={phase} onChange={setPhase} />
        </div>
        <PriorityCheckbox checked={priority} onChange={setPriority} />
      </div>
      <div className="flex gap-3 text-sm">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="rounded-full bg-accent px-4 py-1.5 text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {saving ? "Salvando…" : "Salvar"}
        </button>
        <button type="button" onClick={onCancel} className="text-muted-foreground hover:underline">
          Cancelar
        </button>
      </div>
    </form>
  );
}

// "Adicionar rápido" do painel — pensado pra ir montando o checklist durante
// a reunião de briefing: digita, Enter, e já pode digitar o próximo.
function QuickAddForm({
  defaultPhase,
  onAdd,
}: {
  defaultPhase: number;
  onAdd: (phase: number, title: string, priority: boolean) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState(defaultPhase);
  const [priority, setPriority] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setSaving(true);
    const ok = await onAdd(phase, trimmed, priority);
    setSaving(false);
    if (ok) {
      setLastAdded(trimmed);
      setTitle("");
      setPriority(false);
      inputRef.current?.focus();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-5"
    >
      <div>
        <p className="font-medium text-foreground">Adicionar item</p>
        <p className="text-xs text-muted-foreground">
          Ex: &quot;Contratar tenda&quot;. Digite, escolha a fase e aperte Enter —
          o item já aparece pro casal.
        </p>
      </div>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={191}
        placeholder="O que o casal precisa fazer?"
        className="input"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:flex-1">
          <PhaseSelect value={phase} onChange={setPhase} />
        </div>
        <PriorityCheckbox checked={priority} onChange={setPriority} />
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="rounded-full bg-accent px-5 py-2 text-sm text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {saving ? "Adicionando…" : "Adicionar"}
        </button>
      </div>
      {lastAdded && (
        <p className="text-xs text-accent-dark">✓ &quot;{lastAdded}&quot; adicionado</p>
      )}
    </form>
  );
}
