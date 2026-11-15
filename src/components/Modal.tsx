import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './Button';
import { X } from 'lucide-react';

/** Native modal keeps focus contained; explicitly restores the opener on close. */
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  useEffect(() => {
    const opener = document.activeElement;
    const element = dialog.current;
    element?.showModal();
    heading.current?.focus();
    return () => {
      element?.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);
  return <dialog ref={dialog} aria-labelledby={id} onCancel={onClose} onClose={() => { if (!dialog.current?.open) onClose(); }}
    className="modal m-auto w-[calc(100%-2rem)] max-w-xl max-h-[88dvh] overflow-y-auto rounded-2xl shadow-raised border border-border bg-surface p-0 text-foreground">
    <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border bg-surface px-5 py-4">
      <h2 ref={heading} id={id} tabIndex={-1} className="min-w-0 font-display text-2xl font-bold focus:outline-3 focus:outline-primary focus:outline-offset-3">{title}</h2>
      <Button variant="ghost" size="md" onClick={onClose} className="shrink-0"><X aria-hidden /> Close</Button>
    </div>
    <div className="p-5">{children}</div>
  </dialog>;
}
