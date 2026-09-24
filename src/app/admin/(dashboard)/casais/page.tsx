import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createCouple } from "@/lib/actions/couples";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default async function AdminCasaisPage() {
  const couples = await prisma.couple.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { media: true } } },
  });

  const upcomingCouple = await prisma.couple.findFirst({
    where: { published: true, weddingDate: { gte: new Date() } },
    orderBy: { weddingDate: "asc" },
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">
          Histórias reais
        </h1>
        <p className="text-sm text-muted-foreground">
          Perfis de casais com fotos, vídeos e a história do grande dia.
        </p>
      </div>

      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
        <p className="font-medium">Contagem regressiva na home</p>
        {upcomingCouple ? (
          <p className="mt-1 text-muted-foreground">
            Hoje o site mostra <strong>{upcomingCouple.names}</strong> como
            "Próximo casamento" na página inicial. Isso é automático: sempre
            que a data desse casamento passar, o casal seguinte com data
            futura e marcado como "Publicado" assume o lugar.
          </p>
        ) : (
          <p className="mt-1 text-muted-foreground">
            Nenhum casal com data futura publicada no momento — a seção
            "Próximo casamento" fica escondida na home até você cadastrar um
            casal com a <strong>data do casamento</strong> preenchida e a
            caixinha <strong>"Publicado no site"</strong> marcada.
          </p>
        )}
        <p className="mt-2 text-muted-foreground">
          Sempre que fechar um casamento novo, cadastre o casal aqui com a
          data — assim a home fica sempre com a contagem certa. Veja o passo
          a passo completo na aba{" "}
          <Link href="/admin/tutorial" className="text-accent underline">
            Tutorial
          </Link>
          .
        </p>
      </div>

      <form
        action={createCouple}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        <p className="font-medium text-foreground sm:col-span-2">Novo casal</p>
        <AdminField label="Nomes do casal" name="names">
          <input name="names" required placeholder="Ex: Ana & João" className="input" />
        </AdminField>
        <AdminField label="Slug (URL, sem espaços)" name="slug">
          <input
            name="slug"
            required
            placeholder="ex: ana-e-joao"
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            className="input"
          />
        </AdminField>
        <AdminField label="Data do casamento (opcional)" name="weddingDate">
          <input name="weddingDate" type="date" className="input" />
        </AdminField>
        <AdminField label="Foto de capa (opcional)" name="photo">
          <input type="file" name="photo" accept="image/*" className="input" />
        </AdminField>
        <div className="sm:col-span-2">
          <AdminField label="História do casal (opcional)" name="story">
            <RichTextEditor name="story" rows={3} />
          </AdminField>
        </div>
        <AdminField label="Ordem de exibição" name="order">
          <input name="order" type="number" defaultValue={0} className="input" />
        </AdminField>
        <div className="flex flex-col gap-2 self-end pb-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="published" defaultChecked className="h-4 w-4" />
            Publicado no site (entra no "Próximo casamento")
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="showInStories" className="h-4 w-4" />
            Mostrar em "Histórias reais"
          </label>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">Adicionar casal</Button>
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        {couples.length === 0 && (
          <p className="text-muted-foreground">Nenhum casal cadastrado.</p>
        )}
        {couples.map((couple) => (
          <Link
            key={couple.id}
            href={`/admin/casais/${couple.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-sm"
          >
            <div>
              <p className="font-medium text-foreground">
                {couple.names}
                {upcomingCouple?.id === couple.id && (
                  <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-normal text-accent-dark">
                    Na home agora
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {couple._count.media} arquivo(s) de mídia
                {couple.published && couple.showInStories && " · em Histórias reais"}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                couple.published
                  ? "bg-green-50 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {couple.published ? "Publicado" : "Rascunho"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
