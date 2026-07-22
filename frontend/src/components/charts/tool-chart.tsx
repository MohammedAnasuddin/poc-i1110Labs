// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// type Props = {
//   success: number;
//   failed: number;
// };

// export function ToolChart({ success, failed }: Props) {
//   const data = [
//     { name: "Success", value: success },
//     { name: "Failed", value: failed },
//   ];

//   return (
//     <ResponsiveContainer width="100%" height={260}>
//       <PieChart>
//         <Pie
//           data={data}
//           dataKey="value"
//           outerRadius={90}
//           label
//         >
//           <Cell fill="#22c55e" />
//           <Cell fill="#ef4444" />
//         </Pie>

//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type Props = {
  success: number;
  failed: number;
};

export function ToolChart({ success, failed }: Props) {
  const isDark = document.documentElement.classList.contains("dark");

  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      fontFamily: "inherit",
      toolbar: {
        show: false,
      },
    },

    theme: {
      mode: isDark ? "dark" : "light",
    },

    labels: ["Success", "Failed"],

    colors: ["#22c55e", "#ef4444"],

    stroke: {
      width: 0,
    },

    legend: {
      position: "bottom",
      fontSize: "14px",

      labels: {
        colors: isDark ? "#e5e7eb" : "#374151",
      },
    },

    dataLabels: {
      enabled: true,
      formatter(val) {
        if (typeof val !== "number") {
          return String(val);
        }

        return `${val.toFixed(0)}%`;
      },
    },

    tooltip: {
      theme: isDark ? "dark" : "light",

      y: {
        formatter(value) {
          return `${value} calls`;
        },
      },
    },

    plotOptions: {
      pie: {
        donut: {
          size: "68%",

          labels: {
            show: true,

            total: {
              show: true,
              label: "Total",
              formatter() {
                return `${success + failed}`;
              },
            },

            value: {
              formatter(value) {
                return String(value);
              },
            },
          },
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={[success, failed]}
      type="donut"
      height={260}
    />
  );
}
