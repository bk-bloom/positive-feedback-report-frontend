import styled from "styled-components";

const Container = styled.section``;

const Title = styled.h3`
  font-size: 1.3rem;
`;
const P = styled.p`
  line-height: 2;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 2rem;
`;

const GridItem = styled.div`
  background: rgba(200, 200, 200, 0.2);
  padding: 0.8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GridText = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridWord = styled.span`
  font-size: 0.9rem;
`;

const Span = styled.span`
  font-size: 1.1rem;
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
      <Title>📌 마음 리포트에서 살펴보는 마음 건강 영역</Title>
      <P>
        마음 리포트는 마틴 셀리그먼의 PERMA 웰빙 모델에 활력(Vitality)를
        추가하여 직장인 일상의 멘탈웰빙을 체크하고 있습니다.
      </P>
      <GridContainer>
        {data.map((item) => (
          <GridItem>
            <GridText>
              {item.text.split("\n").map((s, index) => {
                if (index === 2) {
                  return (
                    <Span>
                      <b>{s}</b>
                    </Span>
                  );
                }
                return <Span>{s}</Span>;
              })}
            </GridText>
            <GridWord>
              <b>{item.word[0]}</b>
              {item.word.slice(1)}
            </GridWord>
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
}

export default CheckupArea;
