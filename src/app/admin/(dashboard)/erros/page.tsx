import { requireAdmin } from "@/lib/auth";
import { readErrorLog } from "@/lib/errorLog";

export default async function AdminErrosPage() {
  await requireAdmin();
  const entries = await readErrorLog(30);

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Erros do site</h1>
        <p className="text-sm text-muted-foreground">
          Últimos erros do servidor, do mais recente para o mais antigo. Mande um
          print desta página para o suporte técnico.
        </p>
      </div>
      {entries.length === 0 && (
        <p className="text-muted-foreground">Nenhum erro registrado.</p>
      )}
      {entries.map((e, i) => (
        <div
          key={`${e.at}-${i}`}
          className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-xs"
        >
          <p className="text-muted-foreground">
            {new Date(e.at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} ·{" "}
            {e.method} {e.path} · {e.kind} {e.route}
            {e.digest ? ` · código ${e.digest}` : ""}
          </p>
          <p className="font-medium text-foreground">{e.message}</p>
          {e.stack && (
            <pre className="overflow-x-auto whitespace-pre-wrap text-muted-foreground">
              {e.stack}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
