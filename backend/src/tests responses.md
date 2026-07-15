Request #1

Show me pizzas.

{
    "success": true,
    "data": {
        "message": "It seems like the restaurant has a variety of pizzas, burgers, and sides. They also have a combo meal option that includes a burger, side, and drink.",
        "promptTokens": 1783,
        "latency": 416,
        "completionTokens": 34,
        "totalTokens": 1817
    }
}

Which one is the cheapest?

{
    "success": true,
    "data": {
        "message": "Unfortunately, the search function didn't return any results. Let me try to find the cheapest option by looking at the menu again.\n\nFrom the menu, the cheapest option is the \"Classic Cheeseburger\" which costs $8.99.",
        "promptTokens": 1865,
        "latency": 967,
        "completionTokens": 48,
        "totalTokens": 1913
    }
}

Add one Margherita pizza.

{
    "success": true,
    "data": {
        "message": "One Margherita pizza has been added to the menu.",
        "promptTokens": 3420,
        "latency": 2618,
        "completionTokens": 13,
        "totalTokens": 3433
    }
}

Show my cart.
{
    "success": true,
    "data": {
        "message": "Your cart is currently empty.",
        "promptTokens": 4937,
        "latency": 26978,
        "completionTokens": 7,
        "totalTokens": 4944
    }
}


Phase 8 — Session Isolation

Create a new session.

Ask

Show my cart.

{
    "success": false,
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Something went wrong."
}

BadRequestError: 400 {"error":{"message":"tool call validation failed: attempted to call tool 'get_cart' which was not in request.tools","type":"invalid_request_error","code":"tool_use_failed","failed_generation":"<function=get_cart></function>"}}
    at APIError.generate (F:\01_Projects 💻\poc-i1110Labs\backend\node_modules\groq-sdk\src\core\error.ts:60:14)
    at Groq.makeStatusError (F:\01_Projects 💻\poc-i1110Labs\backend\node_modules\groq-sdk\src\client.ts:286:28)
    at Groq.makeRequest (F:\01_Projects 💻\poc-i1110Labs\backend\node_modules\groq-sdk\src\client.ts:506:24)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async AIAgentService.processMessage (F:\01_Projects 💻\poc-i1110Labs\backend\src\ai\ai-agent.service.ts:25:22)
    at async chatController (F:\01_Projects 💻\poc-i1110Labs\backend\src\features\chat\chat.controller.ts:15:22) {
  status: 400,
  headers: Headers {
    date: 'Tue, 14 Jul 2026 14:56:38 GMT',
    'content-type': 'application/json',
    'content-length': '247',
    connection: 'keep-alive',
    'cache-control': 'private, max-age=0, no-store, no-cache, must-revalidate',
    server: 'cloudflare',
    vary: 'Origin',
    'x-groq-region': 'bom',
    'x-ratelimit-limit-requests': '14400',
    'x-ratelimit-limit-tokens': '6000',
    'x-ratelimit-remaining-requests': '14399',
    'x-ratelimit-remaining-tokens': '5719',
    'x-ratelimit-reset-requests': '6s',
    'x-ratelimit-reset-tokens': '2.81s',
    'x-request-id': 'req_01kxgj2hg4fh5s8n4y1bhjws72',
    via: '1.1 google',
    'cf-cache-status': 'DYNAMIC',
    'set-cookie': '__cf_bm=bvPBnpu8G8BWT7Ae0Vg2taOGWs7R3Xle4ECXc7woV3A-1784040998.3907545-1.0.1.1-haM2oRNMknjcmnquYhTQ08vdjM_.yw3gepsOuBh38G5O7N6D6LPdV6MqVSk8TJ7kcQAB28N7EQVQr38txB8djJN8a7m8UYjRWknjbDlm3nKAyi8sotfoZP6FRHYK.wAG; HttpOnly; SameSite=None; Secure; Path=/; Domain=groq.com; Expires=Tue, 14 Jul 2026 15:26:38 GMT',
    'strict-transport-security': 'max-age=15552000',
    'cf-ray': 'a1b1600feb1fa6ad-BOM',
    'alt-svc': 'h3=":443"; ma=86400'
  },
  error: {
    error: {
      message: "tool call validation failed: attempted to call tool 'get_cart' which was not in request.tools",
      type: 'invalid_request_error',
      code: 'tool_use_failed',
      failed_generation: '<function=get_cart></function>'
    }
  }
}

Phase 9 — Error Handling

Send

{
  "sessionId":"fake-id",
  "message":"Hello"
}

{
    "success": false,
    "code": "SESSION_NOT_FOUND",
    "message": "Session 'df1576be-6b8a-4449-b2b8-faedkdksvbdvbdk' was not found."
}







## 15-July-2026 04:01PM

Show me pizzas:
{
    "success": true,
    "data": {
        "message": "It seems that no pizzas were found in the menu.",
        "promptTokens": 941,
        "latency": 584,
        "completionTokens": 12,
        "totalTokens": 953
    }
}


chep pizza
{
    "success": true,
    "data": {
        "message": "Unfortunately, no pizzas were found to be the cheapest.",
        "promptTokens": 1000,
        "latency": 435,
        "completionTokens": 12,
        "totalTokens": 1012
    }
}


magreete pizza:
{
    "success": true,
    "data": {
        "message": "It seems that the Margherita pizza does not exist in the menu.",
        "promptTokens": 1098,
        "latency": 435,
        "completionTokens": 16,
        "totalTokens": 1114
    }
}

Show cart:
{
    "success": true,
    "data": {
        "message": "Your cart is currently empty.",
        "promptTokens": 1168,
        "latency": 541,
        "completionTokens": 7,
        "totalTokens": 1175
    }
}

Remove te pizza:
{
    "success": true,
    "data": {
        "message": "Your cart has been cleared.",
        "promptTokens": 1218,
        "latency": 416,
        "completionTokens": 7,
        "totalTokens": 1225
    }
}

Sho my cart:
{
    "success": true,
    "data": {
        "message": "Your cart is still empty.",
        "promptTokens": 1223,
        "latency": 372,
        "completionTokens": 7,
        "totalTokens": 1230
    }
}

Add two pizzas:
{
    "success": false,
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Something went wrong."
}


Error: Maximum tool iterations (5) exceeded.
    at AIAgentService.processMessage (F:\01_Projects 💻\poc-i1110Labs\backend\src\ai\ai-agent.service.ts:113:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async chatController (F:\01_Projects 💻\poc-i1110Labs\backend\src\features\chat\chat.controller.ts:15:22)


    Clear my cart:
    same error:
    