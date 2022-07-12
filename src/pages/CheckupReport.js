import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { WeeklyChart } from "../components/WeeklyChart";
import { RadarChart } from "../components/RadarChart";
import { Chart } from "../components/Chart";

const Container = styled.div`
  margin-left: 280px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 21cm;
  flex-direction: column;
  padding: 20px;
  //   border: 1px solid black;
`;

const Title = styled.h1``;

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
`;

const Column = styled.div`
  flex: 1;
  &:nth-child(8),
  &:nth-child(9) {
    flex: 3;
  }
`;

const Banner = styled.img`
  width: 100%;
`;

const ChartContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const ChartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 30px 10px 10px;
  //   border: 1px solid black;
`;

const P = styled.p`
  line-height: 2;
`;

const Li = styled.li`
  line-height: 2;
`;

function CheckupReport() {
  const {
    state: { name, week, result },
  } = useLocation();

  const [companyAverage, setCompantAverage] = useState([]);
  const [myAverage, setMyAverage] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [companyScore, setCompanyScore] = useState(0);

  const calculateAverage = (type) => {
    const temp = [0, 0, 0, 0, 0, 0];
    let count = 0;
    if (type === "company") {
      for (const key in result) {
        for (let i = 0; i < result[key].length; i++) {
          for (let j = 1; j <= 6; j++) {
            temp[j - 1] += Number(result[key][i][j]);
          }
          count++;
        }
      }
    } else {
      for (let i = 0; i < result[name].length; i++) {
        for (let j = 1; j <= 6; j++) {
          temp[j - 1] += Number(result[name][i][j]);
        }
        count++;
      }
    }
    temp.forEach((n, index, prev) => {
      prev[index] = parseFloat((n / count).toFixed(1));
    });
    if (type === "company") {
      setCompanyScore(calculateScore(temp));
    } else {
      setMyScore(calculateScore(temp));
    }
    return temp;
  };

  const calculateScore = (arr) => {
    let score = 0;
    for (let i = 0; i < arr.length; i++) {
      score += arr[i];
    }

    return parseFloat((score * 1.665).toFixed(1));
  };
  const extractColumn = (index) => {
    const dest = [];
    let target = week === 4 ? 3 : week;
    for (let i = 0; i <= target; i++) {
      dest.push(result[name][i][index]);
    }
    return dest;
  };

  useEffect(() => {
    setCompantAverage(calculateAverage("company"));
    setMyAverage(calculateAverage("me"));
  }, []);

  return (
    <Container>
      {result[name][week === 4 ? 3 : week] === undefined ? (
        `${week === 4 ? week : week + 1}주차 마음 체크업 답변이 없습니다.`
      ) : (
        <Wrapper>
          <Banner src="/assets/banner.png" />
          <Title>
            {week < 4
              ? `${name}님의 ${week + 1}주차 마음 체크업 리포트입니다`
              : `${name}님의 월간 마음 체크업 리포트입니다`}
          </Title>
          {/* <List>
        <Item>
          {result.map((answer, index) => (
            <Column key={index}>{answer}</Column>
          ))}
        </Item>
      </List> */}
          {week < 4 ? (
            <>
              <P>
                '지난 주 나는 어떤 마음으로 일했더라?' <br />
                한주 간의 마음 체크업에 대한 결과를 정리해 드립니다. <br />
                <br />
                건강한 몸을 만들기 위해 인바디로 내 몸의상태를 알고 반복적인
                근력 운동을 하는 것처럼
                <br />
                건강한 마음도 주기적으로 내 마음을 들여다보고, 꾸준한 마음
                루틴으로 만들어질 수 있습니다.
              </P>
            </>
          ) : (
            <P>
              와우! 벌써 새로운 달이 시작되었네요. 지난 한 달 어떠셨나요?
              <br />
              일터에서 즐겁고 의미있게, 몰입하며 일했나요? <br />
              <br />
              뭔가 바쁘게는 일한 거 같은데, 어떻게 지냈는지는 잘 기억이 안 나실
              것 같아 <b>월간 그래프</b>를 특별히 준비했습니다. <br />
              주기적으로 내 마음을 들여다보며 마음 건강을 챙겨보세요
            </P>
          )}

          <h2>💡지난 마음 체크업 결과</h2>
          {week === 4 && (
            <>
              <h3>📆 월간 그래프</h3>
              <P>
                지난달 나의 마음 건강 점수는 {myScore}점으로 우리 회사 평균{" "}
                {companyScore}점 대비{" "}
                {parseFloat((myScore - companyScore).toFixed(1))}점{" "}
                {myScore > companyScore ? "높게" : "낮게"} 나타났습니다. (100점
                만점 환산) 나의 마음 건강이 전반적으로 균형감 있게 튼튼한지,
                어떤 부분이 강하고 약하게 나타나는지 살펴보세요.
              </P>
              <RadarChart
                companyAverage={companyAverage}
                myAverage={myAverage}
              />
              <P>
                7월 나의 마음 건강 평균 : 긍정정서 {myAverage[0]}, 몰입{" "}
                {myAverage[1]}, 관계 {myAverage[2]}, 의미 {myAverage[3]}, 성취{" "}
                {myAverage[4]}, 활력 {myAverage[5]}
              </P>
            </>
          )}

          <h3>📈 주간 그래프</h3>
          <P>
            지난 주와 비교해서 높게 나타나는 영역은 무엇인가요? '내가 잘 챙기고
            있네!' 라며 스스로를 칭찬해 주세요! 낮게 나타나는 영역은 무엇인가요?
            어떻게 하면 더 나아질 수 있을지 의도적인 행동으로 챙겨보세요.
          </P>
          <WeeklyChart result={result[name]} week={week} />

          <ChartContainer>
            <ChartItem>
              <h4>긍정정서 (Positive Emotions) </h4>
              <Chart result={extractColumn(1)} week={week} color="#ed2b2b" />
            </ChartItem>
            <ChartItem>
              <h4>몰입 (Engagement)</h4>
              <Chart result={extractColumn(2)} week={week} color="#ff812c" />
            </ChartItem>
            <ChartItem>
              <h4>관계 (Relationships)</h4>
              <Chart result={extractColumn(3)} week={week} color="#ffc842" />
            </ChartItem>

            <ChartItem>
              <h4>의미 (Meaning)</h4>
              <Chart result={extractColumn(4)} week={week} color="#dae233" />
            </ChartItem>

            <ChartItem>
              <h4>성취 (Accomplishment)</h4>
              <Chart result={extractColumn(5)} week={week} color="#00c0e0" />
            </ChartItem>

            <ChartItem>
              <h4>활력 (Vitality)</h4>
              <Chart result={extractColumn(6)} week={week} color="#7ca1d4" />
            </ChartItem>
          </ChartContainer>

          <h4>✏️ 지난 주에 남긴 기록</h4>
          <P>- {result[name][week === 4 ? 3 : week][7]}</P>

          <h4>📌 마음 리포트에서 살펴보는 마음 건강 영역</h4>
          <P>
            마음 리포트는 마틴 셀리그먼의 PERMA 웰빙 모델에 활력(Vitality)를
            추가하여 직장인 일상의 멘탈웰빙을 체크하고 있습니다.
          </P>
          <Li>
            일터에서 회복탄력성을 키우는 <b>긍정정서</b>(<b>P</b>ositive
            Emotions)
          </Li>
          <Li>
            강점을 발휘하며 자기효능감을 높이는 <b>몰입</b>(<b>E</b>ngagement)
          </Li>
          <Li>
            동료들과 감정, 생각, 비전을 함께 주고받는 <b>관계</b>(<b>R</b>
            elationships)
          </Li>
          <Li>
            일에 의미와 가치를 실현해 나가는 <b>의미</b>(<b>M</b>eaning)
          </Li>
          <Li>
            목표를 달성하며 동기부여를 촉진하는 <b>성취</b>(<b>A</b>
            ccomplishment)
          </Li>
          <Li>
            건강한 에너지를 유지하는 <b>활력</b>(<b>V</b>itality)
          </Li>
        </Wrapper>
      )}
    </Container>
  );
}

export default CheckupReport;
