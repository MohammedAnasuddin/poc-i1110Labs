# Technology Stack

The application is built using a TypeScript-first technology stack that prioritizes rapid development, maintainability, and reliable AI integration while remaining completely free to develop and run.

---

# Frontend

## React

**Reason for Selection**

* Provides a component-based architecture for building an interactive user interface.
* Enables reusable components for the chat interface, transcript, live cart, analytics panel, and orders page.
* Large ecosystem and excellent TypeScript support.

---

## Vite

**Reason for Selection**

* Extremely fast development server and build tool.
* Provides instant Hot Module Replacement (HMR), improving development speed.
* Minimal configuration allows rapid project setup.

---

## TypeScript

**Reason for Selection**

* Ensures type safety across the entire application.
* Reduces runtime errors.
* Improves maintainability and developer productivity.

---

## Tailwind CSS

**Reason for Selection**

* Enables rapid UI development using utility classes.
* Simplifies responsive design.
* Maintains consistent styling throughout the application.

---

## shadcn/ui

**Reason for Selection**

* Provides accessible and customizable UI components.
* Accelerates frontend development.
* Integrates seamlessly with Tailwind CSS.

---

## Zustand

**Reason for Selection**

* Lightweight state management solution.
* Suitable for managing session state, live cart updates, transcript data, and UI state.
* Minimal boilerplate and easy integration.

---

## Socket.IO Client

**Reason for Selection**

* Enables real-time communication with the backend.
* Supports live transcript updates, cart synchronization, streaming responses, and analytics updates.

---

# Backend

## Express.js

**Reason for Selection**

* Lightweight and flexible web framework.
* Minimal boilerplate enables rapid development.
* Large ecosystem and extensive community support.
* Well suited for implementing REST APIs and AI tool-calling workflows.

---

## TypeScript

**Reason for Selection**

* Maintains a single programming language across frontend and backend.
* Improves reliability through static typing.
* Simplifies sharing interfaces and data models.

---

## Socket.IO

**Reason for Selection**

* Enables bidirectional real-time communication.
* Supports live transcript updates, streaming assistant responses, and synchronized cart updates.

---

# Database

## PostgreSQL

**Reason for Selection**

* Reliable relational database for storing sessions, carts, orders, transcripts, and analytics.
* Open-source and widely used in production systems.

---

## Prisma ORM

**Reason for Selection**

* Provides type-safe database access.
* Simplifies schema management and migrations.
* Integrates naturally with TypeScript applications.

---

# Artificial Intelligence

## Groq API

**Reason for Selection**

* Provides low-latency inference suitable for conversational AI.
* Supports OpenAI-compatible APIs and tool/function calling.
* Offers a free developer tier, making it ideal for this proof of concept.

---

## Groq Whisper Speech-to-Text

**Reason for Selection**

* Converts user speech into text with high speed and accuracy.
* Supports multilingual transcription.
* Integrates seamlessly with the Groq ecosystem.

---

# Voice Output

## Browser SpeechSynthesis API

**Reason for Selection**

* Built into modern browsers.
* Completely free to use.
* Converts the assistant's text responses into spoken audio without requiring external services.

---

# Validation

## Zod

**Reason for Selection**

* Validates API requests and AI tool parameters.
* Prevents invalid data from reaching the business logic.
* Provides excellent TypeScript integration.

---

# Notifications

## Ethereal Email

**Reason for Selection**

* Free email testing service.
* Enables end-to-end email functionality without requiring a production SMTP provider.
* Suitable for demonstrating order confirmation emails.

---

## Mock SMS Service

**Reason for Selection**

* Simulates SMS delivery while keeping the project free.
* Demonstrates the notification workflow without relying on paid SMS providers.

---


