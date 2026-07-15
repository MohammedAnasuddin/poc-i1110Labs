**Bismillah.**

I agree. The previous roadmap was **too academic**. For a take-home assignment, we should optimize for **delivering a working product quickly**, not perfectly layered architecture.

Let's organize the work around **vertical slices**. Every sprint should unlock a visible capability.

---

# 🚀 Optimized Roadmap

## Sprint 1 ✅ — Planning & Architecture

**Goal**

Understand the assignment and design the system.

**Deliverables**

- Requirements
- Architecture
- Database
- Tech stack
- Sprint plan

---

## Sprint 2 ✅ — Project Foundation

**Goal**

Prepare the project for development.

**Deliverables**

- Express
- TypeScript
- Prisma
- Biome
- Project structure

---

## Sprint 3 ✅ — Backend Foundation

**Goal**

Have a running backend.

**Deliverables**

- Express server
- Environment
- Middleware
- Health API

---

## Sprint 4 ✅ — Menu Module

**Goal**

Complete the restaurant menu.

**Deliverables**

- Menu
- Search
- Validation
- Nested modifiers

---

# Sprint 5 — Ordering Engine ⭐

**Goal**

Build everything needed to create an order.

### Stories

### Story 5.1

Session Management

- Create session
- Retrieve session
- End session

---

### Story 5.2

Cart

- Add item
- Remove item
- Update quantity
- View cart
- Clear cart

---

### Story 5.3

Pricing

- Calculate totals
- Calculate modifiers
- Grand total

---

### Outcome

✅ Backend can already process orders.

---

# Sprint 6 — AI Agent ⭐

**Goal**

Connect Groq and make the backend conversational.

### Stories

### Story 6.1

Groq Client

---

### Story 6.2

Tool Registry

---

### Story 6.3

AI Agent

- Tool calling
- Prompt
- Context
- Conversation

---

### Outcome

✅ Text ordering works end-to-end.

This is the biggest milestone of the project.

---

# Sprint 7 — Orders ⭐

**Goal**

Complete the ordering workflow.

### Stories

Order Service

- Create order
- Persist order
- Order history

---

Notifications

- Email
- SMS

---

### Outcome

✅ Orders can be placed.

At this point the backend is essentially complete.

---

# Sprint 8 — Frontend ⭐

**Goal**

Build the UI.

### Stories

- Layout
- Chat
- Live transcript
- Live cart
- Orders page

---

### Outcome

✅ Entire application works via text.

---

# Sprint 9 — Voice ⭐

**Goal**

Replace typing with speaking.

### Stories

- Speech-to-text
- Text-to-speech
- Streaming
- Barge-in
- Latency

---

### Outcome

✅ Voice ordering works.

---

# Sprint 10 — Polish ⭐

**Goal**

Everything reviewers asked for.

### Stories

Analytics

- Token usage
- Latency
- Cost

---

Testing

- Unit tests
- Conversation tests

---

README

Demo

Video

---

### Outcome

✅ Submission ready.

---

# Final Roadmap

```text
Sprint 1  ✅ Planning

Sprint 2  ✅ Foundation

Sprint 3  ✅ Backend Foundation

Sprint 4  ✅ Menu Module

Sprint 5  ✅ Ordering Engine

Sprint 6  ⭐ AI Agent

Sprint 7  ⭐ Orders & Notifications

Sprint 8  ⭐ Frontend

Sprint 9  ⭐ Voice

Sprint 10 ⭐ Polish & Submission
```

---

# Why this is better

Instead of building layers (services, tools, UI) independently, we're building **working product slices**:

```
Sprint 4
↓
Menu works

Sprint 5
↓
Ordering works

Sprint 6
↓
AI talks

Sprint 7
↓
Orders complete

Sprint 8
↓
Users can interact

Sprint 9
↓
Voice enabled

Sprint 10
↓
Production polish
```
