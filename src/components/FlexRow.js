import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => props.type["justify-content"]};
  align-items: ${(props) => props.type["align-items"]};
`;
function FlexRow({ children, type }) {
  return <Container type={type}>{children}</Container>;
}

export default FlexRow;
