type Props = {
  state: VoiceState;
};

const LABELS = {
  idle: "Tap the microphone to begin",

  listening: "Listening...",

  thinking: "Understanding your request...",

  speaking: "Responding...",
};

export function VoiceStatus({ state }: Props) {
  return <p className="text-sm text-[var(--text-subtle)]">{LABELS[state]}</p>;
}
