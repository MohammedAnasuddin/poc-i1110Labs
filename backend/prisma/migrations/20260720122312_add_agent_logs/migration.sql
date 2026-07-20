-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('USER', 'LLM', 'TOOL', 'ORDER', 'ERROR');

-- CreateTable
CREATE TABLE "AgentLog" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "type" "LogType" NOT NULL,
    "message" TEXT,
    "toolName" TEXT,
    "toolArguments" JSONB,
    "toolResponse" JSONB,
    "success" BOOLEAN,
    "latency" INTEGER,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentLog_pkey" PRIMARY KEY ("id")
);
