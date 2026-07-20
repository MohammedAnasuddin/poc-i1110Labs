import { BrowserRouter, Routes, Route } from "react-router-dom";

import { VoicePage } from "./pages/voice-page";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { LogsPage } from "./pages/LogsPage";

export default function App() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoicePage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
