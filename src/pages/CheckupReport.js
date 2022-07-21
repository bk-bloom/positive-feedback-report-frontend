import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { WeeklyChart } from "../components/WeeklyChart";
import { RadarChart } from "../components/RadarChart";
import { Chart } from "../components/Chart";
import axios from "axios";
import { interventions } from "../db";
import CheckupRecommend from "../components/CheckupRecommend";
import CheckupArea from "../components/CheckupArea";
import CheckupReview from "../components/CheckupReview";
import CheckupFooter from "../components/CheckupFooter";

const permav = [
  {
    name: "긍정정서",
    word: "Positive Emotions",
    color: "#ed2b2b",
  },
  {
    name: "몰입",
    word: "Engagement",
    color: "#ff812c",
  },
  {
    name: "관계",
    word: "Relationships",
    color: "#ffc842",
  },
  {
    name: "의미",
    word: "Meaning",
    color: "#dae233",
  },
  {
    name: "성취",
    word: "Accomplishment",
    color: "#00c0e0",
  },
  {
    name: "활력",
    word: "Vitality",
    color: "#7ca1d4",
  },
];

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

const SectionTitle = styled.h2`
  margin-top: 2rem;
  margin-bottom: 0;
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
  margin-bottom: 3rem;
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

const Span = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const ColorSpan = styled.span`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

function CheckupReport() {
  const {
    state: { name, week, result },
  } = useLocation();

  // console.log("Checkup Report State =>", useLocation().state);

  const [companyAverage, setCompantAverage] = useState([]);
  const [myAverage, setMyAverage] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [companyScore, setCompanyScore] = useState(0);
  const [intervention, setIntervention] = useState();

  const calculateAverage = (type, data) => {
    const temp = [0, 0, 0, 0, 0, 0];
    let count = 0;
    if (type === "company") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 1; j <= 4; j++) {
          if (data[i][`week${j}`].length > 0) {
            for (let k = 2; k <= 7; k++) {
              temp[k - 2] += Number(data[i][`week${j}`][k]);
            }
            count++;
          }
        }
      }
    } else {
      for (let i = 0; i < result.length; i++) {
        if (result[i].length > 0) {
          for (let j = 2; j <= 7; j++) {
            temp[j - 2] += Number(result[i][j]);
          }
          count++;
        }
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
      dest.push(result[i][index]);
    }
    // console.log(dest);
    return dest;
  };

  const getRecommendIntervention = (points) => {
    let category = 0;
    let min = Number(points[0]);
    for (let i = 0; i < points.length; i++) {
      if (Number(points[i]) < min) {
        min = Number(points[i]);
        category = i;
      }
    }

    let index = week;
    if (interventions[category].length <= week) {
      console.log("hi");
      index = interventions[category].length % week;
    }
    // console.log(category, index, interventions[category][index]);
    return interventions[category][index];
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkup?all=true`
      );

      setCompantAverage(calculateAverage("company", response.data));
      setMyAverage(calculateAverage("me"));
    };
    if (week === 3) {
      fetchData();
    }
    setIntervention(getRecommendIntervention(result[week].slice(2, 8)));
  }, []);

  return (
    <Container>
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
        <p>데이터 수집일: </p>
        <p>데이터 생성일: </p>
        {week < 3 ? (
          <>
            <P>
              '지난 주 나는 어떤 마음으로 일했더라?' <br />
              한주 간의 마음 체크업에 대한 결과를 정리해 드립니다. <br />
              <br />
              건강한 몸을 만들기 위해 인바디로 내 몸의상태를 알고 반복적인 근력
              운동을 하는 것처럼
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
            뭔가 바쁘게는 일한 거 같은데, 어떻게 지냈는지는 잘 기억이 안 나실 것
            같아 <b>월간 그래프</b>를 특별히 준비했습니다. <br />
            주기적으로 내 마음을 들여다보며 마음 건강을 챙겨보세요
          </P>
        )}

        <SectionTitle>💡지난 마음 체크업 결과</SectionTitle>
        <hr style={{ width: "100%" }} />
        {week === 4 ||
          (week === 3 && (
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
          ))}

        <h3>📈 주간 그래프</h3>
        <P>
          지난 주와 비교해서 높게 나타나는 영역은 무엇인가요? '내가 잘 챙기고
          있네!' 라며 스스로를 칭찬해 주세요! 낮게 나타나는 영역은 무엇인가요?
          어떻게 하면 더 나아질 수 있을지 의도적인 행동으로 챙겨보세요.
        </P>
        <WeeklyChart result={result} week={week} />

        <ChartContainer>
          {permav.map((item, index) => (
            <ChartItem key={index}>
              <div>
                <Span>{item.name}</Span>
                <ColorSpan style={{ color: item.color }}>{item.word}</ColorSpan>
              </div>
              <Chart
                result={extractColumn(index + 2)}
                week={week}
                color={item.color}
              />
            </ChartItem>
          ))}
        </ChartContainer>

        <CheckupReview review={result[week === 4 ? 3 : week][8]} />
        <CheckupArea />

        {intervention && <CheckupRecommend intervention={intervention} />}
        <CheckupFooter />
      </Wrapper>
    </Container>
  );
}

export default CheckupReport;
