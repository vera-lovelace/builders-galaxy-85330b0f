import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, type MutableRefObject } from "react";
import { Button } from "./Button";
import { ELEVENLABS_AGENT_ID } from "./VoiceAgent";

export const VOICE_SESSION_MS = 10 * 60_000;

export interface JobVoiceHandlers {
  searchJobs: (p: { keywords?: string | undefined; location?: string | undefined; remoteOnly?: boolean | undefined }) => Promise<string>;
  selectKeyword: (keyword: string) => Promise<string>;
  describeJob: (index: number) => string;
  filterResults: (p: { remoteOnly?: boolean | undefined; postedWithinDays?: number | undefined }) => Promise<string>;
  nextPage: () => Promise<string>;
}

function Inner({ handlers, context }: { handlers: MutableRefObject<JobVoiceHandlers>; context: string }) {
  const conv = useConversation({
    clientTools: {
      searchJobs: (p: { keywords?: string | undefined; location?: string | undefined; remoteOnly?: boolean | undefined }) => handlers.current.searchJobs(p ?? {}),
      selectKeyword: (p: { keyword?: string }) => handlers.current.selectKeyword(String(p?.keyword ?? "")),
      describeJob: (p: { index?: number | string }) => handlers.current.describeJob(Number(p?.index)),
      filterResults: (p: { remoteOnly?: boolean | undefined; postedWithinDays?: number | undefined }) => handlers.current.filterResults(p ?? {}),
      nextPage: () => handlers.current.nextPage(),
    },
    onError: (e: unknown) => console.error("Voice agent error", e),
  });
  const live = conv.status === "connected";
  const last = useRef("");
  useEffect(() => {
    if (live && context !== last.current) { last.current = context; conv.sendContextualUpdate(context); }
  }, [live, context, conv]);
  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => conv.endSession(), VOICE_SESSION_MS);
    return () => clearTimeout(t);
  }, [live, conv]);
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
      {live ? <><MicOff aria-hidden /> Stop voice</> : <><Mic aria-hidden /> {conv.status === "connecting" ? "Connecting…" : "Voice search guide"}</>}
    </Button>
  );
}

export default function JobsVoiceAgent(props: { handlers: MutableRefObject<JobVoiceHandlers>; context: string }) {
  return <ConversationProvider><Inner {...props} /></ConversationProvider>;
}
