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
