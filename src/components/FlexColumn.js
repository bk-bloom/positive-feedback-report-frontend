import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
function FlexColumn({ children }) {
  return <Container>{children}</Container>;
}

export default FlexColumn;
