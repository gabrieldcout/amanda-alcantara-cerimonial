import type { CSSProperties } from "react";
import { PlaceholderImage } from "@/components/site/PlaceholderImage";

export function MediaImage({
  src,
  alt,
  className = "",
  style,
  placeholderLabel,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  style?: CSSProperties;
  placeholderLabel?: string;
}) {
  if (!src) {
    return <PlaceholderImage label={placeholderLabel} className={className} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
}
