import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, type MutableRefObject } from "react";
import { Button } from "./Button";

export const ELEVENLABS_AGENT_ID = "agent_9101m7gm0xw6e59sjgm71sxkfhrf";

export interface VoiceHandlers {
  selectOption: (n: number) => string;
  repeatQuestion: () => string;
  nextQuestion: () => string;
  pauseTimer: () => string;
  resumeTimer: () => string;
}

function Inner({ handlers, context }: { handlers: MutableRefObject<VoiceHandlers>; context: string }) {
  const conv = useConversation({
    clientTools: {
      selectOption: (p: { option?: number | string; number?: number | string }) => handlers.current.selectOption(Number(p?.option ?? p?.number)),
      repeatQuestion: () => handlers.current.repeatQuestion(),
      nextQuestion: () => handlers.current.nextQuestion(),
      pauseTimer: () => handlers.current.pauseTimer(),
      resumeTimer: () => handlers.current.resumeTimer(),
    },
    onError: (e: unknown) => console.error("Voice agent error", e),
  });
  const live = conv.status === "connected";
  const last = useRef("");
  useEffect(() => {
    if (live && context !== last.current) { last.current = context; conv.sendContextualUpdate(context); }
  }, [live, context, conv]);
  const toggle = async () => {
    if (live) return conv.endSession();
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      last.current = "";
      conv.startSession({ agentId: ELEVENLABS_AGENT_ID, connectionType: "webrtc" });
    } catch { alert("Microphone access is needed for the voice guide."); }
  };
  return (
    <Button variant="secondary" size="md" aria-pressed={live} onClick={toggle} disabled={conv.status === "connecting"}>
      {live ? <><MicOff aria-hidden /> Stop voice</> : <><Mic aria-hidden /> {conv.status === "connecting" ? "Connecting…" : "Voice guide"}</>}
    </Button>
  );
}

export default function VoiceAgent(props: { handlers: MutableRefObject<VoiceHandlers>; context: string }) {
  return <ConversationProvider><Inner {...props} /></ConversationProvider>;
}
