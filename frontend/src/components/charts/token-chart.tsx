import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ConversationAnalytics } from "../../types/analytics";

type Props = {
  conversations: ConversationAnalytics[];
};

export function TokenChart({ conversations }: Props) {
  const data = conversations.map((conversation, index) => ({
    name: `Conv ${index + 1}`,
    prompt: conversation.promptTokens,
    completion: conversation.completionTokens,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="prompt"
          stackId="tokens"
          name="Prompt"
          fill="var(--primary)"
        />

        <Bar
          dataKey="completion"
          stackId="tokens"
          name="Completion"
          fill="var(--accent)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
