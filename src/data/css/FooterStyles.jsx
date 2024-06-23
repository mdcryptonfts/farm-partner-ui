import styled from "styled-components";
import config from "../config.json";

export const FooterCont = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  max-height: auto;
  margin-left: 0px;
  margin-right: 0px;
  //background-color: ${config.theme.backgroundDark};
  background: rgb(156, 207, 225);
  background: -moz-radial-gradient(
    circle,
    rgba(156, 207, 225, 1) 0%,
    rgba(116, 178, 209, 1) 58%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(156, 207, 225, 1) 0%,
    rgba(116, 178, 209, 1) 58%
  );
  background: radial-gradient(
    circle,
    rgba(156, 207, 225, 1) 0%,
    rgba(116, 178, 209, 1) 58%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#9ccfe1",endColorstr="#74b2d1",GradientType=1);
  box-shadow: 0px 0px 2px 0.5px ${config.theme.textSecondary};
  flex-wrap: wrap;

  padding-bottom: 1em;
  padding-left: 1em;

  color: white;

  a {
    :hover {
      color: ${config.theme.darkBlue};
    }
  }

  @media (max-width: 648px) {
    display: block;
  }
`;

export const FooterHref = styled.a`
  display: block;
  padding-top: 7px;
  letter-spacing: 0.7px;
  transition: color 0.5s;
`;

export const FooterLeft = styled.div`
  width: 30%;
  max-width: 30%;

  @media (max-width: 840px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const FooterRight = styled.div`
  display: flex;
  width: 70%;
  max-width: 70%;

  @media (max-width: 840px) {
    width: 100%;
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

export const FooterColumn = styled.div`
  width: 33%;
  max-width: 33%;
  height: 100%;

  @media (max-width: 840px) {
    width: 100%;
    max-width: 100%;
    flex-wrap: wrap;
    padding-left: 25px;
    height: auto;
  }
`;

export const ColumnTitle = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: ${config.theme.darkBlue};
  padding-top: 2em;
  letter-spacing: 0.7px;
`;

export const ColumnLinks = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: white;
  padding-left: 0.2em;
  padding-top: 1em;
`;

export const FooterLogo = styled.img`
  margin-top: 30px;
  width: 150px;
  max-width: 150px;
  height: auto;
  max-height: 75px;
  margin-left: 20px;
  margin-right: 15px;
  float: left;
`;

export const FooterBrandText = styled.div`
  margin-top: 30px;
  height: auto;
  max-height: 75px;
  margin-left: 20px;
  margin-right: 15px;
  float: left;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.8px;
  color: ${config.theme.darkBlue};
`;

export const FooterWaxDAOText = styled.div`
  height: 80px;
  padding-top: 1.6em;
  z-index: 5000;
  font-size: 16px;
`;
export const SocialIconsDiv = styled.div`
    width: 100%;
    padding-top: 40px;
    padding-right: 70px;
    padding-bottom: 20px;
    
    display: flex;
    justify-content: right;
    gap: 20px;
    color: ${config.theme.primary};

    svg{
        fill: ${config.theme.darkBlue};
        width: 20px;
        height: 20px;
        transition: fill 0.3s;

        :hover{
            fill: ${config.theme.textMain}
            cursor: pointer;
        }
    }
`;
