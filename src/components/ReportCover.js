import styled from "styled-components";

const COLORS = [
  "#CC2B69",
  "#ED2B2B",
  "#FF812C",
  "#FFC842",
  "#DAE233",
  "#00C0E0",
  "#7CA1D3",
  "#B782B9",
];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 1150px;
  background-color: #ff812c;
  color: white;
  margin-bottom: 100px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const HeaderTopContainer = styled.div`
  display: flex;
`;

const HeaderTopBorder = styled.div`
  height: 10px;
  width: 12.5%;
  background-color: ${(props) => props.bgColor};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;

const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-top: 10px;
`;

const Phrase = styled.p`
  font-weight: bold;
  margin: 0;
`;
const ColumnRight = styled(ColumnLeft)`
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

function ReportCover() {
  return (
    <Container>
      <HeaderTopContainer>
        {COLORS.map((color) => (
          <HeaderTopBorder bgColor={color} />
        ))}
      </HeaderTopContainer>
      <Wrapper>
        <TitleContainer>
          <ColumnLeft>
            <SubTitle>
              {" "}
              두산공작기계 차장승진자를 위한 갈등관리 리더십 과정
            </SubTitle>
            <Title>긍정 피드백 설문 결과</Title>
            <Phrase>
              「It takes courage to grow up and become who you really are.」 E.
              E. Cummings
            </Phrase>
          </ColumnLeft>
          <ColumnRight>
            <Name>강범규</Name>
          </ColumnRight>
        </TitleContainer>
      </Wrapper>
    </Container>
  );
}

export default ReportCover;
