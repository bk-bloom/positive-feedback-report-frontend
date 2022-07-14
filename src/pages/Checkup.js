import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getCollectorsBySurveyId, getProjectsBySurveyId } from "../api";
import { checkupProjectListAtom } from "../atom";
import FlexColumn from "../components/FlexColumn";
import FlexRow from "../components/FlexRow";
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
  width: 100%;
  margin-top: 5rem;
`;

const Item = styled.div`
  width: 150px;
  height: 150px;
  cursor: pointer;
  display: flex;
  padding: 10px;
  margin: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(255, 129, 44, 0.8);
    color: white;

    // box-shadow: 0px 0px 6px -1px #ff812c;
  }
  transition: all 0.2s;
`;

const SmallText = styled.span`
  font-weight: ${(props) => props.fontWeight};
  font-size: 0.9rem;
`;

const MediumText = styled.span`
  margin-top: 8px;
  font-size: 1.2rem;
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
                <FlexColumn>
                  <SmallText fontWeight="bold">{project.id}</SmallText>
                  <MediumText>{project.title}</MediumText>
                </FlexColumn>
                <div>
                  <SmallText>기간: {project.duration}</SmallText>
                </div>
              </Item>
            ))}
        </List>
      </Wrapper>
    </Container>
  );
}

export default Checkup;
