import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCollectorsBySurveyId } from "../api";
import HeadSection from "../components/HeadSection";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 280px;
`;
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  cursor: pointer;
`;

function Checkup() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // const data = await getCollectorsBySurveyId("400662208");
      const data = [
        {
          name: "도레이첨단소재",
          id: "421610759",
          href: "https://api.surveymonkey.com/v3/collectors/421610759",
          type: "email",
          email: "ask@bloomhappiness.com",
        },
        {
          name: "마음 체크업(블룸)",
          id: "421447636",
          href: "https://api.surveymonkey.com/v3/collectors/421447636",
          type: "email",
          email: "ask@bloomhappiness.com",
        },
        {
          name: "마음 체크업(삼성)",
          id: "421431928",
          href: "https://api.surveymonkey.com/v3/collectors/421431928",
          type: "email",
          email: "ask@bloomhappiness.com",
        },
        {
          name: "마음 체크업(두산)",
          id: "421346228",
          href: "https://api.surveymonkey.com/v3/collectors/421346228",
          type: "email",
          email: "ask@bloomhappiness.com",
        },
        {
          name: "마음 체크업(현대)",
          id: "421431558",
          href: "https://api.surveymonkey.com/v3/collectors/421431558",
          type: "email",
          email: "ask@bloomhappiness.com",
        },
      ];
      // console.log(data);
      setItems(data);
    }
    fetchData();

    console.log("useEffect End");
  }, []);

  const handleClick = (id, name) => {
    navigate(id, { state: { name } });
  };
  return (
    <Container>
      <Wrapper>
        <HeadSection title="마음 체크업 리포트 (준비중)" />
        <List>
          {items.length > 0 &&
            items.map((item) => (
              <Item
                key={item.id}
                onClick={() => handleClick(item.id, item.name)}
              >
                {item.name}
              </Item>
            ))}
        </List>
      </Wrapper>
    </Container>
  );
}

export default Checkup;
