import { Bot, Wrench, User, Receipt, CircleAlert } from "lucide-react";

export const typeConfig = {
  USER: {
    label: "User",
    icon: User,
    className:
      "border-blue-500 bg-blue-500/15 text-blue-600 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800",
    fallbackStyles: {
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      borderColor: "rgba(59, 130, 246, 0.3)",
    },
  },
  LLM: {
    label: "AI",
    icon: Bot,
    className:
      "border-violet-500 bg-violet-500/15 text-violet-600 dark:text-violet-400 dark:bg-violet-950/50 dark:border-violet-800",
    fallbackStyles: {
      backgroundColor: "rgba(139, 92, 246, 0.15)",
      borderColor: "rgba(139, 92, 246, 0.3)",
    },
  },
  TOOL: {
    label: "Tool",
    icon: Wrench,
    className:
      "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800",
    fallbackStyles: {
      backgroundColor: "rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.3)",
    },
  },
  ORDER: {
    label: "Order",
    icon: Receipt,
    className:
      "border-orange-500 bg-orange-500/15 text-orange-600 dark:text-orange-400 dark:bg-orange-950/50 dark:border-orange-800",
    fallbackStyles: {
      backgroundColor: "rgba(249, 115, 22, 0.15)",
      borderColor: "rgba(249, 115, 22, 0.3)",
    },
  },
  ERROR: {
    label: "Error",
    icon: CircleAlert,
    className:
      "border-red-500 bg-red-500/15 text-red-600 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800",
    fallbackStyles: {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      borderColor: "rgba(239, 68, 68, 0.3)",
    },
  },
};
