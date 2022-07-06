import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Wordcloud from "../components/Wordcloud";
import ReportCover from "../components/ReportCover";
import Loading from "../components/Loading";

const COLORS = [
  "#CC2B69",
  "#ED2B2B",
  "#FF812C",
  "#FFC842",
  "#DAE233",
  "#00C0E0",
  "#7CA1D3",
  "#B782B9",
];

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.isLoading ? "100vh" : "auto")};
  margin-left: 280px;
`;
const Wrapper = styled.div`
  // width: 60%;
  display: flex;
  width: 21cm;
  flex-direction: column;
  // padding: 40px;
  // border: 1px solid black;
`;

const HeaderTopContainer = styled.div`
  display: flex;
  // margin-top: 20px;
`;
const HeaderTopBorder = styled.div`
  height: 10px;
  width: 12.5%;
  background-color: ${(props) => props.bgColor};
`;
const Header = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ff812c;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const HeaderText = styled.span`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-left: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-top: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff812c;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
`;

const SectionSubTitle = styled.div`
  font-size: 18px;
  //   margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SectionTopWords = styled.div`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 0;
`;

const TopWords = styled.span`
  font-size: 18px;
  margin: 10px;
`;

const SectionAllWords = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #f3f3f3;
  padding: 20px 10px;
`;

const AllWords = styled.span`
  font-size: 14px;
  margin: 0 5px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CommentSection = styled.div`
  display: flex;
  margin: 10px 0;
`;

const CommentSectionTitle = styled.div`
  background-color: #ff812c;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100px;
  margin-right: 10px;
`;

const CommentSectionList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  width: 100%;
  padding: 5px 10px;
`;

const CommentSectionItem = styled.p`
  margin: 4px 0;
  font-size: 14px;
`;

const DownloadButton = styled.div`
  width: 60px;
  height: 60px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: fixed;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
`;

function Report() {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("리포트 생성중...");

  const printRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setReportData([
      location.state.data.strengthWords,
      location.state.data.valuesWords,
      location.state.data.appreciateComments,
      location.state.data.expectComments,
    ]);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDownloadPdf = async () => {
    setLoadingMsg("pdf 다운로드중...");
    setIsLoading(true);
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    const pageHeight = 297;
    let heightLeft = pdfHeight;

    let position = 0;

    pdf.addImage(
      data,
      "PNG",
      0,
      position,
      pdfWidth,
      pdfHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(
        data,
        "PNG",
        0,
        position,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;
    }
    pdf.save(`긍정 피드백 설문 결과 - ${location.state.name}.pdf`);
    setIsLoading(false);
  };

  return (
    <Container isLoading={isLoading}>
      {isLoading ? (
        <Loading
          message={loadingMsg}
          animate={loadingMsg !== "pdf 다운로드중..."}
        />
      ) : (
        <>
          <Wrapper ref={printRef}>
            <ReportCover name={location.state.name} />
            <HeaderTopContainer>
              {COLORS.map((color, index) => (
                <HeaderTopBorder key={index} bgColor={color} />
              ))}
            </HeaderTopContainer>
            <Header>
              <HeaderText>긍정 피드백</HeaderText>
            </Header>
            <SectionContainer>
              <Section>
                <SectionHeader>구성원들이 보는 나의 강점</SectionHeader>
                <SectionSubTitle>TOP 3</SectionSubTitle>
                <Wordcloud data={reportData[0]} />
                <SectionSubTitle>강점 단어 모음</SectionSubTitle>
                <SectionAllWords>
                  {reportData[0].map((word, index) => (
                    <AllWords key={index}>{`${word[0]} (${word[1]})`}</AllWords>
                  ))}
                </SectionAllWords>
              </Section>
              <Section>
                <SectionHeader>구성원들이 보는 나의 가치</SectionHeader>
                <SectionSubTitle>TOP 3</SectionSubTitle>
                <Wordcloud data={reportData[1]} />
                <SectionSubTitle>가치 단어 모음</SectionSubTitle>
                <SectionAllWords>
                  {reportData[1].map((word, index) => (
                    <AllWords key={index}>{`${word[0]} (${word[1]})`}</AllWords>
                  ))}
                </SectionAllWords>
              </Section>
            </SectionContainer>
            <CommentContainer>
              <CommentSection>
                <CommentSectionTitle>
                  <span>감사와</span>
                  <span>응원을</span>
                  <span>보냅니다</span>
                </CommentSectionTitle>
                <CommentSectionList>
                  {reportData[2].map((comment, index) => (
                    <CommentSectionItem key={index}>
                      - {comment}
                    </CommentSectionItem>
                  ))}
                </CommentSectionList>
              </CommentSection>
              <CommentSection>
                <CommentSectionTitle>
                  <span>앞으로</span>
                  <span>기대합니다</span>
                </CommentSectionTitle>
                <CommentSectionList>
                  {reportData[3].map((comment, index) => (
                    <CommentSectionItem key={index}>
                      - {comment}
                    </CommentSectionItem>
                  ))}
                </CommentSectionList>
              </CommentSection>
            </CommentContainer>
          </Wrapper>
          <DownloadButton onClick={handleDownloadPdf}>
            <span>PDF</span>
            <span>다운로드</span>
          </DownloadButton>
        </>
      )}
    </Container>
  );
}

export default Report;
