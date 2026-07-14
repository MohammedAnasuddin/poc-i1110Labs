
# Sprint 5 — Ordering Engine

## 🎯 Sprint Goal

Build the complete ordering engine that manages customer sessions, shopping carts, and pricing calculations. By the end of this sprint, the backend will be capable of creating and managing orders for multiple concurrent customers.

---

# 🏁 Definition of Done

- Every customer has an isolated session.
- Every session owns its own cart.
- Cart operations are fully functional.
- Pricing is calculated correctly.
- Backend can prepare a complete order for the AI agent.

---

# 📖 User Stories

---

# Story 5.1 — Session Management

## User Story

> As the ordering system, I want each caller to have an independent session so that multiple customers can order simultaneously without interfering with each other.

---

## Tasks

### Session Domain

- [ ] Design `Session`
- [ ] Define session states
- [ ] Generate unique session IDs

### Session Repository

- [ ] Store active sessions (In-Memory for POC)
- [ ] Retrieve session
- [ ] Remove session

### Session Service

- [ ] Create session
- [ ] Get session
- [ ] End session
- [ ] Reset session
- [ ] Verify session existence

---

## Deliverables

```text
src/session/

session.types.ts
session.service.ts
```

---

## Acceptance Criteria

- Can create multiple sessions.
- Sessions are isolated.
- Ending one session does not affect another.

---

# Story 5.2 — Cart Domain

## User Story

> As a customer, I want a shopping cart so I can gradually build my order during the conversation.

---

## Tasks

### Cart Models

- [ ] Design Cart
- [ ] Design CartItem
- [ ] Design CartSummary

### Cart Relationships

- [ ] One cart per session
- [ ] Cart contains menu selections
- [ ] Cart supports multiple quantities

---

## Deliverables

```text
src/cart/

cart.types.ts
```

---

## Acceptance Criteria

- Cart represents a complete customer order.
- Supports multiple menu items.
- Supports modifiers.

---

# Story 5.3 — Cart Service

## User Story

> As the AI agent, I want to modify the customer's cart so I can fulfill ordering requests.

---

## Tasks

### CRUD Operations

- [ ] Add item
- [ ] Remove item
- [ ] Update quantity
- [ ] Clear cart
- [ ] View cart

### Validation

- [ ] Validate session exists
- [ ] Validate menu selection
- [ ] Merge duplicate items
- [ ] Prevent invalid quantities

---

## Deliverables

```text
src/cart/

cart.service.ts
```

---

## Acceptance Criteria

- Items can be added.
- Items can be updated.
- Items can be removed.
- Cart remains consistent.

---

# Story 5.4 — Pricing Engine

## User Story

> As the ordering system, I want prices to be calculated centrally so totals are always correct.

---

## Tasks

### Item Pricing

- [ ] Calculate base price
- [ ] Calculate modifier prices
- [ ] Calculate quantity

### Cart Pricing

- [ ] Calculate subtotal
- [ ] Calculate total items
- [ ] Calculate grand total

---

## Deliverables

```text
src/cart/

pricing.service.ts
```

---

## Acceptance Criteria

- Modifier prices included.
- Quantity handled correctly.
- Totals always accurate.

---

# Story 5.5 — Cart Summary

## User Story

> As a customer, I want to review my current order so I know what will be placed.

---

## Tasks

- [ ] Build cart summary
- [ ] Include quantities
- [ ] Include modifiers
- [ ] Include subtotal
- [ ] Include total
- [ ] Return AI-friendly format

---

## Deliverables

Integrated into:

```text
src/cart/cart.service.ts
```

---

## Acceptance Criteria

Example:

```text
1 × Large Pepperoni Pizza
    • Stuffed Crust

2 × Coca-Cola

-------------------------

Items: 3

Total: $24.97
```

---

# 📂 Files to Create

```text
poc/backend/src/

session/
├── session.types.ts
└── session.service.ts

cart/
├── cart.types.ts
├── cart.service.ts
└── pricing.service.ts
```

---

# 📂 Files to Update

```text
src/menu/menu.types.ts
```

(Reuse `MenuSelection` from Sprint 4.)

---

# 🧪 Sprint Acceptance Criteria

- [ ] Multiple sessions supported.
- [ ] One cart per session.
- [ ] Cart CRUD operations work.
- [ ] Duplicate items merge correctly.
- [ ] Modifier validation enforced.
- [ ] Pricing calculations are correct.
- [ ] Cart summary generated.
- [ ] `npm run build` passes.
- [ ] `npm run dev` runs successfully.

---

# 📦 Sprint Outcome

At the end of Sprint 5, the backend will have a complete ordering engine capable of:

- Managing multiple independent customer sessions.
- Maintaining isolated shopping carts.
- Validating menu selections.
- Calculating accurate prices.
- Producing a complete order summary.

This will provide everything needed for the AI agent in Sprint 6, where the LLM will simply call these services through tools instead of implementing any business logic itself.

---

# 📝 Sprint Commit

**Commit Message**

```text
feat(order): implement ordering engine
```

## Commit Body

```text
Sprint 5 - Ordering Engine

- Implement session management
- Add isolated customer carts
- Implement cart CRUD operations
- Add centralized pricing engine
- Generate cart summaries
- Prepare backend for AI tool integration
```
