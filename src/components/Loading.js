import ReactLoading from "react-loading";
import styled from "styled-components";

const Container = styled.div`
  margin-top: ${(props) => props.marginTop};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Loading({ message, marginTop, animate = true }) {
  console.log(marginTop);
  return (
    <Container marginTop={marginTop}>
      {animate && (
        <ReactLoading
          type={"bars"}
          color={"black"}
          height={"100px"}
          width={"100px"}
        />
      )}
      <span>{message}</span>
    </Container>
  );
}

export default Loading;
