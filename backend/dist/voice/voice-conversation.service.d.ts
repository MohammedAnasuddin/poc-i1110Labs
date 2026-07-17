import { AIAgentService } from "../ai/ai-agent.service.js";
import { SpeechToTextService } from "./speech-to-text.service.js";
import { TextToSpeechService } from "./text-to-speech.service.js";
export declare class VoiceConversationService {
    private readonly stt;
    private readonly ai;
    private readonly tts;
    constructor(stt: SpeechToTextService, ai: AIAgentService, tts: TextToSpeechService);
    converse(sessionId: string, audioPath: string): Promise<{
        transcript: string;
        response: string;
        audio: Buffer<ArrayBufferLike>;
        mimeType: string;
    }>;
}
