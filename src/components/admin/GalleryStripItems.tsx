"use client";

import { useState } from "react";
import type { GalleryItem } from "@/lib/sitePhotos";

// Grade de uma faixa no painel: marca várias fotos e tira todas de uma vez.
export function GalleryStripItems({
  items,
  removeAction,
}: {
  items: readonly GalleryItem[];
  removeAction: (formData: FormData) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const removable = items.filter((item) => item.slot !== null).map((item) => item.slot!);
  const allSelected = removable.length > 0 && selected.size === removable.length;

  function toggle(slot: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slot)) next.delete(slot);
      else next.add(slot);
      return next;
    });
  }

  return (
    <form
      action={async (formData) => {
        await removeAction(formData);
        setSelected(new Set());
      }}
      className="flex flex-col gap-3"
    >
      {removable.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSelected(allSelected ? new Set() : new Set(removable))}
            className="text-xs font-medium text-accent hover:underline"
          >
            {allSelected ? "Desmarcar todas" : "Marcar todas"}
          </button>
          <span className="text-xs text-muted-foreground">
            Toque nas fotos para marcar as que quer tirar.
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {items.map((item, i) => {
          const isSelected = item.slot !== null && selected.has(item.slot);
          const media = item.isVideo ? (
            <span className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted p-2 text-center text-xs text-accent">
              Vídeo
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.url} alt="" className="aspect-square w-full rounded-lg object-cover" />
          );

          if (item.slot === null) {
            return <div key={`${item.url}-${i}`}>{media}</div>;
          }

          return (
            <label
              key={item.slot}
              className={`relative block cursor-pointer rounded-lg ring-offset-2 transition ${
                isSelected ? "opacity-60 ring-2 ring-red-600" : ""
              }`}
            >
              {media}
              <input
                type="checkbox"
                name="slots"
                value={item.slot}
                checked={isSelected}
                onChange={() => toggle(item.slot!)}
                className="absolute left-2 top-2 h-5 w-5 accent-red-600"
              />
            </label>
          );
        })}
      </div>

      {removable.length > 0 && (
        <div>
          <button
            type="submit"
            disabled={selected.size === 0}
            onClick={(e) => {
              const n = selected.size;
              if (!confirm(`Tirar ${n} ${n === 1 ? "foto" : "fotos"} desta faixa?`)) {
                e.preventDefault();
              }
            }}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tirar fotos marcadas{selected.size > 0 ? ` (${selected.size})` : ""}
          </button>
        </div>
      )}
    </form>
  );
}
