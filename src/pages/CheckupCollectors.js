import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  getCollectorRecipientsByCollectorId,
  getMaumCheckupNameWithResponses,
  getMaumCheckupResponses,
  getRecipients,
} from "../api";
import { checkupCollectorResponseListAtom, checkupResultAtom } from "../atom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  padding: 0 40px;
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
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px;
  width: 120px;
  cursor: pointer;
  border: none;
  background-color: #ff812c;
  color: white;
  font-weight: bold;
`;

function CheckupCollectors() {
  const { projectId } = useParams();
  const {
    state: { collectors },
  } = useLocation();
  const navigate = useNavigate();
  // const [checkupResponse, setCheckupResponse] =
  //   useRecoilState(checkupResultAtom);
  const [checkupCollectorResponses, setCheckupCollectorResponses] =
    useRecoilState(checkupCollectorResponseListAtom);
  console.log("Checkup Collectors State =>", projectId, collectors);
  const [recipients, setRecipients] = useState({});
  const [weeklyResponses, setWeeklyResponses] = useState([]);
  const countRef = useRef(0);

  useEffect(() => {
    console.log(checkupCollectorResponses);
    async function fetchData() {
      const data = [];
      for await (const collector of collectors) {
        const res = await getMaumCheckupNameWithResponses(collector.id);
        data.push(res);
      }

      console.log(data);
      setWeeklyResponses(data);
      setCheckupCollectorResponses({ result: data });
      // const data = await getMaumCheckupNameWithResponses(projectId);
      // setCheckupResponse({
      //   ...checkupResponse,
      //   result: data,
      // });
      // setRecipients(data);
    }
    if (countRef.current === 0) {
      if (checkupCollectorResponses.result.length === 0) {
        fetchData();
        countRef.current += 1;
      }
    }
    if (process.env.NODE_ENV !== "development") {
      fetchData();
    }
    console.log(
      "CheckupCollector useEffect =>",
      checkupCollectorResponses.result
    );
  }, []);

  const handleClick = (id, index) => {
    console.log(
      index,
      checkupCollectorResponses.result.slice(index - 1, index + 1)
    );
    navigate(id, {
      state: {
        week: index,
        result: checkupCollectorResponses.result,
      },
    });
  };

  const handleSendReportClick = async (collectorId, index) => {
    console.log(
      projectId,
      collectorId,
      checkupCollectorResponses.result[index]
    );
    console.log("Save to DB");
    const response = await axios.post(
      "http://localhost:8080/checkup",
      JSON.stringify({
        projectId,
        collectorId,
        week: index + 1,
        data: checkupCollectorResponses.result[index],
      }),
      {
        headers: { "Content-Type": "Application/json" },
      }
    );
    console.log(response.data);

    console.log("Send Report");
  };
  // console.log("Checkup Detail => ", checkupResponse);
  return (
    <Container>
      <Title>{projectId}</Title>
      <List>
        {collectors.length < 1
          ? "데이터가 없습니다"
          : collectors.map((collector, index) => (
              <Item key={collector.id}>
                <Column>
                  {index + 1}주차 리포트 (
                  {checkupCollectorResponses.result.length !== 0 &&
                    Object.keys(checkupCollectorResponses.result[index]).length}
                  )
                </Column>
                <Column>
                  <Button onClick={() => handleClick(collector.id, index)}>
                    상세보기
                  </Button>
                </Column>
                <Column>
                  <Button
                    onClick={() => handleSendReportClick(collector.id, index)}
                  >
                    리포트 전체 발송
                  </Button>
                </Column>
              </Item>
            ))}
        {/* {Object.keys(checkupResponse.result).length > 0 &&
          Object.keys(checkupResponse.result).map((item, index) => {
            return (
              <Item key={index}>
                <Column>
                  <span>{item}</span>
                  <span>{checkupResponse.result[item][0][1]}</span>
                </Column>
                <Column>
                  <Button onClick={() => handleClick(item, state.week)}>
                    {state.week < 4
                      ? `${state.week + 1}주차 리포트`
                      : "월간 리포트"}
                  </Button>
                </Column>
                {[0, 1, 2, 3, 4].map((week) => (
                  <Column key={week}>
                    <Button onClick={() => handleClick(item, week)}>
                      {week < 4 ? `${week + 1}주차 리포트` : "월간 리포트"}
                    </Button>
                  </Column>
                ))}
              </Item>
            );
          })} */}
      </List>
    </Container>
  );
}

export default CheckupCollectors;
