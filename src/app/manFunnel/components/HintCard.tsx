"use client";

import { ReactNode } from "react";

type HintVariant = "blue" | "green" | "yellow" | "red";

const VARIANT_STYLES: Record<
  HintVariant,
  {
    container: string;
  }
> = {
  blue: { container: "bg-[#061338] border-[#1a4ce6]" },
  green: { container: "bg-[#063318] border-[#4ade80]" },
  yellow: { container: "bg-[#3a2a00] border-[#f59e0b]" },
  red: { container: "bg-[#3a0b0b] border-[#ef4444]" },
};

export default function HintCard({
  title,
  body,
  variant,
  icon,
}: {
  title: string;
  body: string;
  variant: HintVariant;
  icon?: ReactNode;
}) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className={`w-full rounded-2xl border p-4 ${styles.container}`}>
      <div className="flex gap-3">
        <div className="shrink-0 pt-1">
          {icon ?? <div className="h-6 w-6 rounded bg-white/90" />}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white leading-snug">{title}</p>
          <p className="text-white/85 text-sm leading-relaxed mt-1">{body}</p>
        </div>
      </div>
    </div>
  );
}

