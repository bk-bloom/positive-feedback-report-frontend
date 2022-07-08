import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Chart } from "../components/Chart";

const Container = styled.div`
  margin-left: 280px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  &:nth-child(8),
  &:nth-child(9) {
    flex: 3;
  }
`;

function CheckupReport() {
  const {
    state: { email, result },
  } = useLocation();

  const [data, setData] = useState({});

  useEffect(() => {
    const obj = {
      prev: [],
      current: [],
    };
    setData();
  }, []);
  return (
    <Container>
      <Title>마음체크업 리포트입니다.</Title>
      <List>
        {Object.keys(result).map((id) => (
          <Item key={id}>
            {result[id].map((answer, index) => (
              <Column key={id + index}>{answer}</Column>
            ))}
          </Item>
        ))}
      </List>
      {/* <Chart /> */}
    </Container>
  );
}

export default CheckupReport;
