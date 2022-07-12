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
import { checkupResultAtom } from "../atom";

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
  width: 100px;
  cursor: pointer;
  border: none;
  background-color: #ff812c;
  color: white;
  font-weight: bold;
`;

function CheckupDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [checkupResponse, setCheckupResponse] =
    useRecoilState(checkupResultAtom);

  const [recipients, setRecipients] = useState({});
  const countRef = useRef(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getMaumCheckupNameWithResponses(id);

      setCheckupResponse({
        ...checkupResponse,
        result: data,
      });
      setRecipients(data);
    }
    if (countRef.current === 0) {
      if (!Object.keys(checkupResponse.result).length > 0) {
        fetchData();
      }
      countRef.current += 1;
    }
    if (process.env.NODE_ENV !== "development") {
      fetchData();
    }
  }, []);

  const handleClick = (name, week) => {
    navigate("report", {
      state: {
        name,
        week,
        result: checkupResponse.result,
      },
    });
  };
  //   console.log("Checkup Detail => ", checkupResponse);
  return (
    <Container>
      <Title>{state.name}</Title>
      <List>
        {Object.keys(checkupResponse.result).length > 0 &&
          Object.keys(checkupResponse.result).map((name, index) => (
            <Item key={index}>
              <Column>
                <span>
                  {name} ({checkupResponse.result[name].length})
                </span>
              </Column>
              {[0, 1, 2, 3, 4].map((week) => (
                <Column key={week}>
                  <Button onClick={() => handleClick(name, week)}>
                    {week < 4 ? `${week + 1}주차 리포트` : "월간 리포트"}
                  </Button>
                </Column>
              ))}
            </Item>
          ))}
      </List>
    </Container>
  );
}

export default CheckupDetail;
