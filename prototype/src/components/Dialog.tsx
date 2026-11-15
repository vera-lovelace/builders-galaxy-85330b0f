import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Modal built on the native <dialog> (showModal): the page behind is inert, Escape
 * closes it, and focus is trapped inside. Focus moves to the title on open and
 * returns to the control that opened it on close. No open/close animation.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      titleRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={() => {
        onClose();
        opener.current?.focus();
      }}
      className="m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-lg border border-border bg-surface p-0 text-foreground shadow-raised backdrop:bg-background/80"
    >
      <div className="flex max-h-[88dvh] flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <h2 ref={titleRef} id={titleId} tabIndex={-1} className="pt-2 text-xl font-bold leading-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="-mr-2 inline-flex min-h-12 shrink-0 items-center gap-1.5 rounded px-3 font-display font-semibold text-muted-foreground hover:bg-surface-raised hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
            Close
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </dialog>
  );
}
