export function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="flex h-12 items-end gap-1">
      {[10, 22, 32, 20, 36, 18, 28].map((height, index) => (
        <span
          key={index}
          className={`
            w-1 rounded-full bg-[var(--primary)]
            ${active ? "animate-pulse" : ""}
          `}
          style={{
            height,
            animationDelay: `${index * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
