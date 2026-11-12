import { appendFile, mkdir, readFile, stat, rename } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// Registro dos erros do servidor em produção, visível em /admin/erros.
// Fica junto das fotos, fora da pasta do app, pra sobreviver aos deploys.
const LOG_DIR = path.join(os.homedir(), "uploads-persistent");
const LOG_FILE = path.join(LOG_DIR, "amandacerimonial-erros.log");
const MAX_BYTES = 512 * 1024;

export type ErrorLogEntry = {
  at: string;
  path: string;
  method: string;
  kind: string;
  route: string;
  digest?: string;
  message: string;
  stack?: string;
};

export async function appendErrorLog(entry: ErrorLogEntry) {
  await mkdir(LOG_DIR, { recursive: true });
  try {
    if ((await stat(LOG_FILE)).size > MAX_BYTES) {
      await rename(LOG_FILE, `${LOG_FILE}.old`);
    }
  } catch {
    // arquivo ainda não existe
  }
  await appendFile(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
}

export async function readErrorLog(limit = 30): Promise<ErrorLogEntry[]> {
  try {
    const lines = (await readFile(LOG_FILE, "utf8")).trim().split("\n");
    return lines
      .slice(-limit)
      .reverse()
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as ErrorLogEntry];
        } catch {
          return [];
        }
      });
  } catch {
    return [];
  }
}
