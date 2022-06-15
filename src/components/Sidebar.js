import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 280px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ff812c;
`;

const Logo = styled.img`
  width: 50%;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const Item = styled.div`
  text-align: center;
  width: 100%;
  padding: 20px 0;
  color: white;
  cursor: pointer;
`;

function Sidebar() {
  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate(to);
  };
  return (
    <Container>
      <Logo src="../assets/logo.png" />
      <Item onClick={() => handleClick("/")}>긍정 피드백 리포트</Item>
      <Item>준비중</Item>
    </Container>
  );
}

export default Sidebar;
