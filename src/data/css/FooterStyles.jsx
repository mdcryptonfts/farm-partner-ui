import styled from "styled-components";

export const FooterCont = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  max-height: auto;
  margin-left: 0px;
  margin-right: 0px;
  background: ${props => props.theme.customGradient};
  box-shadow: 0px 0px 2px 0.5px ${props => props.theme.secondary};
  flex-wrap: wrap;

  padding-bottom: 1em;
  padding-left: 1em;

  color: white;

  a {
    :hover {
      color: ${props => props.theme.primary};
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
  color: ${props => props.theme.primary};
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
  color: ${props => props.theme.primary};
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
    color: ${props => props.theme.onBackground};

    svg{
        fill: ${props => props.theme.primary};
        width: 20px;
        height: 20px;
        transition: fill 0.3s;

        :hover{
            fill: ${props => props.theme.onBackground}
            cursor: pointer;
        }
    }
`;


export const Slider = styled.div`
  width: 50px;
  height: 25px;
  background-color: ${(props) => (props.theme.surface)};
  border-radius: 30px;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.5s ease;

  svg{
    position: absolute;
    fill: ${props => props.theme.onSurface};
    width: 20px;
    height: 25px;
    top: 0px;
    left: ${props => props.toggled ? "5px" : "25px"};
    opacity: ${props => props.toggled && "50%"};

    :hover{
        fill: ${props => props.theme.onSurface};
    }     
  }
`;

export const SliderCircle = styled.div`
  width: 21px;
  height: 21px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.5s ease;
  left: ${(props) => (props.toggled ? 'calc(100% - 10px)' : '10px')};
 
`;