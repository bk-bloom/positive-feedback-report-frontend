import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
function FlexColumn({ children, type }) {
  return <Container style={type}>{children}</Container>;
}

export default FlexColumn;
