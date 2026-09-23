import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTeamMember, deleteTeamMember } from "@/lib/actions/team";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { MediaImage } from "@/components/site/MediaImage";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-serif-display text-2xl text-foreground">
        Editar membro da equipe
      </h1>

      <form
        action={updateTeamMember.bind(null, id)}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <AdminField label="Nome" name="name">
          <input name="name" required defaultValue={member.name} className="input" />
        </AdminField>
        <AdminField label="Cargo / função" name="role">
          <input name="role" required defaultValue={member.role} className="input" />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Bio (opcional)" name="bio">
            <textarea
              name="bio"
              rows={3}
              defaultValue={member.bio ?? ""}
              className="input resize-none"
            />
          </AdminField>
        </div>
        <AdminField label="Foto (opcional)" name="photo">
          {member.photoUrl && (
            <MediaImage
              src={member.photoUrl}
              alt=""
              className="mb-2 h-20 w-20 rounded-full object-cover"
            />
          )}
          <input type="file" name="photo" accept="image/*" className="input" />
          {member.photoUrl && (
            <p className="mt-1 text-xs text-muted-foreground">
              Deixe em branco pra manter a foto atual.
            </p>
          )}
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={member.order} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={member.published}
            className="h-4 w-4"
          />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>

      <form action={deleteTeamMember.bind(null, id)} className="self-start">
        <DeleteButton
          confirmText="Excluir este membro da equipe permanentemente?"
          label="Excluir membro"
        />
      </form>
    </div>
  );
}
