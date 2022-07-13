import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getCollectorsBySurveyId, getProjectsBySurveyId } from "../api";
import { checkupProjectListAtom } from "../atom";
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
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px;
  width: 100px;
  cursor: pointer;
  border: none;
  background-color: #ff812c;
  color: white;
  font-weight: bold;
`;

function Checkup() {
  const [projectList, setProjectList] = useRecoilState(checkupProjectListAtom);
  // const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(projectList);
    async function fetchData() {
      const data = await getProjectsBySurveyId("400662208");
      console.log("Checkup =>", data);
      // setProjects(data);
      setProjectList({ result: data });
    }

    if (projectList.result.length === 0) {
      fetchData();
    }
  }, []);

  const handleClick = (projectId, collectors) => {
    navigate(projectId, { state: { collectors } });
  };
  return (
    <Container>
      <Wrapper>
        <HeadSection title="마음 체크업 리포트 (준비중)" />
        <List>
          {projectList.result.length > 0 &&
            projectList.result.map((project) => (
              <Item
                key={project.id}
                onClick={() => handleClick(project.id, project.collectors)}
              >
                {project.id}
              </Item>
            ))}
        </List>
      </Wrapper>
    </Container>
  );
}

export default Checkup;
