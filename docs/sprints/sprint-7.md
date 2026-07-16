# Sprint 7 — Orders

## 🎯 Sprint Goal

Complete the customer ordering workflow by converting the current cart into a persisted order stored in PostgreSQL.

---

# 🏁 Definition of Done

By the end of this sprint:

- ✅ AI can place an order.
- ✅ Order is validated.
- ✅ Order is stored in PostgreSQL.
- ✅ Cart is cleared after successful checkout.
- ✅ Customer can retrieve previous orders.
- ✅ Order status is tracked.
- ✅ Ready for notifications next sprint.

---

# 🏗️ Architecture

```text
             Customer
                 │
                 ▼
             AI Agent
                 │
          place_order()
                 │
                 ▼
          OrderService
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
 CartService          PostgreSQL
      │
      ▼
 Clear Cart
```

---

# Story 7.1 — Database

## User Story

> As the backend, I need persistent storage for completed orders.

### Tasks

- [ ] Create `orders` table
- [ ] Store cart snapshot as JSONB
- [ ] Store pricing
- [ ] Store timestamps
- [ ] Store notification flags

---

### Deliverables

```text
database/

orders.sql
```

---

### Table

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY,

    session_id UUID NOT NULL,

    items JSONB NOT NULL,

    subtotal NUMERIC(10,2) NOT NULL,

    tax NUMERIC(10,2) NOT NULL,

    total NUMERIC(10,2) NOT NULL,

    sms_sent BOOLEAN DEFAULT FALSE,

    email_sent BOOLEAN DEFAULT FALSE,

    status VARCHAR(20) NOT NULL,

    placed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

# Story 7.2 — Order Service

## User Story

> As the AI, I want to convert the active cart into a completed order.

### Tasks

- [ ] Validate cart isn't empty
- [ ] Calculate totals
- [ ] Create order object
- [ ] Persist order
- [ ] Clear cart
- [ ] Return order summary

---

### Deliverables

```text
src/orders/

order.service.ts
order.types.ts
```

---

### Acceptance Criteria

- Empty carts rejected.
- Order stored.
- Cart cleared.

---

# Story 7.3 — Order Tool

## User Story

> As the AI, I want to place customer orders.

### Tasks

- [ ] Create `place_order`
- [ ] Register tool
- [ ] Add tool definition

---

### Deliverables

```text
src/tools/

order.tools.ts
```

---

### AI Flow

```text
User

↓

Checkout

↓

view_cart

↓

place_order

↓

OrderService

↓

PostgreSQL

↓

Clear Cart

↓

AI Response
```

---

# Story 7.4 — Order History

## User Story

> As a customer, I want to see previous orders.

### Tasks

- [ ] Get order by ID
- [ ] Get orders by session

---

### Deliverables

```text
OrderService
```

No separate repository required.

---

# Story 7.5 — Chat API

Add support for

```text
Show my previous orders.
```

and

```text
Place my order.
```

through the AI.

---

# Files to Create

```text
src/

orders/
├── order.service.ts
└── order.types.ts

tools/
└── order.tools.ts

database/
└── orders.sql
```

---

# Files to Update

```text
src/

container.ts

tool-registry.ts

tool-definitions.ts

ai/system-prompt.ts
```

---

# Acceptance Tests

### Test 1

```
Add Pizza
↓

Checkout
```

Expected

- Order stored
- Cart empty

---

### Test 2

```
Show my orders
```

Expected

Returns stored orders.

---

### Test 3

```
Checkout
```

with empty cart.

Expected

```
Cart is empty.
```

---

### Test 4

Restart server.

```
Show my orders
```

Expected

Orders still exist.

---

### Test 5

Verify PostgreSQL

```
SELECT * FROM orders;
```

Returns persisted order.

---

# Sprint Outcome

At the end of Sprint 7:

- ✅ AI can successfully complete an order.
- ✅ Orders persist in PostgreSQL.
- ✅ Cart is emptied after checkout.
- ✅ Customers can retrieve previous orders.
- ✅ Backend is ready for email and SMS notifications in Sprint 8.
