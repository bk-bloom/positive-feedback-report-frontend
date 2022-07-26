import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMaumCheckupNameWithResponses,
  loadResponsesFromDB,
  saveResponsesToDB,
  updateMailchimpStatus,
} from "../api";
import FlexRow from "../components/FlexRow";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  padding: 0 40px;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
`;

const Item = styled.div`
  width: 180px;
  height: 180px;
  margin: 10px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.3);
`;

const ItemTitle = styled.span`
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
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
    state: { collectors, projectTitle, projectSendReportDates },
  } = useLocation();
  const navigate = useNavigate();

  const [checkupCollectorResponses, setCheckupCollectorResponses] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");

  const countRef = useRef(0);

  const getCheckupResults = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/checkup/results`,
      {
        params: {
          id: projectId,
          collectors,
        },
      }
    );
    setCheckupCollectorResponses(response.data);
    setIsLoading(false);
  };

  async function getResponses() {
    setIsLoading(true);
    // Get Data from SurveyMonkey
    // const data = []; // [{email: [1주차 답변], email2: [1주차 답변]}, {2주차 답변}, {3주차 답변}, {4주차 답변}]
    const data = await getMaumCheckupNameWithResponses(collectors);

    // Save To DB
    const response = await saveResponsesToDB(data, projectId);

    window.localStorage.setItem("isResponsesLoaded", true);
    setCheckupCollectorResponses(data);

    // setLastUpdate(
    //   `${new Date().getFullYear()}-${
    //     new Date().getMonth() + 1
    //   }-${new Date().getDate()}   ${new Date().toTimeString().split(" ")[0]}`
    // );
    setIsLoading(false);
  }

  useEffect(() => {
    // console.log(checkupCollectorResponses);
    async function fetchData() {
      // Get Data from SurveyMonkey
      // const data = []; // [{email: [1주차 답변], email2: [1주차 답변]}, {2주차 답변}, {3주차 답변}, {4주차 답변}]
      // const data = await getMaumCheckupNameWithResponses(
      //   collectors.map((collector) => collector.id)
      // );
      // console.log(data);

      // // Save To DB
      // const response = await saveResponsesToDB(data, projectId);

      // window.localStorage.setItem("isResponsesLoaded", true);
      // setCheckupCollectorResponses(data);
      // setLastUpdate(new Date().toTimeString().split(" ")[0]);
      // setIsLoading(false);
      // await getResponses();
      await getCheckupResults();
    }
    async function fetchDataFromDB() {
      setIsLoading(true);
      const responses = await loadResponsesFromDB();
      setCheckupCollectorResponses(responses);
      setIsLoading(false);
    }
    if (process.env.NODE_ENV === "development") {
      if (countRef.current === 0) {
        if (!window.localStorage.getItem("isResponsesLoaded")) {
          fetchData();
        } else {
          // Load Data from DB
          // fetchDataFromDB();
          fetchData();
        }
        countRef.current += 1;
      }
      return;
    }

    if (!window.localStorage.getItem("isResponsesLoaded")) {
      fetchData();
    } else {
      // Load Data from DB
      fetchDataFromDB();
    }
  }, []);

  const handleClick = (id, index) => {
    navigate(id, {
      state: {
        week: index,
        results: checkupCollectorResponses,
        collectors: collectors.slice(0, index + 1),
      },
    });
  };

  const handleRefreshClick = async () => {
    // await getResponses();
    await getCheckupResults();
  };

  const handleSendReportClick = async (collectorId, index) => {
    //   setIsLoading(true);
    //   let emails = [];
    //   if (index === 3) {
    //     for (let i = 0; i < checkupCollectorResponses.length; i++) {
    //       for (const email of Object.keys(checkupCollectorResponses[i])) {
    //         if (!emails.includes(email)) {
    //           emails.push(email);
    //         }
    //       }
    //     }
    //   } else {
    //     emails = Object.keys(checkupCollectorResponses[index]);
    //   }
    //   const response = await updateMailchimpStatus(index, emails);
    setIsLoading(false);
    console.log(
      `Send Report at, ${new Date(
        projectSendReportDates[index]
      ).toLocaleString()}`
    );
  };
  console.log(checkupCollectorResponses);
  return (
    <Container>
      <Wrapper>
        <FlexRow
          type={{ "justify-content": "space-between", "align-items": "center" }}
        >
          <Title>
            [{projectId}] {projectTitle}
          </Title>
        </FlexRow>
        <Button
          style={{
            height: "40px",
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            color: "#ff812c",
            width: "80px",
          }}
          onClick={handleRefreshClick}
        >
          새로고침
        </Button>
        {/* <span>마지막 업데이트: {lastUpdate}</span> */}
        <List>
          {collectors.length < 1
            ? "데이터가 없습니다"
            : collectors.map((collector, index) => (
                <Item key={collector}>
                  <Column>
                    <ItemTitle>{index + 1}주차 리포트</ItemTitle>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        color: "#777777",
                      }}
                    >
                      [
                      {checkupCollectorResponses.length !== 0 &&
                        checkupCollectorResponses.filter(
                          (r) => r.collectorId === collector
                        ).length}
                      명 응답]
                    </span>
                  </Column>
                  <Column>
                    <Button onClick={() => handleClick(collector, index)}>
                      상세보기
                    </Button>
                    <Button
                      onClick={() => handleSendReportClick(collector, index)}
                    >
                      리포트 예약 발송
                    </Button>
                  </Column>
                </Item>
              ))}
        </List>
      </Wrapper>
      {isLoading && (
        <Modal>
          <Loading message="로딩중..." />
        </Modal>
      )}
    </Container>
  );
}

export default CheckupCollectors;
