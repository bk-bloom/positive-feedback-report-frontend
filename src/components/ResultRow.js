import styled from "styled-components";

const Container = styled.div`
  width: auto;
  border: 1px solid #e2e2e2;
  padding: 5px 20px;
  margin: 5px 0;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: flex-start;
`;

const Column = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  //   border: 1px solid black;
  padding: 0 10px;
  //   margin: 0 10px;
  &:nth-child(1) {
    flex: 1;
  }
`;

const Label = styled.span`
  font-size: 10px;
  color: #888888;
`;

const Text = styled.span`
  font-size: 12px;
`;

function ResultRow({ name, data, surveyInfo, handler }) {
  return (
    <Container onClick={() => handler(name)}>
      <Column>
        <Label>이름</Label>
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
    </Container>
  );
}

export default ResultRow;
