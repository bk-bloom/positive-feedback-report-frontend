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

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Item = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
`;

const Column = styled.div`
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
  console.log(useParams());
  const {
    state: { week, results, collectors },
  } = useLocation();
  const navigate = useNavigate();
  //   const [checkupResponse, setCheckupResponse] =
  //     useRecoilState(checkupResultAtom);
  const [responses, setResponses] = useState();
  const countRef = useRef(0);

  // console.log("Checkup Detail State =>", week, results);

  const getCheckupResponseFromDB = async (email) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/checkup?email=${email}`
    );
    return response.data[0];
  };

  const handleClick = async (email) => {
    const dest = [];

    for (let i = 0; i <= week; i++) {
      let isExist = false;
      for (let j = 0; j < results.length; j++) {
        if (
          results[j].collectorId === collectors[i] &&
          results[j].email === email
        ) {
          isExist = true;
          dest.push(results[j]);
          break;
        }
      }
      if (!isExist) {
        dest.push(null);
      }
    }

    navigate("report", {
      state: {
        email,
        week,
        result: dest,
      },
    });
  };

  // console.log("Checkup Detail => ", checkupResponse);
  return (
    <Container>
      <Title>{week + 1}주차 리포트</Title>
      <List>
        {results
          .filter((r) => r.collectorId === collectorId)
          .map((result, index) => {
            return (
              <Item key={index}>
                <Column>
                  <span>{result.name}</span>
                  <span>{result.email}</span>
                </Column>
                <Column>
                  <Button onClick={() => handleClick(result.email)}>
                    {/* <Button onClick={() => getCheckupResponseFromDB(email)}> */}
                    리포트 보기
                  </Button>
                </Column>
              </Item>
            );
          })}
      </List>
    </Container>
  );
}

export default CheckupDetail;
