import { createBrowserRouter } from "react-router-dom";

import { VoicePage } from "./pages/voice-page";
import { AnalyticsPage } from "./pages/AnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <VoicePage />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
  },
]);