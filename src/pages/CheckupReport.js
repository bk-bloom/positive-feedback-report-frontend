import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { getDay } from "../utils";

const permav = [
  {
    name: "긍정정서",
    word: "Positive Emotions",
    color: "#ffc842",
  },
  {
    name: "몰입",
    word: "Engagement",
    color: "#dae233",
  },
  {
    name: "관계",
    word: "Relationships",
    color: "#ff812c",
  },
  {
    name: "의미",
    word: "Meaning",
    color: "#00c0e0",
  },
  {
    name: "성취",
    word: "Accomplishment",
    color: "#b782b9",
  },
  {
    name: "활력",
    word: "Vitality",
    color: "#ed2b2b",
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
  width: 820px;
  flex-direction: column;
  padding: 0 50px;
  // border: 1px solid black;
`;

const Title = styled.h1`
  height: 42px;
  margin: 70px 0 25.5px 0;
  font-family: PretendardVariable;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: -1.08px;
  text-align: left;
  color: #000;
`;

const TitleDivider = styled.div`
  width: 720px;
  height: 0;
  margin: 0 0 25.5px 0.5px;
  border-top: solid 2px #010101;
`;

const MetaDataContainer = styled.div`
  margin: 0 0 78px 0;
  display: flex;
  flex-direction: column;
`;

const MetaDataText = styled.span`
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.48px;
  text-align: left;
  color: #777;
`;

const IntroText = styled.p`
  width: 625px;
  height: 141px;
  margin: 0 97.5px 95px 0;
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.54px;
  text-align: left;
  color: #000;
`;

const SectionTitle = styled.h2`
  width: 282px;
  height: 40px;
  font-family: PretendardVariable;
  font-size: 30px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.9px;
  text-align: left;
  color: #010101;
`;

const SectionTitleDivider = styled.div`
  width: 720px;
  height: 0;
  margin: 14.5px 0 42.5px 7.5px;
  border-top: solid 1px #777;
`;

const SectionSubTitle = styled.h3`
  width: 152px;
  height: 32px;
  margin: 0 0 33px 1px;
  font-family: PretendardVariable;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.72px;
  color: #010101;
`;

const SectionIntro = styled.p`
  width: 720px;
  height: 59px;
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.54px;
  color: #333;
  margin-bottom: 5px;
`;

const Banner = styled.div`
  width: 820px;
  height: 200px;
  padding: 20.8px 0 0 107.6px;
  background-color: #fff2d4;
  display: flex;
`;

const BannerImage = styled.img`
  width: 198.9px;
  height: 179.2px;
  margin: 0 43.5px 0 0;
  object-fit: contain;
`;

const BannerTitle = styled.h1`
  height: 58px;
  margin: 54.2px 0 67px 43.5px;
  font-family: EliceDigitalBaeumOTF;
  font-size: 31px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.77;
  letter-spacing: -1.24px;
  text-align: left;
  color: #010101;
`;

const SummaryBox = styled.div`
  height: 59px;
  margin: 15px 0 83px;
  padding-left: 24px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
`;

const SummaryText = styled.span`
  height: 28px;
  font-family: PretendardVariable;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #333;
`;

const ChartContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
`;

const ChartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 60px;
  &:nth-child(even) {
    margin-left: 30px;
  }
  // border: 1px solid black;
`;

const ChartTitle = styled.div`
  display: flex;
  margin-bottom: 24px;
  margin-left: 6px;
  align-items: flex-end;
`;

const P = styled.p`
  line-height: 2;
`;

const ChartSpan = styled.span`
  height: 24px;
  margin: 0 7px 0 0;
  font-family: PretendardVariable;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  // line-height: 1.5;
  letter-spacing: -0.6px;
  color: #010101;
`;

const ColorSpan = styled.span`
  height: 16px;
  font-family: PretendardVariable;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
`;

const createdAt = [
  { collectedAt: "2022.8.22(월)", createdAt: "2022.8.23(화)" },
  { collectedAt: "2022.8.29(월)", createdAt: "2022.8.30(화)" },
  { collectedAt: "2022.9.5(월)", createdAt: "2022.9.6(화)" },
  { collectedAt: "2022.9.12(월)", createdAt: "2022.9.13(화)" },
];

function CheckupReport() {
  const {
    state: { email, week, result, prevResult },
  } = useLocation();
  const { projectId } = useParams();

  // console.log("Checkup Report State =>", useLocation().state);

  const [companyAverage, setCompanyAverage] = useState(0);
  const [myAverage, setMyAverage] = useState(0);
  const [myScore, setMyScore] = useState([]);
  const [companyScore, setCompanyScore] = useState([]);
  const [intervention, setIntervention] = useState();

  const extractColumn = (index) => {
    const dest = [];
    let target = week === 4 ? 3 : week;
    for (let i = 0; i <= target; i++) {
      dest.push(!result[i] ? null : result[i].answers[index]);
    }
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
      index = interventions[category].length % week;
    }
    // console.log(category, index, interventions[category][index]);
    return interventions[category][index];
  };

  useEffect(() => {
    const fetchData = async () => {
      const allResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkup?id=${projectId}`
      );

      const myResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkup?id=${projectId}&email=${email}`
      );

      setCompanyAverage(Number(allResponse.data.average));
      setCompanyScore(allResponse.data.scores);
      setMyAverage(Number(myResponse.data.average));
      setMyScore(myResponse.data.scores);
    };
    if (week === 3) {
      fetchData();
    }
    setIntervention(getRecommendIntervention(result[week].answers.slice(2, 8)));
  }, []);

  return (
    <Container>
      <Banner>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/assets/checkup-banner3x.png`}
        />
        <BannerTitle>
          직장인 마음 피트니스,{" "}
          <b
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              letterSpacing: "-1.6px",
            }}
          >
            맘핏
          </b>
        </BannerTitle>
      </Banner>
      <Wrapper>
        <Title>
          {week < 4
            ? `${result[result.length - 1].answers[0]} 님의 ${
                week + 1
              }주차 체크업 리포트`
            : `${
                result[result.length - 1].answers[0]
              }님의 월간 마음 체크업 리포트입니다`}
        </Title>
        <TitleDivider />
        {/* <List>
        <Item>
          {result.map((answer, index) => (
            <Column key={index}>{answer}</Column>
          ))}
        </Item>
      </List> */}
        <MetaDataContainer>
          <MetaDataText>
            데이터 수집일:{" "}
            <MetaDataText style={{ letterSpacing: "normal" }}>
              {`${new Date(
                result[result.length - 1].createdAt
              ).toLocaleDateString()}` +
                `(${getDay(result[result.length - 1].createdAt)})`}
            </MetaDataText>
          </MetaDataText>
          <MetaDataText>
            데이터 생성일:{" "}
            <MetaDataText style={{ letterSpacing: "normal" }}>
              {createdAt[week].createdAt}
            </MetaDataText>
          </MetaDataText>
        </MetaDataContainer>
        {week < 3 ? (
          <IntroText>
            <b style={{ fontWeight: "600" }}>
              '지난 주 나는 어떤 마음으로 일했더라?'
            </b>{" "}
            <br />
            한주 간의 마음 체크업에 대한 결과를 정리해 드립니다. <br />
            <br />
            건강한 몸을 만들기 위해 인바디로 내 몸의상태를 알고 반복적인 근력
            운동을 하는 것처럼
            <br />
            건강한 마음도 주기적으로 내 마음을 들여다보고, 꾸준한 마음 루틴으로
            만들어질 수 있습니다.
          </IntroText>
        ) : (
          <IntroText>
            와우! 벌써 새로운 달이 시작되었네요. 지난 한 달 어떠셨나요?
            <br />
            일터에서 즐겁고 의미있게, 몰입하며 일했나요? <br />
            <br />
            뭔가 바쁘게는 일한 거 같은데, 어떻게 지냈는지는 잘 기억이 안 나실 것
            같아 <b>월간 그래프</b>를 특별히 준비했습니다. <br />
            주기적으로 내 마음을 들여다보며 마음 건강을 챙겨보세요
          </IntroText>
        )}

        <SectionTitle>💡지난 마음 체크업 결과</SectionTitle>
        <SectionTitleDivider />
        {week === 4 ||
          (week === 3 && (
            <>
              <SectionSubTitle>📆 월간 그래프</SectionSubTitle>
              <SectionIntro>
                나의 마음 건강 점수는{" "}
                <b style={{ fontWeight: "bold" }}>
                  {myAverage}점으로 우리 회사 평균 {companyAverage}점 대비{" "}
                  {parseFloat((myAverage - companyAverage).toFixed(1))}점{" "}
                  {myAverage > companyAverage ? "높게" : "낮게"} 나타났습니다.
                </b>{" "}
                (100점 만점 환산) 나의 마음 건강이 전반적으로 균형감 있게
                튼튼한지, 어떤 부분이 강하고 약하게 나타나는지 살펴보세요.
              </SectionIntro>
              <RadarChart companyScore={companyScore} myScore={myScore} />
              <SummaryBox>
                <SummaryText>
                  <b style={{ fontWeight: "600", letterSpacing: "-0.54px" }}>
                    💡 나의 마음 건강 평균
                  </b>{" "}
                  : 긍정정서 {myScore[0]}, 몰입 {myScore[1]}, 관계 {myScore[2]},
                  의미 {myScore[3]}, 성취 {myScore[4]}, 활력 {myScore[5]}
                </SummaryText>
              </SummaryBox>
            </>
          ))}

        <SectionSubTitle>📈 주간 그래프</SectionSubTitle>
        <SectionIntro>
          지난 주와 비교해서 높게 나타나는 영역은 무엇인가요? '내가 잘 챙기고
          있네!' 라며 스스로를 칭찬해 주세요! 낮게 나타나는 영역은 무엇인가요?
          어떻게 하면 더 나아질 수 있을지 의도적인 행동으로 챙겨보세요.
        </SectionIntro>
        <WeeklyChart results={result.slice(week - 1, week + 1)} week={week} />

        <ChartContainer>
          {permav.map((item, index) => (
            <ChartItem key={index}>
              <ChartTitle>
                <ChartSpan>{item.name}</ChartSpan>
                <ColorSpan style={{ color: item.color }}>{item.word}</ColorSpan>
              </ChartTitle>
              <Chart
                result={extractColumn(index + 2)}
                week={week}
                color={item.color}
              />
            </ChartItem>
          ))}
        </ChartContainer>

        <CheckupReview review={result[result.length - 1].answers[8]} />
        <CheckupArea />

        {intervention && <CheckupRecommend intervention={intervention} />}
        <CheckupFooter />
      </Wrapper>
    </Container>
  );
}

export default CheckupReport;
