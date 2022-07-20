import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 280px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   background: #ff812c;
  background: white;
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
  color: ${(props) => (props.highlight ? "#ff812c" : "black")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #ff812c;
  }
`;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (to) => {
    navigate(to);
  };

  return (
    <Container>
      <Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />
      <Item
        onClick={() => handleClick("/positive")}
        highlight={
          location.pathname === "/" || location.pathname === "/positive"
        }
      >
        긍정 피드백 리포트
      </Item>
      <Item
        onClick={() => handleClick("/checkup")}
        highlight={location.pathname === "/checkup"}
      >
        마음 체크업 리포트 (준비중)
      </Item>
    </Container>
  );
}

export default Sidebar;
