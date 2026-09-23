"use client";

import { useActionState, useRef } from "react";
import {
  submitTestimonial,
  type SubmitTestimonialState,
} from "@/lib/actions/testimonials";
import { Button } from "@/components/ui/Button";

const initialState: SubmitTestimonialState = {};

export function TestimonialSubmitForm({ defaultName }: { defaultName?: string }) {
  const [state, formAction, isPending] = useActionState(submitTestimonial, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="font-serif-display text-xl text-foreground">
          Obrigada por compartilhar! 💛
        </p>
        <p className="mt-2 text-muted-foreground">
          Seu depoimento foi enviado e vai aparecer no site assim que for
          aprovado.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">Seu nome</span>
        <input
          name="clientName"
          required
          defaultValue={defaultName}
          className="input"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Tipo de evento (opcional)</span>
        <input name="eventType" placeholder="Ex: Casamento" className="input" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Nota</span>
        <select name="rating" defaultValue="5" className="input">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "estrela" : "estrelas"}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">Conte como foi sua experiência</span>
        <textarea
          name="quote"
          required
          rows={4}
          className="input resize-none"
          placeholder="Compartilhe como foi trabalhar com a Amanda..."
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">Uma foto sua (opcional)</span>
        <input type="file" name="photo" accept="image/*" className="input" />
      </label>

      {state.error && <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar depoimento"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Seu depoimento passa por uma revisão antes de aparecer no site.
        </p>
      </div>
    </form>
  );
}
