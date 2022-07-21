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

// ChartJS.pluginService.register({
//   beforeInit: function (chart) {
//     console.log("hi", chart);
//     chart.legend.afterFit = function () {
//       chart.legend.options.labels.padding = 20;
//       chart.height += 30;
//     };
//   },
// });

const Container = styled.div`
  width: 343px;
  height: 213px;
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
      display: false,
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
        padding: 10,
        color: "black",
      },
      grid: {
        drawBorder: false,
        lineWidth: 1,
      },
    },
  },
};

export function Chart({ result, color }) {
  const countRef = useRef(0);
  const [data, setData] = useState({
    labels: ["1주", "2주", "3주", "4주"],
    datasets: [
      {
        data: result,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
      },
    ],
  });
  // useEffect(() => {
  //   if (countRef.current === 0) {
  //     if (result.length === 1) {
  //       const obj = {
  //         ...data,
  //         datasets: [data.datasets[1]],
  //       };
  //       console.log(obj);
  //       console.log(result[0].slice(1, 7));
  //       obj.datasets[0].data = result[0].slice(1, 7);
  //       console.log(obj);
  //       setData(obj);
  //     }
  //     countRef.current += 1;
  //   }
  //   // setData();
  // }, []);
  return (
    <Container>
      <Line options={options} data={data} height={250} />
    </Container>
  );
}
