import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { play, setSoundEnabled, soundEnabled } from "@/game/sound";

export function SoundToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(soundEnabled()), []);
  return <Button variant="ghost" size="icon" aria-pressed={on} aria-label="Sound effects"
    onClick={() => { setSoundEnabled(!on); setOn(!on); if (!on) play("select"); }}>{on ? <Volume2 aria-hidden /> : <VolumeX aria-hidden />}</Button>;
}
