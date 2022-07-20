import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  // border: 1px solid black;
`;
function Wordcloud({ data, type }) {
  const divRef = useRef();
  const list = [];
  for (let i = 0; i < data.length; i++) {
    list.push([data[i][0], data[i][1]]);
  }
  list.forEach((d) => (d[1] = 1));
  list.slice(0, 3).forEach((d) => {
    d[1] *= 9;
  });
  console.log(list);
  useEffect(() => {
    let i = 0;
    WordCloud(divRef.current, {
      list,
      color: (word, weight, fontsize, distance, theta) => {
        i++;
        if (weight > 1 && i === 1) {
          return type === "strength" ? "#ffc842" : "#7ca1d4";
        } else if (weight > 1 && i === 2) {
          return type === "strength" ? "#dae233" : "#b782b9";
        } else if (weight > 1 && i === 3) {
          return type === "strength" ? "#00c0e0" : "#ed2b2b";
        } else {
          return "random-dark";
        }
      },
      shape: "square",
      gridSize: 20,
      minSize: 1,
      weightFactor: 7,
      // shrinkToFit: true,
      drawOutOfBound: false,
      origin: [0, 0],
      rotateRatio: 0,
    });
  }, []);
  return (
    <Container>
      <div
        id="canvas"
        style={{
          width: "300px",
          height: "180px",
          //   borderWidth: "1",
          //   borderColor: "black",
          //   borderStyle: "solid",
          padding: "25px",
        }}
        ref={divRef}
      ></div>
    </Container>
  );
}

export default Wordcloud;
