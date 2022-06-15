import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 280px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ff812c;
  border-right: 1px solid #e9ecef;
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
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: white;
  }
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
