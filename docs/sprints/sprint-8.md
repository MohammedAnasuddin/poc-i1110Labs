# 🚀 Sprint 8 — Voice

## Goal

Transform the AI restaurant assistant from **chat** to **real-time voice**.

---

# Story 8.1 — Speech-to-Text (STT)

### Goal

Convert customer speech into text.

### Deliverables

- STT service
- Audio upload endpoint
- Transcript generation

### Files

```text
src/voice/
├── speech-to-text.service.ts
├── speech.types.ts
└── speech.controller.ts
```

Flow

```text
Customer

↓

Microphone

↓

Speech-to-Text

↓

Text

↓

AI Agent
```

---

# Story 8.2 — Text-to-Speech (TTS)

### Goal

Convert AI responses into speech.

### Deliverables

- TTS service
- Audio generation

### Files

```text
src/voice/
└── text-to-speech.service.ts
```

Flow

```text
AI Response

↓

Text-to-Speech

↓

Audio

↓

Customer
```

---

# Story 8.3 — Voice Session

### Goal

Manage an active phone conversation.

Track:

- speaking
- listening
- waiting
- interrupted
- finished

### Files

```text
src/voice/
└── voice-session.service.ts
```

---

# Story 8.4 — Streaming

### Goal

Support continuous conversation.

Instead of

```text
Speak

↓

Wait

↓

Response
```

we'll have

```text
Speak

↓

Streaming

↓

Streaming AI

↓

Streaming Audio
```

---

# Story 8.5 — Barge-In

### Goal

Allow interruption.

Example

AI:

> Would you like—

Customer:

> Large.

AI stops speaking immediately.

This is one of the biggest features that makes the system feel natural.

---

# Story 8.6 — Latency Optimization

Current flow

```text
Speech

↓

STT

↓

LLM

↓

TTS
```

Measure

- STT latency
- AI latency
- Tool latency
- TTS latency
- Total latency

Target

```text
< 2 seconds
```

---

# Story 8.7 — End-to-End Voice

Complete flow

```text
Customer speaks

↓

Speech-to-Text

↓

AI

↓

Menu Tools

↓

Cart Tools

↓

Order Tools

↓

Text-to-Speech

↓

Customer hears response
```

---

# Deliverables

```text
src/

voice/
├── speech.controller.ts
├── speech.types.ts
├── speech-to-text.service.ts
├── text-to-speech.service.ts
├── voice-session.service.ts
```

---

# Final Architecture

```text
Microphone
      │
      ▼
Speech-to-Text
      │
      ▼
AI Agent
      │
      ▼
Menu / Cart / Orders
      │
      ▼
Text-to-Speech
      │
      ▼
Speaker
```

---

# Recommendation Before Sprint 8

I recommend **one small addition** to the roadmap.

## Story 8.0 — Voice Provider Abstraction

Before implementing STT and TTS, create provider interfaces.

```text
src/voice/
├── speech.provider.ts
└── voice.provider.ts
```

For example:

```ts
interface SpeechToTextProvider {
  transcribe(audio: Buffer): Promise<string>;
}

interface TextToSpeechProvider {
  synthesize(text: string): Promise<Buffer>;
}
```

Why?

Today you might use **Groq Whisper** for STT and **Groq PlayAI** for TTS. Later, if you switch to OpenAI, ElevenLabs, Azure, or another provider, only the provider implementation changes—your voice pipeline stays the same.

That keeps the architecture consistent with how you've already separated your Menu, Cart, and Order services, and makes the project much easier to evolve.

Story 9.1 — Groq Whisper Provider
📄 Create
src/voice/providers/
└── groq-stt.provider.ts

Notice the providers/ folder.

We'll eventually have:

voice/

providers/
├── groq-stt.provider.ts
├── groq-tts.provider.ts
├── openai-stt.provider.ts
├── elevenlabs-tts.provider.ts

Much cleaner.

Story 9.2 — SpeechToTextService

This service simply delegates:

return this.provider.transcribe(...)

No Groq logic.

Story 9.3 — Controller

We'll expose

POST /voice/transcribe

Input

multipart/form-data

audio.wav

Output

{
"transcript": "I'd like a large Margherita pizza."
}
Story 9.4 — AI Integration

Instead of

User
↓

Chat Endpoint

We'll have

Audio

↓

Transcribe

↓

AI Agent

↓

Text Response

Notice:

Still text.

No TTS yet.

Story 9.5 — TTS

Only after STT works perfectly.

🚀 Story 9.1

Implement STT Provider (Groq)

Story 9.2

Voice Controller

Story 9.3

Voice Conversation Service

Story 9.4

Implement TTS Provider

Story 9.5

Streaming Voice

Story 9.6

Barge-in

Story 9.7

Latency Optimization

**Alhamdulillah!!** 🎉🎉

That's **exactly** what we wanted.

```json
{
  "success": true,
  "data": {
    "transcript": "Hello. I'd like one large margarita pizza. Thank you."
  }
}
```

This means your Speech-to-Text implementation is **fully functional**.

---

# ✅ Sprint 9 Progress

## Story 9.0

- ✅ Voice architecture
- ✅ Provider abstraction

## Story 9.1

- ✅ Multer upload
- ✅ Voice endpoint
- ✅ Groq Whisper
- ✅ SpeechToTextService
- ✅ Transcript response

**Story 9.1 is COMPLETE.** 🎉

---

# Let's appreciate what you've built

Remember a few hours ago?

You had:

```
Text
    ↓
AI
```

Now you have:

```
🎤 Voice
     ↓
Whisper
     ↓
Transcript
     ↓
AI (already built)
```

You're getting very close to a real voice ordering assistant.

---

# 🚀 Story 9.2 — Connect Speech to Your AI

This is actually much easier than Story 9.1.

Currently:

```
POST /api/voice/transcribe

↓

{
   transcript
}
```

We want:

```
POST /api/voice/chat
```

Flow:

```
🎤 Audio
      │
      ▼
SpeechToText
      │
      ▼
Transcript
      │
      ▼
AIAgentService.processMessage()
      │
      ▼
AI Response
```

---

# Response

Instead of

```json
{
  "transcript": "Hello..."
}
```

you'll return

```json
{
  "transcript": "Hello. I'd like one large Margherita pizza.",
  "response": "Sure! What crust would you like?"
}
```

---

# Notice something

We're **not changing the AI**.

We're simply replacing:

```
Typed Text
```

with

```
Speech → Text
```

Everything else stays exactly the same.

That's the benefit of your architecture.

---

# 📋 Story 9.2 Plan

We'll do it in four small steps:

### Step 1

Inject `AIAgentService` into the voice controller (or access it through your existing container).

### Step 2

After:

```ts
const result =
    await speechToTextService.transcribe(...)
```

call:

```ts
await aiAgentService.processMessage(...)
```

using the transcript as the message.

### Step 3

Return both values:

```json
{
  "transcript": "...",
  "response": "..."
}
```

### Step 4

Test with Postman.

---

# 🎯 After Story 9.2

Your backend will support:

```
🎤 User Speaks

↓

Groq Whisper

↓

Transcript

↓

AI Agent

↓

Restaurant Response
```

That means your backend becomes **voice-first**.

---

## One small recommendation

Before moving to TTS, I'd also add a dedicated orchestration class:

```
VoiceConversationService

↓

SpeechToText

↓

AIAgent

↓

TextToSpeech (later)
```

This keeps your controller extremely thin:

```ts
const result = await voiceConversationService.process(req.file.path, sessionId);
```

The controller won't know about Whisper, AI, or TTS—it just delegates to the service. That's a clean separation of concerns and will make adding streaming or barge-in much easier later.





**Bismillah.** That's a very good architectural question.

I actually think we should **finish the foundation first** before building the orchestration.

## Why?

Right now we have:

```text
STT ✅

↓

AI

↓

TTS ❌
```

If we build `VoiceConversationService` now, in the next story we'll immediately have to modify it to add TTS.

Instead, let's finish the two independent pipelines.

---

# I recommend this order

## ✅ Story 9.1 — Speech-to-Text

Done.

```text
Audio

↓

Transcript
```

---

## 🚀 Story 9.2 — Text-to-Speech

Build the opposite direction.

```text
Text

↓

Audio
```

Again, **no AI involved**.

Just verify that:

```ts
text
```

becomes

```text
audio.mp3
```

using the provider abstraction.

---

## Story 9.3 — VoiceConversationService

Only then create:

```text
Audio
    │
    ▼
STT
    │
    ▼
Transcript
    │
    ▼
AI
    │
    ▼
Response Text
    │
    ▼
TTS
    │
    ▼
Audio Response
```

Notice something?

The service becomes incredibly clean because all three components are already tested.

---

# This follows the same philosophy as your previous sprints

Sprint 6:

```
Menu ✅

↓

Cart ✅

↓

Orders ✅

↓

AI Integration
```

Not

```
Menu

↓

AI

↓

Cart

↓

Orders
```

You built each module independently first.

---

# Updated Sprint 9

### ✅ 9.0

Voice Architecture

---

### ✅ 9.1

Speech-to-Text

---

### 🚀 9.2

Text-to-Speech

---

### 9.3

VoiceConversationService

---

### 9.4

Voice Chat Endpoint

---

### 9.5

Streaming

---

### 9.6

Barge-in

---

### 9.7

Latency

---

# Even better...

Once TTS is complete, your project will have two fully independent services:

```
SpeechToTextService

Audio
↓

Text
```

and

```
TextToSpeechService

Text
↓

Audio
```

Then `VoiceConversationService` simply composes them:

```ts
const transcript = await stt.transcribe(audioPath);

const aiResponse = await ai.processMessage({
  sessionId,
  message: transcript.transcript,
});

const audio = await tts.synthesize(aiResponse.message);

return {
  transcript,
  response: aiResponse,
  audio,
};
```

Look how elegant that is. It doesn't care whether STT is Groq, OpenAI, or Deepgram, or whether TTS is Groq, ElevenLabs, or OpenAI.

---

## So yes—I recommend we build **Text-to-Speech next**.

By the time we start `VoiceConversationService`, all three building blocks (STT, AI, and TTS) will already be complete and independently tested. That's a cleaner architecture and keeps the orchestration service focused on orchestration rather than implementation.


**Alhamdulillah!** 🎉

Let's look at what we've actually completed for **Sprint 9**.

## ✅ Completed

### 9.1 Speech-to-Text

* ✅ Groq Whisper provider
* ✅ `SpeechToTextService`
* ✅ `/voice/transcribe`
* ✅ Tested successfully

---

### 9.2 Text-to-Speech

* ✅ Edge TTS Provider
* ✅ `TextToSpeechService`
* ✅ `/voice/speak`
* ✅ Tested successfully

---

## 🚧 Remaining Sprint 9 Stories

```
□ Conversation Service ⭐⭐⭐⭐⭐
□ Streaming
□ Barge-in
□ Latency Optimizations
```

---

# Next Story (9.3)

This is where the project becomes a **real voice agent**.

Instead of:

```
Customer
    ↓
Upload audio
    ↓
Transcript
```

or

```
Text
    ↓
Speech
```

we connect everything.

```
🎤 Customer Speaks
        │
        ▼
SpeechToTextService
        │
        ▼
Transcript
        │
        ▼
AI Agent
        │
        ▼
Response
        │
        ▼
TextToSpeechService
        │
        ▼
🔊 Spoken Response
```

---

# I propose this architecture

```
voice/

voice-conversation.service.ts ⭐

speech-to-text.service.ts
text-to-speech.service.ts

providers/

stt/
tts/
```

---

## `VoiceConversationService`

```ts
class VoiceConversationService {

    constructor(
        private readonly stt: SpeechToTextService,
        private readonly ai: AIAgentService,
        private readonly tts: TextToSpeechService,
    ) {}

    async converse(...) {

    }

}
```

Notice something?

**The controller won't know anything about STT, AI or TTS.**

It simply calls

```ts
voiceConversationService.converse(...)
```

Exactly like our other services.

---

# The flow

```
Audio File
      │
      ▼
Groq Whisper
      │
      ▼
Transcript
      │
      ▼
AIAgentService.chat(...)
      │
      ▼
"I'm adding one large pizza..."
      │
      ▼
Edge TTS
      │
      ▼
MP3 Buffer
```

One service.

One call.

---

# New Endpoint

Eventually we'll expose:

```
POST /api/voice/chat
```

Instead of

```
/transcribe
/speak
```

the frontend only needs

```
/voice/chat
```

Upload audio →

Receive audio back.

Exactly like a real voice assistant.

---

# Sprint Plan

## 9.3 Voice Conversation ⭐

* ✅ Create `VoiceConversationService`
* ✅ Inject STT, AI, TTS
* ✅ Implement `converse()`
* ✅ Return transcript + AI response + audio

---

## 9.4 Voice Endpoint

```
POST /voice/chat
```

Input

```
audio.mp3
sessionId
```

Output

```
{
    transcript,
    response,
    audio
}
```

(or binary audio with metadata headers—we'll decide the API shape together.)

---

## 9.5 Streaming

After the basic conversation works.

---

# Why this order?

Right now you've proven every building block independently:

* ✅ AI
* ✅ Cart
* ✅ Orders
* ✅ STT
* ✅ TTS

Now it's time to compose them into a **single conversation pipeline**. That's the most valuable next step, and once it's working you'll have the core of the voice ordering agent.

