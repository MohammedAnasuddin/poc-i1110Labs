type Props = {
  type: "USER" | "LLM" | "TOOL" | "ORDER" | "ERROR";
};

const styles = {
  USER: "bg-blue-100 text-blue-700",
  LLM: "bg-purple-100 text-purple-700",
  TOOL: "bg-green-100 text-green-700",
  ORDER: "bg-orange-100 text-orange-700",
  ERROR: "bg-red-100 text-red-700",
};

export function LogBadge({ type }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}
