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
  const { collectorId } = useParams();
  const {
    state: { week, result },
  } = useLocation();
  const navigate = useNavigate();
  //   const [checkupResponse, setCheckupResponse] =
  //     useRecoilState(checkupResultAtom);
  const [recipients, setRecipients] = useState({});
  const countRef = useRef(0);

  console.log("Checkup Detail State =>", week, result);
  useEffect(() => {
    // async function fetchData() {
    //   const data = await getMaumCheckupNameWithResponses(id);
    //   setCheckupResponse({
    //     ...checkupResponse,
    //     result: data,
    //   });
    //   setRecipients(data);
    // }
    // if (countRef.current === 0) {
    //   if (!Object.keys(checkupResponse.result).length > 0) {
    //     fetchData();
    //   }
    //   countRef.current += 1;
    // }
    // if (process.env.NODE_ENV !== "development") {
    //   fetchData();
    // }
  }, []);

  const getCheckupResponseFromDB = async (email) => {
    const response = await axios.get(
      `http://localhost:8080/checkup?email=${email}`
    );
    return response.data[0];
  };

  const handleClick = async (email, name) => {
    const response = await getCheckupResponseFromDB(email);
    console.log(response[`week1`]);
    let dest = [];

    if (response.length === 0) {
      // state로 리포트 생성
      console.log("Data from State!");
      for (let i = 0; i <= week; i++) {
        dest.push(result[i][email]);
      }
    } else {
      // DB 데이터로 리포트 생성
      console.log("Data from DB!");
      if (week === 0) {
        dest = [response[`week${week + 1}`]];
      } else {
        dest = [response[`week${week}`], response[`week${week + 1}`]];
      }
    }
    console.log(dest);
    navigate("report", {
      state: {
        name,
        week,
        result: dest,
      },
    });
  };
  //   console.log("Checkup Detail => ", checkupResponse);
  return (
    <Container>
      <Title>{week + 1}주차 리포트</Title>
      <List>
        {Object.keys(result[week === 0 ? 0 : 1]).length > 0 &&
          Object.keys(result[week === 0 ? 0 : 1]).map((email, index) => {
            console.log(result[week === 0 ? 0 : 1][email]);
            return (
              <Item key={index}>
                <Column>
                  <span>{result[0][email][0]}</span>
                  <span>{result[0][email][1]}</span>
                </Column>
                <Column>
                  <Button
                    onClick={() =>
                      handleClick(email, result[week === 0 ? 0 : 1][email][0])
                    }
                  >
                    {/* <Button onClick={() => getCheckupResponseFromDB(email)}> */}
                    리포트 보기
                  </Button>
                </Column>
                {/* {[0, 1, 2, 3, 4].map((week) => (
                  <Column key={week}>
                    <Button onClick={() => handleClick(item, week)}>
                      {week < 4 ? `${week + 1}주차 리포트` : "월간 리포트"}
                    </Button>
                  </Column>
                ))} */}
              </Item>
            );
          })}
      </List>
    </Container>
  );
}

export default CheckupDetail;
