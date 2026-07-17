# 🍕 AI Voice Ordering Agent

A proof-of-concept AI-powered restaurant ordering system that allows customers to place food orders through natural voice conversations. The application combines an LLM-powered tool-calling backend with a real-time React frontend, providing a seamless ordering experience similar to speaking with a restaurant employee.

---

# Demo

> 📹 2–3 minute walkthrough: *(Add video link here)*

---

# Features

## AI Voice Agent

- Real-time voice conversations
- Speech-to-Text (Groq Whisper)
- LLM reasoning & tool calling (Groq Llama 4 Scout)
- Text-to-Speech responses
- Natural conversational ordering flow

## Restaurant Ordering

- Comprehensive menu
- Nested modifiers
- Required modifier validation
- Live shopping cart
- Order confirmation
- Session-based ordering

## Frontend

- Live conversation transcript
- Live cart updates
- Analytics dashboard
- Orders page
- Dark / Light mode

## Backend

- Tool-driven architecture
- Session management
- PostgreSQL persistence
- Prisma ORM
- Dependency Injection
- Analytics collection

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- React Router

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

## AI

- Groq
- Llama 4 Scout
- Whisper Speech-to-Text
- Edge TTS

## Infrastructure

- Docker
- Docker Compose

---

# Why this stack?

### React + Vite

Provides an extremely fast frontend development experience with hot reload and a lightweight production build.

### Express + TypeScript

Simple, flexible, and ideal for building an API-driven tool-calling backend while maintaining strong type safety.

### Prisma + PostgreSQL

Provides reliable relational data storage with a type-safe ORM and easy schema migrations.

### Groq

Selected for its extremely low latency inference, making it well suited for conversational voice agents.

### Docker Compose

Allows the complete application (database, backend, frontend) to be started using a single command.

---

# System Architecture

```
Caller
    │
    ▼
Speech-to-Text
    │
    ▼
LLM Agent
    │
    ├───────────────┐
    ▼               ▼
Tool Registry    Conversation Memory
    │
    ▼
Business Services
(Menu / Cart / Orders)
    │
    ▼
PostgreSQL
    │
    ▼
Frontend
```

---

# Tool Calling

The language model never directly manipulates application state.

Instead, it interacts exclusively through backend tools.

Example tools:

- List Menu
- Search Menu
- Add Item
- Remove Item
- View Cart
- Update Quantity
- Place Order

This guarantees:

- no hallucinated menu items
- no hallucinated prices
- business rule enforcement
- centralized validation

---

# Assignment Requirements

## Backend

| Requirement | Status |
|------------|--------|
| Comprehensive Menu | ✅ |
| Nested Modifiers | ✅ |
| Required Options | ✅ |
| Tool Calling Agent | ✅ |
| No Hallucinated Prices | ✅ |
| Session per Caller | ✅ |
| PostgreSQL Persistence | ✅ |
| Order Placement | ✅ |

---

## Frontend

| Requirement | Status |
|------------|--------|
| Voice Conversation | ✅ |
| Live Transcript | ✅ |
| Live Cart | ✅ |
| Orders Page | ✅ |
| Analytics Dashboard | ✅ |
| Theme Support | ✅ |

---

## Stretch Goals

| Requirement | Status |
|------------|--------|
| Speech-to-Speech | ✅ |
| Latency Tracking | ✅ |
| Token Tracking | ✅ |
| Analytics View | ✅ |
| Docker Compose | ✅ |

---

# Project Structure

```
backend/
    src/
    prisma/
    Dockerfile

frontend/
    src/
    Dockerfile

docs/

docker-compose.yml
```

---

# Running the Project

## Prerequisites

- Docker Desktop

- Groq API Key

---

## Setup

Clone the repository.

```bash
git clone https://github.com/MohammedAnasuddin/poc-i1110Labs

cd poc-i1110Labs
```

Create the environment file.

```bash
cp backend/.env.example backend/.env
```

Add your Groq API key.

```env
GROQ_API_KEY=YOUR_API_KEY
```

---

## Start

```bash
docker compose up --build
```

---

## Application URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:3000
```

Analytics

```
http://localhost:5173/analytics
```

---

# Key Design Decisions

## Dependency Injection

Business logic is separated into services and injected through a lightweight container.

Benefits:

- loose coupling
- easier testing
- maintainability

---

## Tool Registry

Instead of exposing application internals to the LLM, all actions are routed through a centralized Tool Registry.

This keeps business rules consistent and prevents invalid operations.

---

## Session Isolation

Each conversation receives an independent session with its own cart and conversation history.

No state is shared between callers.

---

## Analytics

The backend records:

- Conversations
- Turns
- Tool Calls
- Success Rate
- Token Usage
- Average Latency
- Orders Placed

These are visualized in the Analytics Dashboard.

---

# Tradeoffs

To keep the project focused within the assignment scope:

- Authentication was intentionally omitted.
- SMS/Email integrations were not implemented.
- Horizontal scalability was not a priority.
- Analytics currently store aggregate metrics instead of per-conversation history.

---

# Future Improvements

With additional time I would implement:

- Streaming speech responses
- True interruption (barge-in)
- Redis-backed session storage
- SMS and Email order confirmations
- Per-conversation analytics history
- Authentication and user accounts
- Admin dashboard
- Restaurant management portal
- Docker production deployment
- Comprehensive automated testing

---

# Author

Mohammed Anasuddin