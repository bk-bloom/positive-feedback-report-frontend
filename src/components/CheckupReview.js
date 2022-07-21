import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 78px;
`;

const SectionSubTitle = styled.h3`
  height: 32px;
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
const Box = styled.div`
  // height: 59px;
  display: flex;
  align-items: center;
  margin: 24px 0 0;
  padding: 20px;
  background-color: #f8f8f8;
`;
const P = styled.p`
  height: 21px;
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.54px;
  color: #333;
`;
function CheckupReview({ review }) {
  return (
    <Container>
      <SectionSubTitle>✏️ 지난 주에 남긴 기록</SectionSubTitle>
      <Box>
        <P>{review}</P>
      </Box>
    </Container>
  );
}

export default CheckupReview;
