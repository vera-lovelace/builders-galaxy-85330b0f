import { ExternalLink } from "lucide-react";
export function Source({ title, url }: { title?: string | undefined; url?: string | undefined }) {
  if (!title) return null;
  const linked = url && /^https?:\/\//.test(url);
  return <p className="mt-3 text-sm text-muted-foreground">Source: {linked ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-info underline underline-offset-4">
      {title}<ExternalLink className="ml-1 inline size-3.5" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : title}</p>;
}
