import { Compass, Copy, Download, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Run } from '@/game/run';
import { downloadResults, exportResults } from '@/game/exportResults';
import { Button } from './Button';
import { Modal } from './Modal';

const IDEAS = [
  ['Build your own trivia', 'Choose your own topics and questions.'],
  ['PM job search tips', 'Find practical ideas for your next career move.'],
  ['Ask the sources', 'Explore questions with the source material.'],
  ['Play live against the room', 'Play multiplayer with other people in the room.'],
];
export function WhatsNext({ run }: { run: Run }) {
  const [open, setOpen] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => { setCanShare(typeof navigator.share === 'function'); }, []);
  const results = exportResults(run);
  const copy = async () => {
    try { await navigator.clipboard.writeText(results.markdown); setStatus('Results copied.'); }
    catch { setStatus('Copy unavailable. Download your results instead.'); }
  };
  const share = async () => {
    try { await navigator.share({ title: "Builder's Galaxy results", text: results.shareText }); }
    catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setStatus('Sharing unavailable. Copy your results instead.'); }
  };
  return <>
    <Button onClick={() => setOpen(true)} className="mt-6 w-full"><Compass aria-hidden /> What's next?</Button>
    {open && <Modal title="What's next?" onClose={() => setOpen(false)}>
      <section>
        <h3 className="font-display text-xl font-bold">Take your results with you</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your score, every question and its source. Made on this device, nothing is uploaded.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {canShare && <Button variant="secondary" size="md" onClick={share}><Share2 aria-hidden /> Share</Button>}
          <Button variant="secondary" size="md" onClick={copy}><Copy aria-hidden /> Copy results</Button>
          <Button variant="secondary" size="md" onClick={() => downloadResults(results.markdown, 'md')}><Download aria-hidden /> Download (Markdown)</Button>
          <Button variant="secondary" size="md" onClick={() => downloadResults(JSON.stringify(results.data, null, 2), 'json')}><Download aria-hidden /> Download (JSON)</Button>
        </div>
        <p role="status" className="mt-3 text-sm text-success">{status}</p>
      </section>
      <section className="mt-8 border-t border-border pt-6">
        <h3 className="font-display text-xl font-bold">What should we build next?</h3>
        <fieldset className="mt-3">
          <legend className="text-sm text-muted-foreground">None of these exist yet. Pick any you would use.</legend>
          <div className="mt-3 grid gap-3">
            {IDEAS.map(([title, hint]) => <label key={title} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <input type="checkbox" value={title} className="mt-1 size-5 shrink-0 accent-primary" />
              <span><span className="block font-semibold">{title}</span><span className="block text-sm text-muted-foreground">{hint}</span></span>
            </label>)}
          </div>
          <div hidden><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        </fieldset>
        <Button disabled className="mt-4">Send my vote</Button>
        <p className="mt-2 text-sm text-muted-foreground">Voting is not connected. Your selections are not submitted.</p>
      </section>
    </Modal>}
  </>;
}
