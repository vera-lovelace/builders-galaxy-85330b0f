import earth from "@/assets/earth-full.png";
import { cn } from "@/lib/utils";

/** Full Earth globe, the voyage's launch point, anchored bottom-centre of its parent. */
export function Earth({ className, size = 240 }: { className?: string; size?: number }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 flex justify-center", className)}>
      <img src={earth} alt="" width={size} height={size} className="earth-glow self-end" style={{ width: size, height: size }} />
    </div>
  );
}
