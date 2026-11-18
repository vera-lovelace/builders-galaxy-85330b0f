import { Conversation } from "@elevenlabs/client";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useSyncExternalStore, type MutableRefObject } from "react";
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

/*
 * The trivia voice session lives at module level, not inside the question
 * screen, so flying to the galaxy map between planets keeps it connected.
 */
type Status = "disconnected" | "connecting" | "connected";
const TRAVEL: VoiceHandlers = {
  selectOption: () => "The player is flying to the next planet. Wait for the next question.",
  repeatQuestion: () => "The player is flying to the next planet. Wait for the next question.",
  nextQuestion: () => "Already travelling to the next planet.",
  pauseTimer: () => "No timer is running while travelling.",
  resumeTimer: () => "No timer is running while travelling.",
};
const state = { status: "disconnected" as Status, notice: "" };
let session: Conversation | null = null;
let handlers: VoiceHandlers = TRAVEL;
let lastContext = "";
let toolUntil = 0;
const listeners = new Set<() => void>();
let snapshot = { ...state };
function set(p: Partial<typeof state>) { Object.assign(state, p); snapshot = { ...state }; listeners.forEach((l) => l()); }
const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };

/** Each tool call marks the next screen change as voice-driven, so the agent isn't told twice. */
const tool = (fn: () => string) => () => { toolUntil = Date.now() + 2500; return fn(); };

async function start(nickname: string) {
  set({ notice: "", status: "connecting" });
  try { await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch { set({ status: "disconnected", notice: "Microphone access is needed for the voice guide." }); return; }
  try {
    lastContext = "";
    session = await Conversation.startSession({
      agentId: ELEVENLABS_AGENT_ID,
      connectionType: "websocket",
      dynamicVariables: { nickname },
      clientTools: {
        selectOption: (p: Record<string, unknown> | undefined) => tool(() => handlers.selectOption(optionNumber(p)))(),
        repeatQuestion: () => handlers.repeatQuestion(),
        nextQuestion: tool(() => handlers.nextQuestion()),
        pauseTimer: () => handlers.pauseTimer(),
        resumeTimer: () => handlers.resumeTimer(),
      },
      onStatusChange: ({ status }) => set({ status: status === "disconnecting" ? "disconnected" : (status as Status) }),
      onError: (m: unknown) => { console.error("Voice agent error", m); set({ notice: voiceErrorMessage(m) }); },
      onDisconnect: (d: { reason?: string; message?: string }) => {
        session = null;
        set({ status: "disconnected", notice: d.reason === "error" ? voiceErrorMessage({ message: d.message }) : state.notice });
      },
    });
    set({ status: "connected" });
  } catch (e) {
    session = null;
    set({ status: "disconnected", notice: voiceErrorMessage(e) });
  }
}

/** Screen change from a click or keypress: cut the agent off and have it speak the new state. */
function announce(context: string, speak: boolean) {
  if (!session || context === lastContext) return;
  const first = lastContext === "";
  lastContext = context;
  const voiceDriven = Date.now() < toolUntil;
  if (first || voiceDriven || !speak) { session.sendContextualUpdate(context); return; }
  session.setVolume({ volume: 0 });
  session.sendUserMessage(`[Screen update, the player used the screen instead of voice. Stop what you were saying and respond to this now.] ${context}`);
  setTimeout(() => session?.setVolume({ volume: 1 }), 600);
}

export default function VoiceAgent({ handlers: h, context, nickname }: { handlers: MutableRefObject<VoiceHandlers>; context: string; nickname: string }) {
  const s = useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
  const live = s.status === "connected";
  // Route the shared session's tools to this screen while it is mounted.
  useEffect(() => {
    const proxy: VoiceHandlers = {
      selectOption: (n) => h.current.selectOption(n),
      repeatQuestion: () => h.current.repeatQuestion(),
      nextQuestion: () => h.current.nextQuestion(),
      pauseTimer: () => h.current.pauseTimer(),
      resumeTimer: () => h.current.resumeTimer(),
    };
    handlers = proxy;
    return () => { if (handlers === proxy) handlers = TRAVEL; };
  }, [h]);
  useEffect(() => { if (live) announce(context, true); }, [live, context]);
  const toggle = async () => {
    if (session) { await session.endSession(); session = null; set({ status: "disconnected" }); return; }
    await start(nickname);
  };
  return (
    <div className="grid gap-2">
    <Button variant="secondary" size="md" aria-pressed={live} onClick={toggle} disabled={s.status === "connecting"}>
      {live ? <><MicOff aria-hidden /> Stop voice</> : <><Mic aria-hidden /> {s.status === "connecting" ? "Connecting…" : "Voice guide"}</>}
    </Button>
    {s.notice && <p role="alert" className="max-w-60 text-sm text-danger">{s.notice}</p>}
    <AiLabel voice />
    </div>
  );
}
