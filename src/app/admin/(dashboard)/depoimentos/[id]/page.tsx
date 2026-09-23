import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const updateWithId = updateTestimonial.bind(null, id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-serif-display text-2xl text-foreground">
        Editar depoimento
      </h1>

      <form
        action={updateWithId}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <AdminField label="Nome do cliente" name="clientName">
          <input
            name="clientName"
            required
            defaultValue={testimonial.clientName}
            className="input"
          />
        </AdminField>
        <AdminField label="Tipo de evento" name="eventType">
          <input
            name="eventType"
            defaultValue={testimonial.eventType ?? ""}
            className="input"
          />
        </AdminField>
        <AdminField label="Nota (1 a 5)" name="rating">
          <select name="rating" defaultValue={testimonial.rating} className="input">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Foto (opcional)" name="photo">
          {testimonial.photoUrl && (
            <MediaImage
              src={testimonial.photoUrl}
              alt=""
              className="mb-2 h-20 w-20 rounded-full object-cover"
            />
          )}
          <input type="file" name="photo" accept="image/*" className="input" />
          {testimonial.photoUrl && (
            <p className="mt-1 text-xs text-muted-foreground">
              Deixe em branco pra manter a foto atual.
            </p>
          )}
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Depoimento" name="quote">
            <RichTextEditor name="quote" defaultValue={testimonial.quote} rows={3} />
          </AdminField>
        </div>
        <AdminField label="Ordem de exibição" name="order">
          <input
            name="order"
            type="number"
            defaultValue={testimonial.order}
            className="input"
          />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={testimonial.published}
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="flex items-center gap-4 sm:col-span-2">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>

      <form action={deleteTestimonial.bind(null, id)} className="self-start">
        <DeleteButton
          confirmText="Excluir este depoimento permanentemente?"
          label="Excluir depoimento"
        />
      </form>
    </div>
  );
}
