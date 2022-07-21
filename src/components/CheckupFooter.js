import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 2rem;
  /* display: flex;
  flex-direction: column; */
`;

const Line = styled.div`
  height: 0;
  border-top: solid 1px #c9c9c9;
  margin-bottom: 15.5px;
`;

const Text = styled.span`
  width: 285px;
  height: 33px;
  font-family: PretendardVariable;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.58;
  letter-spacing: normal;
  text-align: left;
  color: #afafaf;
`;

function CheckupFooter() {
  return (
    <Container>
      <Line />
      <Text>
        <Text style={{ letterSpacing: "-0.36px" }}>
          마인드 콘텐츠 기업, 블룸컴퍼니
        </Text>
        <br />
        Copyright &copy; {new Date().getFullYear()} Bloom Company. All right
        reserved.
      </Text>
    </Container>
  );
}

export default CheckupFooter;
