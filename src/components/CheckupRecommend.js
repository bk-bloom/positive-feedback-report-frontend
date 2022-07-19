import styled from "styled-components";
import FlexColumn from "./FlexColumn";
import FlexRow from "./FlexRow";

const Container = styled.section`
  margin-top: 5rem;
`;

const Div = styled.div`
  display: flex;
`;

const Heading = styled.h2``;
const Title = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;
const Description = styled.div`
  //   margin-bottom: 2rem;
`;
const P = styled.p`
  margin: 0.4rem 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(200, 200, 200, 0.2);
`;

const Span = styled.span`
  margin: 0.3rem 0;
  font-size: 0.9rem;
`;

function CheckupRecommend({ intervention }) {
  return (
    <Container>
      <Heading>🎵 이번 주 함께 해요, 마음 건강 루틴</Heading>
      <hr />
      <FlexRow type={{ "justify-content": "space-evenly" }}>
        <iframe
          src={intervention.video_link}
          height="564"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
        <FlexColumn
          type={{ marginLeft: "1rem", justifyContent: "space-between" }}
        >
          <div>
            <Title>{intervention.title}</Title>
            <Description>
              {intervention.description.split("\n").map((p, index) => {
                if (p.replace(/\s+/g, "") === "") {
                  return <br key={index} />;
                } else {
                  return <P key={index}>{p}</P>;
                }
              })}
            </Description>
          </div>
          <Box>
            <Span>⏰ 소요 시간: {intervention.duration}</Span>
            <Span>🌄 추천 시간: {intervention.recommendAt}</Span>
            <Span>🌟 난이도 : {intervention.level}</Span>
          </Box>
        </FlexColumn>
      </FlexRow>
    </Container>
  );
}

export default CheckupRecommend;
