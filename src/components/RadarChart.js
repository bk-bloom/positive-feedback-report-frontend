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
import styled from "styled-components";

const Container = styled.div`
  width: 708px;
  height: 465px;
  margin-top: 50px;
  margin-bottom: 30px;
`;

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
  responsive: true,
  maintainAspectRatio: false,
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
export function RadarChart({ companyScore, myScore }) {
  //   console.log("Radar Chart =>", companyAverage, myAverage);
  const data = {
    labels: ["긍정정서", "몰입", "관계", "의미", "성취", "활력"],
    datasets: [
      {
        label: "나의 평균",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235, 1)",
        data: myScore,
      },
      {
        label: "우리 회사 평균",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        data: companyScore,
        datalabels: {
          align: "start",
          anchor: "start",
        },
      },
    ],
  };
  return (
    <Container>
      {" "}
      <Radar data={data} options={options} />
    </Container>
  );
}
