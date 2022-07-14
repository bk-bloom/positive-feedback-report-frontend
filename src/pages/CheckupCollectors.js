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
  width: 100%;
`;

const Item = styled.div`
  width: 150px;
  height: 150px;
  margin: 10px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.3);
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #ff812c;
  color: white;
  font-weight: bold;
  margin-top: 5px;
  &:hover {
    // color: #ff812c;
    // background-color: rgba(255, 129, 44, 0.4);
    // color: white;

    // box-shadow: 0px 0px 6px -1px #ff812c;
  }
  // transition: all 0.2s;
`;

function CheckupCollectors() {
  const { projectId } = useParams();
  const {
    state: { collectors },
  } = useLocation();
  const navigate = useNavigate();

  const [checkupCollectorResponses, setCheckupCollectorResponses] =
    useRecoilState(checkupCollectorResponseListAtom);
  const [isLoading, setIsLoading] = useState(false);

  const countRef = useRef(0);

  useEffect(() => {
    console.log(checkupCollectorResponses);
    async function fetchData() {
      // const data = []; // [{email: [1주차 답변], email2: [1주차 답변]}, {2주차 답변}, {3주차 답변}, {4주차 답변}]
      const data = await getMaumCheckupNameWithResponses(
        collectors.map((collector) => collector.id)
      );
      console.log(data);
      setCheckupCollectorResponses({ result: data });
      setIsLoading(false);
      console.log("loading end");
    }
    if (process.env.NODE_ENV === "development") {
      if (countRef.current === 0) {
        if (checkupCollectorResponses.result.length === 0) {
          console.log("loading");
          setIsLoading(true);
          fetchData();
          countRef.current += 1;
        }
      }
    } else if (process.env.NODE_ENV !== "development") {
      console.log("loading");
      setIsLoading(true);
      fetchData();
    }
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
    const response = await axios.post(
      "http://localhost:8080/checkup/email",
      JSON.stringify({
        week: index + 1,
        data: Object.keys(checkupCollectorResponses.result[index]),
      }),
      {
        headers: { "Content-Type": "Application/json" },
      }
    );
    console.log(response);
    // console.log("Save to DB");
    // const response = await axios.post(
    //   "http://localhost:8080/checkup",
    //   JSON.stringify({
    //     projectId,
    //     collectorId,
    //     week: index + 1,
    //     data: checkupCollectorResponses.result[index],
    //   }),
    // {
    //   headers: { "Content-Type": "Application/json" },
    // }
    // );
    // console.log(response.data);

    console.log("Send Report");
  };
  // console.log("Checkup Detail => ", checkupResponse);
  return (
    <Container>
      <Title>{projectId}</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <List>
          {collectors.length < 1
            ? "데이터가 없습니다"
            : collectors.map((collector, index) => (
                <Item key={collector.id}>
                  <Column>
                    {index + 1}주차 리포트 (
                    {checkupCollectorResponses.result.length !== 0 &&
                      Object.keys(checkupCollectorResponses.result[index])
                        .length}
                    )
                  </Column>
                  <Column>
                    <Button onClick={() => handleClick(collector.id, index)}>
                      상세보기
                    </Button>
                    <Button
                      onClick={() => handleSendReportClick(collector.id, index)}
                    >
                      리포트 전체 발송
                    </Button>
                  </Column>
                </Item>
              ))}
        </List>
      )}
    </Container>
  );
}

export default CheckupCollectors;
