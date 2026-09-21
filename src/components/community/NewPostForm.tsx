"use client";

import { useActionState, useRef } from "react";
import { createPost, type PostFormState } from "@/lib/actions/community";
import { Button } from "@/components/ui/Button";

const initialState: PostFormState = {};

export function NewPostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
    >
      <textarea
        name="content"
        required
        rows={3}
        maxLength={2000}
        placeholder="Compartilhe algo com a comunidade..."
        className="input resize-none"
      />

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-700">
          Post enviado! Ele aparece publicamente após aprovação.
        </p>
      )}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Publicando..." : "Publicar"}
        </Button>
      </div>
    </form>
  );
}
