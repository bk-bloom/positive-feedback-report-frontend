import React, { useState } from "react";
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

const options = {
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.borderColor;
      },
      color: "white",
      font: {
        weight: "bold",
      },
      //   formatter: Math.round,
      padding: 4,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      beginAtZero: false,
      suggestedMax: 10,
      suggestedMin: 1,
      ticks: {
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
};
export function RadarChart({ companyAverage, myAverage }) {
  //   console.log("Radar Chart =>", companyAverage, myAverage);
  const data = {
    labels: ["긍정정서", "몰입", "관계", "의미", "성취", "활력"],
    datasets: [
      {
        label: "나의 평균",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235, 1)",
        data: myAverage,
      },
      {
        label: "우리 회사 평균",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        data: companyAverage,
        datalabels: {
          align: "start",
          anchor: "start",
        },
      },
    ],
  };
  return <Radar data={data} options={options} width={200} height={100} />;
}