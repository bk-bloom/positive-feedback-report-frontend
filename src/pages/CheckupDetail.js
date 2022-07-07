import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  getCollectorRecipientsByCollectorId,
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
  cursor: pointer;
`;

function CheckupDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useRecoilState(checkupResultAtom);

  const [recipients, setRecipients] = useState({});
  const countRef = useRef(0);

  useEffect(() => {
    async function fetchData() {
      //   const response = await getRecipients(id);

      const response = {
        "bk.kang@bloomhappiness.com": {
          7131683027: [],
          7131683029: [],
          7131683031: [],
          7131683033: [],
        },
        "g.kangksw@gmail.com": {
          7131683028: [],
          7131683030: [],
          7131683032: [],
          7131683034: [],
        },
      };

      const data = await getMaumCheckupResponses(id);
      for (let i = 0; i < data.length; i++) {
        const recipientId = Object.keys(data[i])[0];
        for (const email in response) {
          if (response[email][recipientId].length === 0) {
            response[email][recipientId].push(...data[i][recipientId]);
            break;
          }
        }
      }
      console.log(response);
      setResult({
        ...result,
        result: response,
      });
      setRecipients(response);
      //   console.log("fetch end");
    }
    if (countRef.current === 0) {
      console.log(Object.keys(result.result).length);
      if (!Object.keys(result.result).length > 0) {
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

  const handleClick = (email) => {
    navigate("report", {
      state: {
        email,
        result: result.result[email],
      },
    });
  };
  console.log(result);
  return (
    <Container>
      <Title>{state.name}</Title>
      <List>
        {Object.keys(result.result).length > 0 &&
          Object.keys(result.result).map((email, index) => (
            <Item key={index} onClick={() => handleClick(email)}>
              {email}
            </Item>
          ))}
      </List>
    </Container>
  );
}

export default CheckupDetail;
