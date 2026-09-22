"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function WeddingCountdown({ weddingDate }: { weddingDate: string }) {
  // Calculado só depois de montar no cliente, pra não bater com o valor
  // (levemente diferente) calculado no servidor e causar hydration mismatch.
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const target = new Date(weddingDate);
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const units = [
    { label: "Dias", value: timeLeft?.days ?? 0 },
    { label: "Horas", value: timeLeft?.hours ?? 0 },
    { label: "Minutos", value: timeLeft?.minutes ?? 0 },
    { label: "Segundos", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex w-16 flex-col items-center gap-1 rounded-2xl bg-background/90 py-3 sm:w-24 sm:py-5"
        >
          <span className="font-serif-display text-2xl text-accent-dark sm:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
