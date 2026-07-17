import { Page } from "../layout/page.tsx";
import { VoiceRecorder } from "../components/voice/voice-recorder.tsx";
import { ConversationList } from "../components/conversation/conversation-list.tsx";
import { OrderCard } from "../components/order/order-card";
import { useEffect, useState } from "react";
import { createSession } from "@/api/session.api.ts";

export function VoicePage() {
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    async function init() {
      const session = await createSession();

      setSessionId(session.sessionId);
      console.log(session);
    }

    init();
  }, []);

  return (
    <Page>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <VoiceRecorder sessionId={sessionId} />

          <ConversationList sessionId={sessionId} />
        </div>

        <OrderCard sessionId={sessionId} />
      </div>
    </Page>
  );
}
