import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  promptTokens: number;
  completionTokens: number;
};

export function TokenChart({ promptTokens, completionTokens }: Props) {
  const data = [
    {
      name: "Prompt",
      tokens: promptTokens,
    },
    {
      name: "Completion",
      tokens: completionTokens,
    },
  ].reverse();

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Area
          dataKey="tokens"
          type="monotone"
          fill="var(--accent)"
          stroke="var(--primary)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
