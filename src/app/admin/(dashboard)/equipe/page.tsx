import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createTeamMember } from "@/lib/actions/team";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";

export default async function AdminEquipePage() {
  const team = await prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Equipe</h1>
        <p className="text-sm text-muted-foreground">
          Apresente as pessoas por trás de cada evento.
        </p>
      </div>

      <form
        action={createTeamMember}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">
          Novo membro da equipe
        </p>
        <AdminField label="Nome" name="name">
          <input name="name" required className="input" />
        </AdminField>
        <AdminField label="Cargo / função" name="role">
          <input name="role" required placeholder="Ex: Cerimonialista" className="input" />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="Bio (opcional)" name="bio">
            <textarea name="bio" rows={3} className="input resize-none" />
          </AdminField>
        </div>
        <AdminField label="Foto (opcional)" name="photo">
          <input type="file" name="photo" accept="image/*" className="input" />
        </AdminField>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4" />
          Publicado no site
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar membro</Button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {team.length === 0 && (
          <p className="text-muted-foreground">Nenhum membro cadastrado.</p>
        )}
        {team.map((member) => (
          <Link
            key={member.id}
            href={`/admin/equipe/${member.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-sm"
          >
            <div>
              <p className="font-medium text-foreground">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                member.published
                  ? "bg-green-50 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {member.published ? "Publicado" : "Rascunho"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
