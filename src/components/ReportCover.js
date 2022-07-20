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
  width: 793.7007874px;
  height: 1122.519685px;
  background-color: #ff812c;
  color: white;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 66.5px;
  padding-top: 76.6px;
  position: relative;
`;

const Logo = styled.img`
  width: 102.8px;
  height: 31.5px;
  margin: 0 412.7px 70.9px 0;
  object-fit: contain;
`;

const ColumnLeft = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;

const Title = styled.p`
  width: 324px;
  height: 122px;
  margin: 0 4.9px 13px 0.1px;
  font-family: PretendardVariable;
  font-size: 52px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: -2.08px;
  text-align: left;
  color: #fff;
`;

const Phrase = styled.p`
  width: 307px;
  height: 19px;
  margin: 0 19.9px 59px 0.1px;
  opacity: 0.8;
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: 0.48px;
  text-align: left;
  color: #fff;
`;

const SubTitle = styled.span`
  width: 264px;
  height: 59px;
  margin: 0 62.9px 41.5px 0.1px;
  font-family: PretendardVariable;
  font-size: 22px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.88px;
  text-align: left;
  color: #fff;
`;

const Border = styled.div`
  width: 327px;
  height: 0;
  margin: 0 0;
  border: solid 5px #fff;
`;

const ColumnRight = styled(ColumnLeft)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NameContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 60.7px 86.7px 0;
`;
const Name = styled.span`
  width: 113px;
  height: 53px;
  margin: 0 12px 0 0;
  font-family: PretendardVariable;
  font-size: 45px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: -1.8px;
  text-align: left;
  color: #fff;
`;

const Span = styled.span`
  width: 26px;
  height: 35px;
  font-family: PretendardVariable;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

function ReportCover({ name }) {
  return (
    <Container>
      {/* <HeaderTopContainer>
        {COLORS.map((color, index) => (
          <HeaderTopBorder key={index} bgColor={color} />
        ))}
      </HeaderTopContainer> */}
      <Wrapper>
        <Logo
          src={`${process.env.PUBLIC_URL}/assets/positive-feedback-cover-logo3x.png`}
        />

        <Title>
          긍정 피드백
          <br />
          설문 결과 리포트
        </Title>
        <Phrase>Positive Feedback Survey Results Report</Phrase>

        <SubTitle>
          두산공작기계 차장승진자를 위한
          <br />
          <b style={{ "font-weight": "500" }}>갈등관리 리더십 과정</b>
        </SubTitle>
        <Border />

        <NameContainer>
          <Name>{name}</Name>
          <Span>님</Span>
        </NameContainer>
      </Wrapper>
    </Container>
  );
}

export default ReportCover;
