import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Container = styled.div`
  height: 451px;
  // padding: 10px;
  // border: 1px solid black;
`;

export const options = {
  // responsive: true,
  maintainAspectRatio: false,
  layout: {
    // padding: 20,
  },
  plugins: {
    legend: {
      labels: {
        padding: 10,
        boxHeight: 2,
      },
      // display: false,
      position: "bottom",
    },
    title: {
      display: false,
      text: "2주차 마음체크업",
    },
    datalabels: {
      display: true,
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      color: "white",
      font: {
        weight: "bold",
      },
      formatter: Math.round,
      padding: 6,
    },
  },
  // elements: {
  //   line: {
  //     fill: true,
  //     tension: 0,
  //   },
  // },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
      ticks: {
        color: "black",
        padding: 10,
      },
    },
    y: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 2,
        padding: 20,
        color: "black",
      },
      grid: {
        drawBorder: false,
        lineWidth: 1,
      },
    },
  },
};

export function WeeklyChart({ results, week }) {
  // console.log("Weekly Chart => ", results, week);
  const countRef = useRef(0);
  const [data, setData] = useState({
    labels: ["긍정정서", "몰입", "관계", "의미", "성취", "활력"],
    datasets: [
      {
        label: "이번 주",
        data:
          results[week === 0 ? 0 : 1] &&
          results[week === 0 ? 0 : 1].answers.slice(2, 8),
        borderColor: "#00c0e0",
        backgroundColor: "#00c0e0",
        borderWidth: 2,
      },
      {
        label: "지난 주",
        data: week === 0 ? [] : results[0] && results[0].answers.slice(2, 8),
        borderDash: [5, 5],
        borderColor: "#ffc842",
        backgroundColor: "#ffc842",
        borderWidth: 2,
        // datalabels: {
        //   align: "start",
        //   anchor: "start",
        // },
      },
    ],
  });
  useEffect(() => {}, []);
  return (
    <Container>
      <Line options={options} data={data} height={450} />
    </Container>
  );
}
