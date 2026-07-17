import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");

    setDark(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        flex
        items-center
        gap-2
        rounded-[var(--radius-md)]
        border
        border-[var(--border)]
        px-3
        py-2
        text-sm
        transition
        hover:bg-[var(--secondary)]
      "
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}

      {dark ? "Light" : "Dark"}
    </button>
  );
}