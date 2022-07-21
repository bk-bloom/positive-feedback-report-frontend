import styled from "styled-components";

const Container = styled.section``;

const SectionSubTitle = styled.h3`
  margin: 0 0 24px 1px;
  font-family: PretendardVariable;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.72px;
  text-align: left;
  color: #010101;
`;
const P = styled.p`
  margin: 0 10px 28px;
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.54px;
  color: #333;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 190px);
  gap: 66px;
`;

const GridItem = styled.div`
  /* padding: 20px 0 21px 16px; */
  /* background-color: #f8f8f8; */
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* border: 1px solid black; */
`;

const GridIcon = styled.img`
  width: 67px;
  height: 67px;
  margin: 0 7px 15px 0;
  object-fit: contain;
`;

const GridText = styled.div`
  display: flex;
  flex-direction: column;
  height: 43px;
  /* margin: 0 29px 0 0; */
  font-family: PretendardVariable;
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: -0.51px;
  text-align: left;
  color: #333;
`;

const GridWordBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 11px;
`;
const GridWord = styled.span`
  /* width: 67px; */
  /* height: 24px; */
  /* margin: 0 7px 11px 0; */
  margin-right: 7px;
  font-family: PretendardVariable;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 1.2; */
  letter-spacing: -0.6px;
  text-align: left;
  color: #333;
`;

const GridWordHighlight = styled.span`
  /* width: 106px; */
  /* height: 15px; */
  /* margin: 0 0 12px 0; */
  font-family: PretendardVariable;
  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2.31; */
  letter-spacing: normal;
  text-align: left;
`;

const Span = styled.span`
  // font-size: 1.1rem;
`;

function CheckupArea() {
  const data = [
    {
      icon: `${process.env.PUBLIC_URL}/assets/positive-icon3x.png`,
      text: "기쁨, 감사, 평온과 같은\n기분 좋은 정서",
      word: "긍정정서 Positive Emotions",
      color: "#ffc842",
    },
    {
      icon: `${process.env.PUBLIC_URL}/assets/engagement-icon3x.png`,
      text: "어떤 활동에 푹 빠져서\n시간 가는 줄 모르는 경험",
      word: "몰입 Engagement",
      color: "#dae233",
    },
    {
      icon: `${process.env.PUBLIC_URL}/assets/relationship-icon3x.png`,
      text: "마음을 주고받을 수 있는\n사람들과 연결되어 있는 상태",
      word: "관계 Relationships",
      color: "#ff812c",
    },
    {
      icon: `${process.env.PUBLIC_URL}/assets/meaning-icon3x.png`,
      text: "삶의 목적을 알고\n그것을 추구하는 것",
      word: "의미 Meaning",
      color: "#00c0e0",
    },
    {
      icon: `${process.env.PUBLIC_URL}/assets/accomplishment-icon3x.png`,
      text: "목표를 위해 노력하고\n그 자체에 즐거움을 느끼는 것",
      word: "성취 Accomplishment",
      color: "#b782b9",
    },
    {
      icon: `${process.env.PUBLIC_URL}/assets/vitality-icon3x.png`,
      text: "건강한 몸과 마음을\n잘 돌보는 것",
      word: "활력 Vitality",
      color: "#ed2b2b",
    },
  ];
  return (
    <Container>
      <SectionSubTitle>
        📌 마음 리포트에서 살펴보는 마음 건강 영역
      </SectionSubTitle>
      <P>
        마음 리포트는 마틴 셀리그먼의 PERMA 웰빙 모델에 활력(Vitality)를
        추가하여 직장인 일상의 멘탈웰빙을 체크하고 있습니다.
      </P>
      <GridContainer>
        {data.map((item, index) => (
          <GridItem key={index}>
            <GridIcon src={item.icon} />
            <GridWordBox>
              <GridWord>{item.word.split(" ")[0]}</GridWord>
              <GridWordHighlight style={{ color: item.color }}>
                {item.word.split(" ").slice(1).join(" ")}
              </GridWordHighlight>
            </GridWordBox>
            <GridText>
              {item.text.split("\n").map((s, index) => {
                return <Span key={index}>{s}</Span>;
              })}
            </GridText>
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
}

export default CheckupArea;
