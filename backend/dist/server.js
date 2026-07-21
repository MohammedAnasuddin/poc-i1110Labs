"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const env_js_1 = require("./config/env.js");
const prisma_js_1 = require("./database/prisma.js");
async function startServer() {
    await prisma_js_1.prisma.analytics.upsert({
        where: { id: 1 },
        update: {},
        create: { id: 1 },
    });
    app_js_1.default.listen(env_js_1.env.PORT, () => {
        console.log(`Server running on ${env_js_1.env.PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map