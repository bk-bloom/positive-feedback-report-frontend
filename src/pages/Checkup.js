import styled from "styled-components";
import HeadSection from "../components/HeadSection";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 280px;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

function Checkup() {
  return (
    <Container>
      <Wrapper>
        <HeadSection title="마음 체크업 리포트 (준비중)" />
      </Wrapper>
    </Container>
  );
}

export default Checkup;
