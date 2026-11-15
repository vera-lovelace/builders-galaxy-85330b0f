import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Rocket } from "./Rocket";
import { cn } from "@/lib/cn";

/** Page frame: brand mark, optional right-side slot, centred content column. */
export function Shell({
  children,
  aside,
  width = "md",
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  width?: "md" | "lg" | "xl";
  className?: string;
}) {
  const max = { md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" }[width];
  return (
    <div className="flex min-h-dvh flex-col">
      <header className={cn("mx-auto flex w-full items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6", max)}>
        <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-bold">
          <Rocket size={26} />
          Builder's Galaxy
        </Link>
        {aside}
      </header>
      <main className={cn("mx-auto flex w-full flex-1 flex-col px-4 pb-safe pt-6 sm:px-6", max, className)}>
        {children}
      </main>
    </div>
  );
}
