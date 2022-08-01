import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Wordcloud from "../components/Wordcloud";
import ReportCover from "../components/ReportCover";
import Loading from "../components/Loading";
import A4 from "../components/A4";

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
  width: 793.7007874px;
  // padding: 0 0 28.1px;
  flex-direction: column;
  // padding: 40px;
  // border: 1px solid black;
`;

const HeaderTopContainer = styled.div`
  width: 100%;
  height: 28px;
  margin: 0 0 55px;
  background-color: #ff812c;
`;
const HeaderTopBorder = styled.div`
  height: 10px;
  width: 12.5%;
  background-color: ${(props) => props.bgColor};
`;
const Header = styled.div`
  width: 313px;
  height: 89px;
  margin: 0 0 73.7px;
  font-family: PretendardVariable;
  font-size: 35px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -1.4px;
  text-align: left;
  color: #000;
  position: relative;
`;

const HeaderBottomBar = styled.div`
  position: absolute;
  width: 228px;
  height: 19px;
  bottom: 0;
  background-color: #fff3a4;
  z-index: -1;
`;
const HeaderText = styled.span`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-left: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 0 52.9px;
  width: 100%;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  width: 100%;
  height: 42.3px;
  margin: 0 0 26px;
  // padding: 9.3px 484.8px 11px 19.1px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background-color: #fda76b;
`;

const SectionHeaderText = styled.span`
  height: 22px;
  font-family: PretendardVariable;
  font-size: 19px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: -0.76px;
  text-align: left;
  color: #fff;
  margin-left: 19.1px;
`;

const SectionBody = styled.div`
  display: flex;
  padding: 0 22px;
  margin-bottom: 60.7px;
`;

const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionSubTitle = styled.p`
  width: 88px;
  height: 19px;
  margin: 0 260px 13px 0;
  font-family: PretendardVariable;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: -0.64px;
  text-align: left;
  color: #000;
`;

const AllWordsBorder = styled.div`
  width: 313.7px;
  height: 0;
  margin: 0 0 0 0.8px;
  opacity: 0.3;
  border-top: solid 1px #707070;
`;

const SectionAllWords = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 302px;
  // height: 239px;
  margin: 12.7px 12.5px 0 0;
  font-family: PretendardVariable;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  // border: 1px solid black;
`;

const WordContainer = styled.div`
  // width: 100%;
  display: inline;
  height: 16px;
  line-height: 14px;
  margin-right: 10px;
  margin-bottom: 5px;
  // border: 1px solid black;
`;
const Word = styled.span`
  width: 24px;
  height: 16px;
  margin-right: 1px;
  font-family: PretendardVariable;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.42px;
  text-align: left;
  color: #000;
  // border: 1px solid black;
`;

const WordCount = styled.div`
  width: 16px;
  height: 16px;
  font-size: 10px;
  border-radius: 3px;
  border: solid 1px #707070;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentSectionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 700px;
  overflow-y: hidden;
  /* border: 1px solid black; */
`;

const CommentDivider = styled.div`
  width: 312px;
  height: 0;
  margin: 0 4.9px 15.5px 0;
  opacity: 0.5;
  border-top: solid 1px #707070;
`;

const CommentSectionItem = styled.p`
  width: 311.8px;
  margin: 0 0 15.5px 5px;
  font-family: PretendardVariable;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.6px;
  text-align: left;
  color: #666;
  /* border: 1px solid black; */
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

const comments = [
  "1번째입니다.",
  "2번째입니다.",
  "3번째입니다.",
  "4번째입니다.",
  "5번째입니다.",
  "6번째입니다.",
  "7번째입니다.",
  "8번째입니다.",
  "9번째입니다.",
  "10번째입니다.",
  "11번째입니다.",
  "12번째입니다.",
  "13번째입니다.",
  "14번째입니다.",
  "15번째입니다.",
];

function Report() {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("리포트 생성중...");
  const [pages, setPages] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [offsets, setOffsets] = useState([0]);
  const printRef = useRef();
  const commentRef = useRef([]);
  const counterRef = useRef(0);

  const location = useLocation();

  useEffect(() => {
    if (counterRef.current === 0) {
      setReportData([
        location.state.data.strengthWords,
        location.state.data.valuesWords,
        location.state.data.appreciateComments,
        location.state.data.expectComments,
      ]);

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
      counterRef.current += 1;
    }
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

  useEffect(() => {
    // console.log(
    //   pages,
    //   currentIndex,
    //   commentRef.current.length,
    //   offsets,
    //   offsets.includes(currentIndex)
    // );
    // if (counterRef.current === 1) {

    let isLastPage = false;
    setTimeout(() => {
      let height = 0;

      for (let i = currentIndex; i < commentRef.current.length; i++) {
        height += commentRef.current[i].getBoundingClientRect().height;
        if (height > 700) {
          setCurrentIndex(i);
          // setPages((prev) => prev + 1);
          // alert(`Overflowed 600 at ${i}th element`);
          if (!offsets.includes(i)) {
            setOffsets((prev) => [...prev, i]);
            setPages((prev) => prev + 1);
          }
          isLastPage = false;
          break;
        } else {
          isLastPage = true;
        }
      }
      setIsLastPage(isLastPage);
      // console.log("is last page =>", isLastPage, pages);
    }, 500);
  }, [pages]);

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
            {/* <HeaderTopContainer>
              {COLORS.map((color, index) => (
                <HeaderTopBorder key={index} bgColor={color} />
              ))}
            </HeaderTopContainer> */}
            <A4>
              <Header>
                {location.state.name}{" "}
                <b style={{ fontWeight: "normal" }}>님을 위한</b>
                <br />
                긍정 피드백 결과<b style={{ fontWeight: "normal" }}>입니다.</b>
                <HeaderBottomBar />
              </Header>
              <SectionContainer>
                <Section>
                  <SectionHeader>
                    <SectionHeaderText>
                      구성원들이 보는{" "}
                      <b style={{ fontWeight: "bold" }}>나의 강점</b>
                    </SectionHeaderText>
                  </SectionHeader>
                  <SectionBody>
                    <SectionItem>
                      <SectionSubTitle>TOP 3</SectionSubTitle>
                      <Wordcloud data={reportData[0]} type="strength" />
                    </SectionItem>
                    <SectionItem>
                      <SectionSubTitle>강점 단어 모음</SectionSubTitle>
                      <AllWordsBorder />
                      <SectionAllWords>
                        {reportData[0].map((word, index) => (
                          <WordContainer key={index}>
                            <Word>{word[0]}</Word>{" "}
                            <WordCount>{word[1]}</WordCount>
                          </WordContainer>
                        ))}
                      </SectionAllWords>
                    </SectionItem>
                  </SectionBody>
                </Section>
                <Section>
                  <SectionHeader>
                    <SectionHeaderText>
                      구성원들이 보는{" "}
                      <b style={{ fontWeight: "bold" }}>나의 가치</b>
                    </SectionHeaderText>
                  </SectionHeader>
                  <SectionBody>
                    <SectionItem>
                      <SectionSubTitle>TOP 3</SectionSubTitle>
                      <Wordcloud data={reportData[1]} type="value" />
                    </SectionItem>
                    <SectionItem>
                      <SectionSubTitle>가치 단어 모음</SectionSubTitle>
                      <SectionAllWords>
                        {reportData[1].map((word, index) => (
                          <WordContainer key={index}>
                            <Word>{word[0]}</Word>{" "}
                            <WordCount>{word[1]}</WordCount>
                          </WordContainer>
                        ))}
                      </SectionAllWords>
                    </SectionItem>
                  </SectionBody>
                </Section>
              </SectionContainer>
            </A4>
            {new Array(pages).fill(0).map((item, i) => (
              <A4 type="comment" key={i}>
                <Header>
                  {location.state.name}{" "}
                  <b style={{ fontWeight: "normal" }}>님을 위한</b>
                  <br />
                  긍정 피드백 결과
                  <b style={{ fontWeight: "normal" }}>입니다.</b>
                  <HeaderBottomBar />
                </Header>
                <CommentContainer>
                  <CommentSection>
                    <SectionHeader style={{ width: "331px" }}>
                      <SectionHeaderText>
                        감사와 응원을 보냅니다 😊
                      </SectionHeaderText>
                    </SectionHeader>
                    <CommentSectionList>
                      {reportData[2].map((comment, index) => (
                        <div key={index}>
                          <CommentSectionItem>{comment}</CommentSectionItem>
                          <CommentDivider />
                        </div>
                      ))}
                    </CommentSectionList>
                  </CommentSection>
                  <CommentSection>
                    <SectionHeader style={{ width: "331px" }}>
                      <SectionHeaderText>
                        앞으로 기대합니다 🙏
                      </SectionHeaderText>
                    </SectionHeader>
                    <CommentSectionList>
                      {comments
                        .slice(
                          isLastPage ? offsets[i] : currentIndex,
                          i + 1 < comments.length
                            ? offsets[i + 1]
                            : comments.length
                        )
                        .map((comment, index) => {
                          return (
                            <div
                              key={index}
                              ref={(el) =>
                                (commentRef.current[currentIndex + index] = el)
                              }
                            >
                              <CommentSectionItem>
                                {comments[offsets[i] + index]}
                              </CommentSectionItem>
                              <CommentDivider />
                            </div>
                          );
                        })}
                      {/* {reportData[3].map((comment, index) => (
                      <div key={index}>
                        <CommentSectionItem>{comment}</CommentSectionItem>
                        <CommentDivider />
                      </div>
                    ))} */}
                    </CommentSectionList>
                  </CommentSection>
                </CommentContainer>
              </A4>
            ))}
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
