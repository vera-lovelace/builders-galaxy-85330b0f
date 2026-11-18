import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Button } from "./Button";
import { AiLabel } from "./AiLabel";

export const ELEVENLABS_AGENT_ID = "agent_9101m7gm0xw6e59sjgm71sxkfhrf";

export interface VoiceHandlers {
  selectOption: (n: number) => string;
  repeatQuestion: () => string;
  nextQuestion: () => string;
  pauseTimer: () => string;
  resumeTimer: () => string;
}

/**
 * The agent can send the pick in several shapes: a 0-based `index`, a 1-based
 * `number`, or an `option` holding "B", "2" or "Option 2". Everything is
 * normalised to the 1-based number the game screens expect.
 */
export function optionNumber(p: Record<string, unknown> | undefined): number {
  if (!p) return NaN;
  const index = p["index"];
  if (typeof index === "number" && Number.isFinite(index)) return index + 1;
  const raw = p["number"] ?? p["option"] ?? p["choice"];
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const first = /^\s*([a-dA-D])\b/.exec(raw)?.[1];
    if (first) return first.toUpperCase().charCodeAt(0) - 64;
    const digits = /\d+/.exec(raw)?.[0];
    if (digits) return Number(digits);
  }
  return NaN;
}

/** Turn whatever the SDK throws into a sentence a player can act on. */
export function voiceErrorMessage(e: unknown): string {
  const detail =
    e && typeof e === "object"
      ? (e as { closeReason?: unknown; message?: unknown }).closeReason ??
        (e as { message?: unknown }).message
      : undefined;
  const text = typeof detail === "string" && detail.trim() ? detail.trim() : "";
  if (!text) return "The voice guide could not connect. Please try again.";
  if (/dynamic variables/i.test(text)) return "The voice guide needs your nickname before it can start.";
  if (/401|authentication/i.test(text)) return "The voice guide is not public yet, so it cannot be reached.";
  return `The voice guide stopped: ${text}`;
}

function Inner({ handlers, context, nickname }: { handlers: MutableRefObject<VoiceHandlers>; context: string; nickname: string }) {
  const [notice, setNotice] = useState("");
  const conv = useConversation({
    clientTools: {
      selectOption: (p: Record<string, unknown> | undefined) => handlers.current.selectOption(optionNumber(p)),
      repeatQuestion: () => handlers.current.repeatQuestion(),
      nextQuestion: () => handlers.current.nextQuestion(),
      pauseTimer: () => handlers.current.pauseTimer(),
      resumeTimer: () => handlers.current.resumeTimer(),
    },
    onError: (e: unknown) => { console.error("Voice agent error", e); setNotice(voiceErrorMessage(e)); },
    onDisconnect: (d: { reason?: string; message?: string }) => {
      if (d.reason === "error") setNotice(voiceErrorMessage({ message: d.message }));
    },
  });
  const live = conv.status === "connected";
  const last = useRef("");
  useEffect(() => {
    if (live && context !== last.current) { last.current = context; conv.sendContextualUpdate(context); }
  }, [live, context, conv]);
  const toggle = async () => {
    if (live) return conv.endSession();
    setNotice("");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setNotice("Microphone access is needed for the voice guide.");
      return;
    }
    last.current = "";
    conv.startSession({
      agentId: ELEVENLABS_AGENT_ID,
      connectionType: "websocket",
      dynamicVariables: { nickname },
    });
  };
  return (
    <div className="grid gap-2">
    <Button variant="secondary" size="md" aria-pressed={live} onClick={toggle} disabled={conv.status === "connecting"}>
      {live ? <><MicOff aria-hidden /> Stop voice</> : <><Mic aria-hidden /> {conv.status === "connecting" ? "Connecting…" : "Voice guide"}</>}
    </Button>
    {notice && <p role="alert" className="max-w-60 text-sm text-danger">{notice}</p>}
    <AiLabel voice />
    </div>
  );
}

export default function VoiceAgent(props: { handlers: MutableRefObject<VoiceHandlers>; context: string; nickname: string }) {
  return <ConversationProvider><Inner {...props} /></ConversationProvider>;
}
