"use client";

import type { ChangeEvent, InputHTMLAttributes } from "react";

// Fotos de celular chegam com 3–6MB; reduzimos no próprio aparelho antes do
// envio pra deixar o upload rápido e longe do limite das Server Actions.
const MAX_DIMENSION = 2400;
const JPEG_QUALITY = 0.85;
const SKIP_BELOW_BYTES = 800 * 1024;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler a imagem."));
    };
    img.src = url;
  });
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  if (file.size <= SKIP_BELOW_BYTES) return file;

  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  // PNG mantém PNG pra não perder transparência (ex.: logos de parceiros).
  const keepPng = file.type === "image/png";
  const outType = keepPng ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, outType, keepPng ? undefined : JPEG_QUALITY),
  );
  if (!blob || blob.size >= file.size) return file;

  const baseName = file.name.replace(/\.[^.]+$/, "") || "foto";
  return new File([blob], `${baseName}.${keepPng ? "png" : "jpg"}`, {
    type: outType,
    lastModified: Date.now(),
  });
}

type PhotoInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PhotoInput({ onChange, accept = "image/*", ...props }: PhotoInputProps) {
  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    onChange?.(event);
    if (files.length === 0) return;

    // Bloqueia o envio do formulário enquanto as fotos são processadas.
    input.setCustomValidity(
      files.length > 1 ? "Aguarde, preparando as fotos..." : "Aguarde, preparando a foto...",
    );
    try {
      const compressed = await Promise.all(
        files.map((file) => compressImage(file).catch(() => file)),
      );
      if (compressed.some((file, i) => file !== files[i])) {
        const transfer = new DataTransfer();
        for (const file of compressed) transfer.items.add(file);
        input.files = transfer.files;
      }
    } catch {
      // Se o navegador não conseguir comprimir, segue com os arquivos originais.
    } finally {
      input.setCustomValidity("");
    }
  }

  return <input type="file" accept={accept} onChange={handleChange} {...props} />;
}
