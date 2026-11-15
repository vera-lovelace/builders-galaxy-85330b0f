import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Opens the About page. A link styled as a ghost button: it navigates to a page,
 * so screen readers announce it as a link. Never a Nova (primary) action.
 */
export function AboutLink({ className, label = "About" }: { className?: string; label?: string }) {
  return (
    <Link
      to="/about"
      className={cn(
        "inline-flex min-h-12 items-center gap-2 rounded px-3 font-display font-semibold text-muted-foreground hover:bg-surface hover:text-foreground",
        className,
      )}
    >
      <Info className="size-5" aria-hidden />
      {label}
    </Link>
  );
}
