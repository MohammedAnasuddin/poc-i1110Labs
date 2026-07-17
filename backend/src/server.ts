import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./database/prisma.js";

async function startServer() {
  await prisma.analytics.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  app.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
  });
}

startServer();
