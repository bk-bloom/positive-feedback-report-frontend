import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
function Wordcloud({ data }) {
  const divRef = useRef();
  const list = [];
  for (let i = 0; i < data.length; i++) {
    list.push([data[i][0], data[i][1]]);
  }
  list.slice(0, 3).forEach((d) => {
    d[1] *= 10;
  });
  //   console.log(list);
  useEffect(() => {
    WordCloud(divRef.current, {
      list,
      color: "random-dark",
      shape: "square",
      gridSize: 20,
      minSize: 1,
      weightFactor: 7,
      shrinkToFit: true,
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
