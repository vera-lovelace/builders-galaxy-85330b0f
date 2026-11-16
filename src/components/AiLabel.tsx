import euAiIcon from "@/assets/eu-ai-basic-white.svg.asset.json";

export function AiLabel({ voice = false }: { voice?: boolean }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-2 font-semibold text-foreground">
        <img src={euAiIcon.url} alt="" aria-hidden="true" width={36} height={24} className="h-6 w-9 shrink-0 object-contain" />
        {voice ? "AI voice guide" : "AI-generated text"}
      </span>
      <span>{voice ? "Synthetic voice, not a human adviser." : "May contain mistakes. Review before using."}</span>
    </p>
  );
}