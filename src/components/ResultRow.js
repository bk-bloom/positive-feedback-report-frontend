import styled from "styled-components";

const Container = styled.div`
  width: auto;
  border: 1px solid #e2e2e2;
  margin: 5px 0;
  display: flex;
  height: 60px;
  justify-content: flex-start;
`;

const Column = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10px;
  //   margin: 0 10px;
  &:nth-child(1) {
    flex: 1;
  }
  &:last-child {
    align-items: flex-end;
  }
  // border: 1px solid black;
`;

const Label = styled.span`
  font-size: 12px;
  color: #888888;
`;

const Text = styled.span`
  // font-size: 12px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: #ff812c;
  color: white;
`;

function ResultRow({ name, data, surveyInfo, handler }) {
  return (
    <Container>
      <Column>
        <Label>피평가자</Label>
        <Text>{name}</Text>
      </Column>

      <Column>
        <Label>응답자 수</Label>
        <Text>{data.responseCount}</Text>
      </Column>
      <Column>
        <Label>설문 종류</Label>
        <Text>{surveyInfo.name}</Text>
      </Column>
      <Column>
        <Button onClick={() => handler(name)}>리포트 생성하기</Button>
      </Column>
    </Container>
  );
}

export default ResultRow;
