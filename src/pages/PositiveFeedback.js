import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  findCollector,
  getCollectorsResponseInBulkByCollectorId,
} from "../api";
import { searchResultAtom } from "../atom";
import HeadSection from "../components/HeadSection";
import Loading from "../components/Loading";
import ResultTable from "../components/ResultTable";

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

function PositiveFeedback() {
  // const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useRecoilState(searchResultAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);

  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setName(e.target.value);
  // };

  const handleSurveyNameChange = (e) => {
    setSearchResult({
      keyword: e.target.value,
      surveyInfo: {},
      result: {},
    });
    setIsSearchDone(false);
  };
  // const handleClick = () => {
  //   navigate("/report", { state: { name } });
  // };
  const handleSurveyNameClick = async () => {
    setIsLoading(true);
    const collector = await findCollector(searchResult.keyword);
    if (!collector) {
      console.log("?????? ?????? ????????????.");
      setIsLoading(false);
      setIsSearchDone(true);
      return;
    }

    const responses = await getCollectorsResponseInBulkByCollectorId(
      collector[0].id
    );

    if (responses) {
      setSearchResult({
        keyword: searchResult.keyword,
        surveyInfo: {
          name: collector[0].name,
          id: collector[0].id,
        },
        result: responses,
      });
    }
    setIsLoading(false);
    setIsSearchDone(true);
  };

  console.log("Search Atom => ", searchResult);
  return (
    <Container>
      <Wrapper>
        <HeadSection title="?????? ????????? ?????????" />
        {/* <InputContainer>
          <Input
            type="text"
            placeholder="????????? ???????????????"
            onChange={handleChange}
          />
          <Button onClick={handleClick}>??????</Button>
        </InputContainer> */}
        <InputContainer>
          <Input
            type="text"
            placeholder="?????? ????????? ???????????????"
            onChange={handleSurveyNameChange}
            value={searchResult.keyword}
          />
          <Button onClick={handleSurveyNameClick}>??????</Button>
        </InputContainer>
        {isLoading ? (
          <Loading message="?????????..." marginTop="100px" />
        ) : (
          <ResultTable
            searchResult={searchResult}
            isSearchDone={isSearchDone}
          />
        )}
      </Wrapper>
      {/* <FloatingButton>+</FloatingButton> */}
    </Container>
  );
}

export default PositiveFeedback;
