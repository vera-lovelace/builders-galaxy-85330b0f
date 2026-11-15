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
    className="modal m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[88dvh] overflow-y-auto rounded-lg border border-border bg-surface p-4 text-foreground sm:p-6">
    <div className="mb-5 flex items-start justify-between gap-3">
      <h2 ref={heading} id={id} tabIndex={-1} className="min-w-0 font-display text-2xl font-bold outline-none">{title}</h2>
      <Button variant="secondary" size="md" onClick={onClose} className="shrink-0"><X aria-hidden /> Close</Button>
    </div>
    {children}
  </dialog>;
}
