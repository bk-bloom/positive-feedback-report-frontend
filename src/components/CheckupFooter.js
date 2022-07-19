import styled from "styled-components";

const Container = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  /* display: flex;
  flex-direction: column; */
`;

const Line = styled.hr`
  border-top: rgba(200, 200, 200, 0.8);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  margin: 0;
  color: rgba(200, 200, 200, 0.8);
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
`;

function CheckupFooter() {
  return (
    <Container>
      <Line />
      <Text>마인드 콘텐츠 기업, 블룸컴퍼니</Text>
      <Text>
        Copyright &copy; {new Date().getFullYear()} Bloom Company. All right
        reserved.
      </Text>
    </Container>
  );
}

export default CheckupFooter;
