import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Button } from "./Button";
import { ELEVENLABS_AGENT_ID, voiceErrorMessage } from "./VoiceAgent";
import { AiLabel } from "./AiLabel";

export const VOICE_SESSION_MS = 10 * 60_000;

export interface JobVoiceHandlers {
  searchJobs: (p: { keywords?: string | undefined; location?: string | undefined; remoteOnly?: boolean | undefined }) => Promise<string>;
  selectKeyword: (keyword: string) => Promise<string>;
  describeJob: (index: number) => string;
  filterResults: (p: { remoteOnly?: boolean | undefined; postedWithinDays?: number | undefined }) => Promise<string>;
  nextPage: () => Promise<string>;
}

function Inner({ handlers, context, nickname }: { handlers: MutableRefObject<JobVoiceHandlers>; context: string; nickname: string }) {
  const [notice, setNotice] = useState("");
  const conv = useConversation({
    clientTools: {
      searchJobs: (p: { keywords?: string | undefined; location?: string | undefined; remoteOnly?: boolean | undefined }) => handlers.current.searchJobs(p ?? {}),
      selectKeyword: (p: { keyword?: string }) => handlers.current.selectKeyword(String(p?.keyword ?? "")),
      describeJob: (p: { index?: number | string }) => handlers.current.describeJob(Number(p?.index)),
      filterResults: (p: { remoteOnly?: boolean | undefined; postedWithinDays?: number | undefined }) => handlers.current.filterResults(p ?? {}),
      nextPage: () => handlers.current.nextPage(),
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
  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => conv.endSession(), VOICE_SESSION_MS);
    return () => clearTimeout(t);
  }, [live, conv]);
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
      {live ? <><MicOff aria-hidden /> Stop voice</> : <><Mic aria-hidden /> {conv.status === "connecting" ? "Connecting…" : "Voice search guide"}</>}
    </Button>
    {notice && <p role="alert" className="max-w-60 text-sm text-danger">{notice}</p>}
    <AiLabel voice />
    </div>
  );
}

export default function JobsVoiceAgent(props: { handlers: MutableRefObject<JobVoiceHandlers>; context: string; nickname: string }) {
  return <ConversationProvider><Inner {...props} /></ConversationProvider>;
}
