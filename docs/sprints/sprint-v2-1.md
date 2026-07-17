Bismillah.

Since they specifically asked for **"add token consumption per conversation"**, let's keep Sprint 1 laser-focused. We can finish it quickly without over-engineering.

---

# 🚀 Sprint 1 — Conversation Analytics

## Goal

Track analytics **per completed conversation** and visualize them on the dashboard.

---

# User Story

> As an administrator, I want to see token usage and latency for each conversation so I can understand AI usage and costs.

---

# Functional Requirements

For every conversation, store:

- Session ID
- Conversation Start
- Conversation End
- Prompt Tokens
- Completion Tokens
- Total Tokens
- Total Latency
- Number of Turns
- Number of Tool Calls

---

# Database Design

New table:

```prisma
ConversationAnalytics
```

Fields

| Field            | Purpose                    |
| ---------------- | -------------------------- |
| id               | PK                         |
| sessionId        | Link conversation          |
| promptTokens     | Conversation total         |
| completionTokens | Conversation total         |
| totalTokens      | Derived                    |
| latency          | Average/Total              |
| turns            | Number of LLM turns        |
| toolCalls        | Number of tool invocations |
| startedAt        | Conversation start         |
| endedAt          | Conversation end           |

That's all.

No cost.
No logs.
No individual requests.

Keep it simple.

---

# Backend Flow

Current

```
User

↓

Agent

↓

Analytics (global)
```

New

```
User

↓

Agent

↓

ConversationAnalytics (session)

↓

Global Analytics
```

Global analytics remain exactly as they are.

We're only adding another write.

---

# Where do we record?

Every AI response already has

```
prompt_tokens

completion_tokens

latency
```

Instead of only doing

```
Analytics.totalPrompt += x
```

we also do

```
Conversation.prompt += x
```

Easy.

---

# When do we save?

Two options.

## Option A

Update DB after every AI turn.

Pros

- Crash safe

Cons

- Many DB writes

---

## Option B ⭐

Keep everything in memory inside the session.

When

```
Place Order
```

OR

```
Conversation Ends
```

Save once.

Pros

- One DB write
- Faster
- Cleaner

I'd choose this.

---

# API

Current

```
GET /analytics
```

returns global stats.

Add

```
GET /analytics/conversations
```

Returns

```json
[
  {
    "sessionId": "abc",

    "promptTokens": 520,

    "completionTokens": 160,

    "totalTokens": 680,

    "latency": 710,

    "turns": 8,

    "toolCalls": 5,

    "startedAt": "...",

    "endedAt": "..."
  }
]
```

Simple.

---

# Frontend

Replace

Current chart

```
Prompt
Completion
```

with

```
Conversation 1

Conversation 2

Conversation 3
```

Hover

```
Conversation #8

Prompt: 630

Completion: 160

Latency: 840ms

Turns: 9

Tool Calls: 5
```

Done.

---

# Files We'll Touch

### Prisma

```
schema.prisma
```

---

### Analytics

```
analytics.service.ts
```

---

### Session

Probably

```
session.service.ts
```

or wherever you finalize/end a session.

---

### Controller

```
analytics.controller.ts
```

---

### Route

```
analytics.routes.ts
```

---

### Frontend

```
AnalyticsPage.tsx

useAnalytics.ts

analytics.api.ts

token-chart.tsx
```

---

# Estimated Work

| Task               | Time   |
| ------------------ | ------ |
| Prisma Model       | 10 min |
| Migration          | 2 min  |
| Backend Save Logic | 20 min |
| API                | 10 min |
| Frontend           | 20 min |
| Testing            | 15 min |

**~1 to 1.5 hours**

---

## One architectural decision before we start

I recommend **not** creating a separate `ConversationAnalyticsService`.

Instead, extend your existing `AnalyticsService` with conversation-specific methods, such as:

- `recordConversationStart(...)`
- `recordConversationTurn(...)`
- `recordConversationEnd(...)`

This keeps all analytics responsibilities in one place, avoids creating another service for a single feature, and fits naturally with your current architecture. As Sprint 2 (tool logs) arrives, `AnalyticsService` can become the central observability service for the entire application.
