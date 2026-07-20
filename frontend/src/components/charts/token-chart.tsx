// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import type { ConversationAnalytics } from "../../types/analytics";

// type Props = {
//   conversations: ConversationAnalytics[];
// };

// export function TokenChart({ conversations }: Props) {
//   const data = conversations.map((conversation, index) => ({
//     name: `Conv ${index + 1}`,
//     prompt: conversation.promptTokens,
//     completion: conversation.completionTokens,
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />

//         <XAxis dataKey="name" />

//         <YAxis />

//         <Tooltip />

//         <Legend />

//         <Bar
//           dataKey="prompt"
//           stackId="tokens"
//           name="Prompt"
//           fill="var(--primary)"
//         />

//         <Bar
//           dataKey="completion"
//           stackId="tokens"
//           name="Completion"
//           fill="var(--accent)"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }


import { useMemo } from "react";

import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import type { ConversationAnalytics } from "../../types/analytics";

type Props = {
  conversations: ConversationAnalytics[];
};

export function TokenChart({ conversations }: Props) {
  const isDark = document.documentElement.classList.contains("dark");

  const categories = useMemo(
    () =>
      conversations.map((_, index) => `Conv ${index + 1}`),
    [conversations],
  );

  const series = useMemo(
    () => [
      {
        name: "Prompt",
        data: conversations.map((c) => c.promptTokens),
      },
      {
        name: "Completion",
        data: conversations.map((c) => c.completionTokens),
      },
    ],
    [conversations],
  );

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
      fontFamily: "inherit",
    },

    theme: {
      mode: isDark ? "dark" : "light",
    },

    colors: ["#3b82f6", "#10b981"],

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "50%",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
    },

    grid: {
      borderColor: isDark ? "#2a2a2a" : "#e5e7eb",
      strokeDashArray: 4,
    },

    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: isDark ? "#e5e7eb" : "#374151",
      },
    },

    xaxis: {
      categories,

      labels: {
        style: {
          colors: categories.map(() =>
            isDark ? "#9ca3af" : "#6b7280",
          ),
        },
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: [isDark ? "#9ca3af" : "#6b7280"],
        },
      },
    },

    tooltip: {
      theme: isDark ? "dark" : "light",

      y: {
        formatter(value) {
          return `${value.toLocaleString()} tokens`;
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={320}
    />
  );
}