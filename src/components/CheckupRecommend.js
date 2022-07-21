import { Link } from "react-router-dom";
import styled from "styled-components";
import FlexColumn from "./FlexColumn";
import FlexRow from "./FlexRow";

const Container = styled.section`
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Div = styled.div`
  display: flex;
`;

const SectionTitle = styled.h2`
  font-family: PretendardVariable;
  font-size: 30px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.9px;
  text-align: left;
  color: #010101;
`;

const SectionTitleDivider = styled.div`
  width: 720px;
  height: 0;
  margin: 14.5px 0 42.5px;
  border-top: solid 1px #777;
`;

const RecommendContainer = styled.section`
  margin-top: 44.5px;
  display: flex;
`;

const RecommendDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 44px;
`;

const Title = styled.h3`
  margin-bottom: 32px;
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
const Description = styled.div`
  //   margin-bottom: 2rem;
`;
const P = styled.p`
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.54px;
  text-align: left;
  color: #333;
`;

const Box = styled.div`
  width: 360px;
  height: 143px;
  margin-top: 24px;
  padding-left: 22px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Span = styled.span`
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.48px;
  text-align: left;
  color: #333;
`;

const SLink = styled.a`
  width: 143px;
  height: 21px;
  margin: 28.5px 0 4.5px;
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.48px;
  color: #ff812c;
  text-decoration: none;
  cursor: pointer;
`;

const LinkDivider = styled.div`
  width: 133px;
  height: 0;
  margin: 4.5px 9.5px 0 0.5px;
  border-top: solid 1px #ff812c;
`;

function CheckupRecommend({ intervention }) {
  return (
    <Container>
      <SectionTitle>🎵 이번 주 함께 해요, 마음 건강 루틴</SectionTitle>
      <SectionTitleDivider />
      <RecommendContainer type={{ "justify-content": "space-evenly" }}>
        <iframe
          src={intervention.video_link}
          height="540"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <RecommendDescription>
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
            <Span>
              🌟 난이도 :{" "}
              {new Array(3).fill(0).map((i, index) => {
                if (index < intervention.level) return "★";
                else return "☆";
              })}
            </Span>
          </Box>
          <SLink href="https://inexpensive-pump-d5c.notion.site/eaed614e428a41a2a44fcd86a3d03d3e">
            마음 루틴 모아보기 👉{" "}
          </SLink>
          <LinkDivider />
        </RecommendDescription>
      </RecommendContainer>
    </Container>
  );
}

export default CheckupRecommend;
