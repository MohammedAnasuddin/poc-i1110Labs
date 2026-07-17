type StatCardProps = {
  title: string;
  value: string | number;
};

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card p-5">
      <p className="text-sm text-[var(--muted-foreground)]">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}
