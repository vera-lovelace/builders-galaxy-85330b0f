import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./Rocket";
import { SoundToggle } from "./SoundToggle";

export function Shell({ children, right, className, wide }: { children: ReactNode; right?: ReactNode; className?: string; wide?: boolean }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-space">
      <div className={cn("relative z-10 mx-auto flex min-h-dvh w-full flex-col px-4 sm:px-6 pb-8 pt-5 sm:pt-6", wide ? "max-w-6xl" : "max-w-2xl", className)}>
        <header className="mb-6 flex items-center justify-between">
          <Link to="/" aria-label="Builder's Galaxy home"><BrandMark /></Link>
          <div className="flex items-center gap-2"><SoundToggle />{right}</div>
        </header>
        {children}
      </div>
    </main>
  );
}
