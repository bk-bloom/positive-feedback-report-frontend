import styled from "styled-components";

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;
  width: 793.7007874px;
  height: 1122.519685px;
  position: relative;
  //   border: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 53px;
`;

const HeaderTopContainer = styled.div`
  width: 100%;
  height: 28px;
  margin: 0 0 55px;
  background-color: #ff812c;
`;

const BackgroundImage = styled.img`
  width: 421.1px;
  height: 255.1px;
  margin: 83.8px 52.4px 33.5px 320.2px;
  object-fit: contain;
  opacity: 1;
  position: absolute;
  bottom: 35px;
`;

const Footer = styled.div`
  display: flex;
  width: 688.3px;
  margin: 0 auto;
  margin-bottom: 34px;
  border-top: solid 1px rgba(112, 112, 112, 0.5);
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const FooterLogo = styled.img`
  width: 64.1px;
  height: 19.7px;
  margin: 17px 374px 0 0;
  object-fit: contain;
`;

const FooterText = styled.p`
  height: 13px;
  margin-top: 20.1px;
  opacity: 0.8;
  font-family: PretendardVariable;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: normal;
  text-align: right;
  color: #666;
`;

function A4({ children, type }) {
  return (
    <Contaienr>
      <HeaderTopContainer />
      <Wrapper>{children}</Wrapper>

      {type === "comment" && (
        <BackgroundImage
          src={`${process.env.PUBLIC_URL}/assets/positive-feedback-report-image3x.png`}
        />
      )}
      <Footer>
        {/* <FooterBorder /> */}
        <FooterLogo
          src={`${process.env.PUBLIC_URL}/assets/positive-feedback-footer-logo3x.png`}
        />
        <FooterText>
          Copyright &copy; BLOOM COMPANY. All rights reserved.
        </FooterText>
      </Footer>
    </Contaienr>
  );
}

export default A4;
