import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
function FlexRow({ children }) {
  return <Container>{children}</Container>;
}

export default FlexRow;
