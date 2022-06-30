import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { findCollector, getCollectorsResponseInBulkByCollectorId } from "./api";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 280px;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

const Logo = styled.img`
  width: 300px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 32px;
`;

const InputContainer = styled.div`
  margin-top: 100px;
  display: flex;
`;

const Input = styled.input`
  width: 500px;
  padding: 15px;
  font-size: 18px;
  border: 1px solid #e2e2e2;
  &:focus {
    outline: none;
    border: 1px solid #ff812c;
  }
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

const FloatingButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff812c;
  color: white;
  position: fixed;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  border-radius: 25px;
  // border: 1px solid black;
  font-size: 24px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const ResultRow = styled.div`
  width: 100%;
  border: 1px solid #e2e2e2;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
`;

function App() {
  const [name, setName] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [receivers, setReceivers] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSurveyNameChange = (e) => {
    setSurveyName(e.target.value);
  };
  const handleClick = () => {
    navigate("/report", { state: { name } });
  };
  const handleSurveyNameClick = async () => {
    const collector = await findCollector(surveyName);
    if (!collector) {
      console.log("검색 결과 없습니다.");
    }

    const responses = await getCollectorsResponseInBulkByCollectorId(
      collector[0].id
    );

    if (responses) {
      setReceivers(responses);
    }
    // navigate("/report", { state: { name } });
  };

  const handleReceiverClick = (key) => {
    navigate("/report", { state: { name: key, data: receivers[key] } });
  };
  return (
    <Container>
      <Wrapper>
        <Logo src="./assets/logo.png" />
        <Title>긍정 피드백 리포트</Title>
        {/* <InputContainer>
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            onChange={handleChange}
          />
          <Button onClick={handleClick}>검색</Button>
        </InputContainer> */}
        <InputContainer>
          <Input
            type="text"
            placeholder="설문 이름을 입력하세요"
            onChange={handleSurveyNameChange}
          />
          <Button onClick={handleSurveyNameClick}>검색</Button>
        </InputContainer>
        <ResultContainer>
          {Object.keys(receivers).length > 0 &&
            Object.keys(receivers).map((name, index) => (
              <ResultRow key={index} onClick={() => handleReceiverClick(name)}>
                {name} - ({receivers[name].responseCount})
              </ResultRow>
            ))}
        </ResultContainer>
      </Wrapper>
      <FloatingButton>+</FloatingButton>
    </Container>
  );
}

export default App;
