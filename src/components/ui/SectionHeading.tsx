export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleClassName = "text-foreground",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  titleClassName?: string;
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif-display text-3xl sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
