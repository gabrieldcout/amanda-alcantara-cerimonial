import type { Instrumentation } from "next";

// Grava erros do servidor em arquivo pra aparecerem em /admin/erros.
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const error = err instanceof Error ? err : new Error(String(err));
    const digest =
      typeof err === "object" && err !== null && "digest" in err
        ? String((err as { digest: unknown }).digest)
        : undefined;
    try {
      const { appendErrorLog } = await import("./lib/errorLog");
      await appendErrorLog({
        at: new Date().toISOString(),
        path: request.path,
        method: request.method,
        kind: context.routeType,
        route: context.routePath,
        digest,
        message: error.message,
        stack: error.stack?.split("\n").slice(0, 8).join("\n"),
      });
    } catch (logError) {
      console.error("Falha ao gravar log de erro:", logError);
    }
  }
};
