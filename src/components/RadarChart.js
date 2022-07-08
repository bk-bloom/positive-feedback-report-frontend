import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels
);
const labels = ["긍정정서", "몰입", "관계", "의미", "성취", "활력"];
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "나의 평균",
//       data: [2, 9, 3, 5, 2, 3],
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       borderWidth: 1,
//     },
//     {
//       label: "우리 회사 평균",
//       data: [4, 7, 6, 3, 8, 5],
//       backgroundColor: "rgba(53, 162, 235, 0.2)",
//       borderColor: "rgba(53, 162, 235, 1)",
//       borderWidth: 1,
//     },
//   ],
// };

// const options = {
//   scales: {
//     r: {
//       ticks: {
//         beginAtZero: true,
//         max: 10,
//         min: 1,
//         stepSize: 2,
//       },
//       pointLabels: {
//         color: "black",
//       },
//     },
//   },
// };

const config = {
  type: "radar",
  data: {
    labels: ["긍정정서", "몰입", "관계", "의미", "성취", "활력"],
    datasets: [
      {
        label: "나의 평균",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        data: [5, 9, 3, 5, 6, 8],
      },
      {
        label: "우리 회사 평균",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235, 1)",
        data: [4, 7, 6, 6, 8, 5],
      },
    ],
  },
  options: {
    plugins: {
      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.borderColor;
        },
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: Math.round,
        padding: 4,
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          max: 10,
          min: 1,
          stepSize: 2,
        },
        pointLabels: {
          color: "black",
        },
      },
    },
    // Core options
    aspectRatio: 4 / 3,
    elements: {
      point: {
        hoverRadius: 7,
        radius: 3,
      },
    },
  },
};

export function RadarChart() {
  return <Radar data={config.data} options={config.options} />;
}
