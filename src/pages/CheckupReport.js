import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Chart } from "../components/Chart";
import { RadarChart } from "../components/RadarChart";

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
    state: { name, day, result },
  } = useLocation();

  return (
    <Container>
      <Title>
        {name}님의 {day}주차 마음체크업 리포트입니다
      </Title>
      <List>
        <Item>
          {result.map((answer, index) => (
            <Column key={index}>{answer}</Column>
          ))}
        </Item>
      </List>
      {/* <Chart /> */}
      <RadarChart />
    </Container>
  );
}

export default CheckupReport;
