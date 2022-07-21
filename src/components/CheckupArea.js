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
  margin: 0 0 24px;
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
  grid-template-columns: repeat(3, 230px);
  gap: 15px;
  margin-top: 2rem;
`;

const GridItem = styled.div`
  padding: 20px 0 21px 16px;
  background-color: #f8f8f8;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GridText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 19px;
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.48px;
  text-align: left;
  color: #333;
`;

const GridWord = styled.span`
  font-family: PretendardVariable;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.73;
  letter-spacing: normal;
  text-align: left;
  color: #777;
`;

const Span = styled.span`
  // font-size: 1.1rem;
`;

function CheckupArea() {
  const data = [
    {
      text: "일터에서\n회복탄력성을 키우는\n긍정정서",
      word: "Positive Emotions",
    },
    { text: "강점을 발휘하며\n자기효능감을 높이는\n몰입", word: "Engagement" },
    {
      text: "동료들과 감정, 생각, 비전을\n함께 주고받는\n관계",
      word: "Relationships",
    },
    { text: "일에 의미와 가치를\n실현해 나가는\n의미", word: "Meaning" },
    {
      text: "목표를 달성하며\n동기부여를 촉진하는\n성취",
      word: "Accomplishment",
    },
    { text: "건강한 에너지를\n유지하는\n활력", word: "Vitality" },
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
            <GridText>
              {item.text.split("\n").map((s, index) => {
                if (index === 2) {
                  return (
                    <Span key={index}>
                      <b style={{ fontWeight: "bold" }}>{s}</b>
                    </Span>
                  );
                }
                return <Span key={index}>{s}</Span>;
              })}
            </GridText>
            <GridWord>
              <b style={{ fontWeight: "600" }}>{item.word[0]}</b>
              {item.word.slice(1)}
            </GridWord>
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
}

export default CheckupArea;
