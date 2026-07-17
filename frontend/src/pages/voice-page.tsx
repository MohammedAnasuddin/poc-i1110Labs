import { useState } from "react";

import { createSession, endSession } from "@/api/session.api";

import { ConversationList } from "../components/conversation/conversation-list";
import { OrderCard } from "../components/order/order-card";
import { VoiceRecorder } from "../components/voice/voice-recorder";
import { Page } from "../layout/page";

export function VoicePage() {
  const [sessionId, setSessionId] = useState("");

  async function handleConversation() {
    if (!sessionId) {
      const session = await createSession();

      setSessionId(session.sessionId);

      console.log("✅ Session Started:", session.sessionId);

      return;
    }

    await endSession(sessionId);

    console.log("🛑 Session Ended:", sessionId);

    setSessionId("");

    // TODO:
    // Clear transcript
    // Clear cart
    // Reset voice recorder state
  }

  return (
    <Page>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleConversation}
          className={`rounded-md px-4 py-2 text-white transition-colors ${
            sessionId
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sessionId ? "End Conversation" : "Start Conversation"}
        </button>
      </div>

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
