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
  //   height: 200px;
  // width: 500px;
  width: 600px;
  padding: 40px;
  // border: 1px solid black;
`;

export const options = {
  // responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
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

// const labels = ["긍정정서", "몰입", "관계", "의미", "성취", "활력"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "지난 주",
//       data: [10, 10, 8, 8, 9, 10],
//       borderDash: [5, 5],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderWidth: 2,
//       datalabels: {
//         align: "start",
//         anchor: "start",
//       },
//     },
//     {
//       label: "이번 주",
//       data: [10, 10, 1, 10, 10, 10],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgb(53, 162, 235)",
//       borderWidth: 2,
//     },
//   ],
// };

export function WeeklyChart({ result, week }) {
  // console.log("Weekly Chart => ", result, week);
  const countRef = useRef(0);
  const [data, setData] = useState({
    labels: ["긍정정서", "몰입", "관계", "의미", "성취", "활력"],
    datasets: [
      {
        label: "이번 주",
        data: [10, 10, 1, 10, 10, 10],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
        borderWidth: 2,
      },
      {
        label: "지난 주",
        data: [10, 10, 8, 8, 9, 10],
        borderDash: [5, 5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        // datalabels: {
        //   align: "start",
        //   anchor: "start",
        // },
      },
    ],
  });
  useEffect(() => {
    if (week === 0) {
      const obj = {
        ...data,
        datasets: [data.datasets[0]],
      };
      obj.datasets[0].data = result[0].slice(2, 8);
      setData(obj);
    }
    // else if (week === 4) {
    //   const obj = {
    //     ...data,
    //   };

    //   obj.datasets[0].data = result[week].slice(2, 8);
    //   obj.datasets[1].data = result[week - 1].slice(2, 8);
    //   console.log(obj);
    //   setData(obj);
    // }
    else {
      const obj = {
        ...data,
      };

      obj.datasets[0].data = result[week].slice(2, 8);
      obj.datasets[1].data = result[week - 1].slice(2, 8);
      console.log(obj);
      setData(obj);
    }
    // setData();
  }, []);
  return (
    <Container>
      <Line options={options} data={data} height={400} />
    </Container>
  );
}
