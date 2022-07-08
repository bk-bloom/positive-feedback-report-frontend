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
      //   const response = await getRecipients(id);

      //   const response = {
      //     "bk.kang@bloomhappiness.com": {
      //       7131683027: [],
      //       7131683029: [],
      //       7131683031: [],
      //       7131683033: [],
      //     },
      //     "g.kangksw@gmail.com": {
      //       7131683028: [],
      //       7131683030: [],
      //       7131683032: [],
      //       7131683034: [],
      //     },
      //   };
      const data = await getMaumCheckupNameWithResponses(id);
      //   const data = await getMaumCheckupResponses(id);
      //   for (let i = 0; i < data.length; i++) {
      //     const recipientId = Object.keys(data[i])[0];
      //     for (const email in response) {
      //       if (response[email][recipientId].length === 0) {
      //         response[email][recipientId].push(...data[i][recipientId]);
      //         break;
      //       }
      //     }
      //   }
      console.log(data);
      //   console.log(response);
      setCheckupResponse({
        ...checkupResponse,
        result: data,
      });
      setRecipients(data);
      //   console.log("fetch end");
    }
    if (countRef.current === 0) {
      console.log(Object.keys(checkupResponse.result).length);
      if (!Object.keys(checkupResponse.result).length > 0) {
        fetchData();
      }
      //   console.log("useEffect in development!");
      countRef.current += 1;
    }
    if (process.env.NODE_ENV !== "development") {
      fetchData();
      //   console.log("useEffect in production!");
    }
    // console.log("useEffect End");
  }, []);

  const handleClick = (name, day) => {
    // console.log(checkupResponse.result[name][day]);
    navigate("report", {
      state: {
        name,
        day: day + 1,
        result: checkupResponse.result[name][day],
      },
    });
  };
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
              {[0, 1, 2, 3, 4].map((day) => (
                <Column key={day}>
                  <Button onClick={() => handleClick(name, day)}>
                    {day < 4 ? `${day + 1}주차 리포트` : "월간 리포트"}
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
