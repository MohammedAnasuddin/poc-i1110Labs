"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceConversationService = exports.textToSpeechService = exports.speechToTextService = exports.aiAgentService = exports.toolRegistry = exports.cartTools = exports.menuTools = exports.cartService = exports.pricingService = exports.sessionService = exports.menuService = void 0;
const menu_service_js_1 = require("./menu/menu.service.js");
const pricing_service_js_1 = require("./cart/pricing.service.js");
const cart_service_js_1 = require("./cart/cart.service.js");
const session_service_1 = require("./sessions/session.service");
const menu_tools_js_1 = require("./tools/menu.tools.js");
const cart_tools_js_1 = require("./tools/cart.tools.js");
const tool_registry_js_1 = require("./ai/tool-registry.js");
const ai_agent_service_js_1 = require("./ai/ai-agent.service.js");
const order_tools_js_1 = require("./tools/order.tools.js");
const order_service_js_1 = require("./orders/order.service.js");
const prisma_js_1 = require("./database/prisma.js");
const groq_stt_provider_js_1 = require("./voice/providers/groq-stt.provider.js");
const speech_to_text_service_js_1 = require("./voice/speech-to-text.service.js");
const text_to_speech_service_js_1 = require("./voice/text-to-speech.service.js");
const edge_tts_provider_js_1 = require("./voice/providers/tts/edge-tts.provider.js");
const voice_conversation_service_js_1 = require("./voice/voice-conversation.service.js");
// Services
exports.menuService = new menu_service_js_1.MenuService();
exports.sessionService = new session_service_1.SessionService(exports.menuService);
exports.pricingService = new pricing_service_js_1.PricingService();
exports.cartService = new cart_service_js_1.CartService(exports.sessionService, exports.menuService, exports.pricingService);
// Tools
exports.menuTools = new menu_tools_js_1.MenuTools(exports.menuService);
exports.cartTools = new cart_tools_js_1.CartTools(exports.cartService);
// AI
const orderService = new order_service_js_1.OrderService(prisma_js_1.prisma, exports.cartService);
const orderTools = new order_tools_js_1.OrderTools(orderService);
exports.toolRegistry = new tool_registry_js_1.ToolRegistry(exports.menuTools, exports.cartTools, orderTools);
exports.aiAgentService = new ai_agent_service_js_1.AIAgentService(exports.toolRegistry, exports.sessionService);
const speechProvider = new groq_stt_provider_js_1.GroqSpeechToTextProvider();
exports.speechToTextService = new speech_to_text_service_js_1.SpeechToTextService(speechProvider);
const ttsProvider = new edge_tts_provider_js_1.EdgeTTSProvider();
exports.textToSpeechService = new text_to_speech_service_js_1.TextToSpeechService(ttsProvider);
const voiceConversationService = new voice_conversation_service_js_1.VoiceConversationService(exports.speechToTextService, exports.aiAgentService, exports.textToSpeechService);
exports.voiceConversationService = voiceConversationService;
//# sourceMappingURL=container.js.map