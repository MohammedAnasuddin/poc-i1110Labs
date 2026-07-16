import { AIAgentService } from "../ai/ai-agent.service.js";
import { SpeechToTextService } from "./speech-to-text.service.js";
import { TextToSpeechService } from "./text-to-speech.service.js";

export class VoiceConversationService {
  constructor(
    private readonly stt: SpeechToTextService,
    private readonly ai: AIAgentService,
    private readonly tts: TextToSpeechService,
  ) {}

  async converse(sessionId: string, audioPath: string) {
    const startedAt = Date.now();

    const { transcript } = await this.stt.transcribe(audioPath);

    const response = await this.ai.processMessage(sessionId, transcript);

    const speech = await this.tts.synthesize(response.message);
    console.log(`Voice pipeline: ${Date.now() - startedAt} ms`);

    return {
      transcript,
      response: response.message,
      audio: speech.audio,
      mimeType: speech.mimeType,
    };
  }
}
