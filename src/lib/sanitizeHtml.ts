import DOMPurify from "isomorphic-dompurify";

// Usado nos campos que viram HTML através do RichTextEditor do painel
// (negrito/itálico/sublinhado/fonte) — mantém só o que o editor gera.
export function sanitizeRichText(html: string | null | undefined): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "strong", "em", "u", "span", "br"],
    ALLOWED_ATTR: ["style"],
  });
}

// Usado em texto digitado por visitantes (ex: depoimento público) — não
// confia em nenhuma tag vinda do formulário, só preserva quebras de linha.
export function plainTextToSafeHtml(text: string): string {
  const plain = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  return plain
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.trim().replace(/\n/g, "<br>")}</p>`)
    .join("");
}
