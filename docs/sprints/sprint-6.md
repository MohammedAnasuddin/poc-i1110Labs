# Sprint 6 — AI Agent & Tool Layer

## 🎯 Sprint Goal

Build an AI-powered ordering agent that uses tool calling to interact with the backend. The LLM should never invent menu items or prices—it must retrieve information and perform actions exclusively through backend tools.

---

# 🏁 Definition of Done

By the end of this sprint:

- ✅ Groq is connected.
- ✅ AI conversations work.
- ✅ AI can call backend tools.
- ✅ Context is maintained across turns.
- ✅ AI can browse the menu.
- ✅ AI can manage the cart.
- ✅ AI can place an order request (backend only; notifications come next sprint).

---

# 🏗️ Architecture

```text
                User
                  │
                  ▼
          AI Controller (HTTP)
                  │
                  ▼
             AI Agent
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
     Groq LLM         Tool Registry
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
  MenuService         CartService         SessionService
```

The **AI Agent** decides **what to say**.

The **Tool Registry** decides **what to execute**.

---

# 📖 User Stories

---

# Story 6.1 — Groq Integration

## User Story

> As the AI agent, I want to communicate with Groq so that I can understand customer requests and generate responses.

### Tasks

#### Client

- [ ] Create Groq client
- [ ] Read API key from environment
- [ ] Configure default model
- [ ] Configure generation settings

#### Service

- [ ] Send chat completion request
- [ ] Receive response
- [ ] Handle API errors

---

### Deliverables

```text
src/ai/

groq.client.ts
```

---

### Acceptance Criteria

- AI responds successfully.
- Errors handled gracefully.
- API configuration centralized.

---

# Story 6.2 — Tool Registry

## User Story

> As the AI agent, I want access to backend capabilities through tools so that I can perform business operations safely.

### Tasks

#### Tool Definitions

- [ ] List menu
- [ ] Search menu
- [ ] Get menu item
- [ ] View cart
- [ ] Add item
- [ ] Remove item
- [ ] Update quantity
- [ ] Clear cart

#### Tool Registry

- [ ] Register tools
- [ ] Map tool names to handlers
- [ ] Validate tool inputs
- [ ] Execute tool requests

---

### Deliverables

```text
src/ai/

tool-registry.ts
tools/
```

---

### Acceptance Criteria

- All backend capabilities exposed through tools.
- Tool execution centralized.

---

# Story 6.3 — AI Agent

## User Story

> As a customer, I want to converse naturally so the AI can help me build an order.

### Tasks

#### Conversation

- [ ] Receive user message
- [ ] Maintain conversation history
- [ ] Send messages to Groq
- [ ] Execute tool calls
- [ ] Continue conversation after tool execution

#### Context

- [ ] Associate conversation with session
- [ ] Maintain chat history
- [ ] Limit context size

---

### Deliverables

```text
src/ai/

ai-agent.service.ts
conversation.types.ts
```

---

### Acceptance Criteria

- Multi-turn conversations work.
- Tool calls execute correctly.
- Session context maintained.

---

# Story 6.4 — AI API

## User Story

> As the frontend, I want a single endpoint to communicate with the AI agent.

### Tasks

- [ ] Create chat controller
- [ ] Create chat route
- [ ] Accept session ID and message
- [ ] Return AI response
- [ ] Return updated cart if changed

---

### Deliverables

```text
src/features/chat/

chat.controller.ts
chat.route.ts
chat.types.ts
```

---

### Acceptance Criteria

- Frontend can send messages.
- Backend returns AI responses.
- Session maintained.

---

# Story 6.5 — Conversation Metrics

## User Story

> As a developer, I want conversation metrics so I can monitor AI performance.

### Tasks

- [ ] Track prompt tokens
- [ ] Track completion tokens
- [ ] Track total tokens
- [ ] Measure latency
- [ ] Return metrics with each response

---

### Deliverables

Integrated into the AI response model.

---

### Acceptance Criteria

- Token usage available.
- Latency measured.
- Ready for frontend analytics.

---

# 📁 Files to Create

```text
poc/backend/src/

ai/
├── ai-agent.service.ts
├── groq.client.ts
├── tool-registry.ts
├── conversation.types.ts

ai/tools/
├── menu.tools.ts
├── cart.tools.ts

features/chat/
├── chat.controller.ts
├── chat.route.ts
└── chat.types.ts
```

---

# 📁 Files to Update

```text
src/app.ts
```

(Register the chat route.)

---

# 🧪 Sprint Acceptance Criteria

- [ ] Groq client configured.
- [ ] AI responses generated.
- [ ] Tool registry executes backend operations.
- [ ] AI never invents menu items or prices.
- [ ] Conversation history maintained.
- [ ] Session linked to conversations.
- [ ] Chat endpoint operational.
- [ ] Token usage and latency returned.
- [ ] `npm run build` passes.
- [ ] `npm run dev` runs successfully.

---

# 📦 Sprint Outcome

At the end of Sprint 6, the backend will support a complete AI-driven ordering flow:

1. Customer sends a message.
2. AI determines whether it needs a tool.
3. Tool executes against the backend services.
4. AI receives the result.
5. AI responds naturally to the customer.
6. Conversation continues with maintained context.

This is the point where the application becomes a true **AI Voice Ordering Agent**—the remaining sprints focus on notifications, frontend, voice, and polish rather than core intelligence.

---

# 📝 Sprint Commit

**Commit Message**

```text
feat(ai): implement AI agent and tool calling
```

---

## One refinement before implementation

I recommend slightly adjusting the folder structure to better separate responsibilities:

```text
src/

ai/
├── groq.client.ts
├── ai-agent.service.ts
├── tool-registry.ts
├── conversation.types.ts

tools/
├── menu.tools.ts
├── cart.tools.ts

features/chat/
├── chat.controller.ts
├── chat.route.ts
└── chat.types.ts
```
