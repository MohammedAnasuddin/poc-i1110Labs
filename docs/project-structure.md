# Project Structure

The project is organized into separate frontend and backend applications to maintain a clear separation of concerns while allowing independent development and deployment.

```text
voice-ordering-agent/

│── frontend/
│
│── backend/
│
├── README.md
├── .gitignore
├── package.json
└── .env.example
```

---

# Frontend Structure

```text
frontend/

src/

├── assets/

├── components/
│   ├── chat/
│   ├── cart/
│   ├── transcript/
│   ├── analytics/
│   ├── voice/
│   └── ui/

├── hooks/

├── pages/
│   ├── ChatPage.tsx
│   └── OrdersPage.tsx

├── services/
│   ├── api.ts
│   ├── socket.ts
│   └── speech.ts

├── store/
│   ├── session.store.ts
│   ├── cart.store.ts
│   └── transcript.store.ts

├── types/

├── utils/

├── App.tsx

└── main.tsx
```

### Responsibilities

* **components/** → Reusable UI components.
* **pages/** → Application pages.
* **services/** → Backend communication and browser APIs.
* **store/** → Global application state.
* **types/** → Shared frontend models.
* **utils/** → Helper functions.

---

# Backend Structure

```text
backend/

src/

├── agent/
│   ├── prompt.ts
│   ├── tools.ts
│   ├── tool-registry.ts
│   └── agent.service.ts

├── analytics/
│   └── analytics.service.ts

├── cart/
│   └── cart.service.ts

├── menu/
│   ├── menu.data.ts
│   └── menu.service.ts

├── notifications/
│   └── notification.service.ts

├── orders/
│   └── order.service.ts

├── sessions/
│   └── session.service.ts

├── routes/
│   ├── chat.routes.ts
│   ├── order.routes.ts
│   └── session.routes.ts

├── middleware/

├── prisma/
│   ├── schema.prisma
│   └── seed.ts

├── sockets/
│   └── socket.ts

├── types/

├── utils/

├── app.ts

└── server.ts
```

### Responsibilities

* **agent/** → AI orchestration, prompt, and tool definitions.
* **menu/** → Menu retrieval and validation.
* **cart/** → Cart management.
* **orders/** → Order placement and retrieval.
* **sessions/** → Conversation and session lifecycle.
* **notifications/** → Email and SMS notifications.
* **analytics/** → Token usage, latency, and cost tracking.
* **routes/** → REST API endpoints.
* **prisma/** → Database schema and seed data.
* **sockets/** → Real-time communication.
* **middleware/** → Express middleware.
* **types/** → Shared backend models.
* **utils/** → Helper utilities.

---

# Shared Flow

```text
Frontend
    │
    ▼
REST API / Socket.IO
    │
    ▼
Express Server
    │
    ▼
AI Agent
    │
    ▼
Tool Registry
    │
    ▼
Business Services
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
```
