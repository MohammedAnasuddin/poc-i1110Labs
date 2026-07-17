import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  success: number;
  failed: number;
};

export function ToolChart({ success, failed }: Props) {
  const data = [
    { name: "Success", value: success },
    { name: "Failed", value: failed },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={90}
          label
        >
          <Cell fill="#22c55e" />
          <Cell fill="#ef4444" />
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}