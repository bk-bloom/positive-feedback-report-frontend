import styled from "styled-components";
import ResultRow from "./ResultRow";
import { sortByName } from "../utils";
import { useNavigate } from "react-router-dom";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const ResultCount = styled.span`
  margin-bottom: 15px;
`;

function ResultTable({ isSearchDone, searchResult }) {
  const navigate = useNavigate();

  const handleReceiverClick = (key) => {
    navigate("/positive/report", {
      state: { name: key, data: searchResult.result[key] },
    });
  };
  return (
    <ResultContainer>
      {isSearchDone && (
        <ResultCount>
          검색 결과: {Object.keys(searchResult.result).length}
        </ResultCount>
      )}
      {Object.keys(searchResult.result).length > 0 &&
        Object.keys(searchResult.result)
          .sort(sortByName)
          .map((name, index) => (
            <ResultRow
              key={index}
              handler={handleReceiverClick}
              name={name}
              surveyInfo={searchResult.surveyInfo}
              data={searchResult.result[name]}
            >
              {name} - ({searchResult.result[name].responseCount})
            </ResultRow>
          ))}
    </ResultContainer>
  );
}

export default ResultTable;
