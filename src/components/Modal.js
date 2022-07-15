import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* overflow: auto; Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Modal({ children }) {
  return <Container>{children}</Container>;
}

export default Modal;
