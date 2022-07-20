import styled from "styled-components";

const Logo = styled.img`
  width: 300px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 32px;
`;

function HeadSection({ title }) {
  return (
    <>
      <Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />
      <Title>{title}</Title>
    </>
  );
}

export default HeadSection;
