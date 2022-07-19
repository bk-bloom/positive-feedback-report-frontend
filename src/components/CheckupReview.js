import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
`;

const Box = styled.div`
  background: rgba(200, 200, 200, 0.2);
  padding: 1rem;
`;
const P = styled.p`
  margin: 0;
`;
function CheckupReview({ review }) {
  return (
    <Container>
      <Title>✏️ 지난 주에 남긴 기록</Title>
      <Box>
        <P>{review}</P>
      </Box>
    </Container>
  );
}

export default CheckupReview;
