import styled from "styled-components";
import config from "../config.json";

export const MobileSidebar = styled.div`
  z-index: 15001;
  position: fixed;
  right: ${(props) => (props.isOpen == false ? "-190vw" : "0px")};
  height: 100vh;
  width: 90vw;
  background-color: ${config.theme.secondaryDark};
  box-shadow: 0px 2px 4px 0px ${config.theme.primary};
  transition: right 0.5s;

  @media (min-width: 901px) {
    display: none;
  }

  select {
    background-color: ${config.theme.secondaryMedium};
    border-radius: 3px;
    :focus {
      outline: none;
    }
  }
`;

export const LargeScreenNavDropDown = styled.div`
  z-index: 15001;
  position: fixed;
  right: ${(props) => (props.isOpen == false ? "-190vw" : "30px")};
  top: ${(props) => (props.isOpen == false ? "-180vh" : "90px")};
  height: 80vh;
  width: 290px;
  background-color: ${config.theme.secondaryDark};
  border-radius: 10px;
  box-shadow: -2px 2px 4px 0px ${config.theme.primary};
  transition: top 0.5s;

  @media (max-width: 900px) {
    display: none;
  }

  select {
    background-color: ${config.theme.secondaryMedium};
    border-radius: 3px;
    :focus {
      outline: none;
    }
  }
`;

export const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  background-color: #1c1c1c;
  opacity: 80%;
  @media (min-width: 901px) {
    //display: none;
  }
`;

export const SidebarLinksGap = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
`;

export const CloseSidebarButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

export const SidebarLinkContainer = styled.button`
  //display: inline-block;
  padding-left: 35px;
  vertical-align: middle;
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  text-align: left;
  font-weight: ${(props) =>
    props.navLocation == props.currentNavbarLocation ? 900 : 400};
  color: ${(props) =>
    props.navLocation == props.currentNavbarLocation
      ? theme2024.primary
      : theme.textSecondary};
  //border-bottom: ${(props) =>
    props.navLocation == props.currentNavbarLocation &&
    "3px solid " + theme2024.primary};
  margin-top: 5px;

  cursor: default;
`;
export const SidebarScrollWrapper = styled.div`
  height: 80%;
  overflow-y: scroll;
  padding-bottom: 5em;
`;

export const WaxAccountButton = styled.button`
  //padding-left: 35px;
  vertical-align: middle;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  text-align: left;
  font-weight: 400;
  margin-top: 10px;
  margin-right: 10px;
  cursor: default;
`;

export const WaxAccountInnerCont = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 12px;
  text-align: left;
  padding: 0.5em;
  background-color: ${config.theme.offWhite};
  border: 1px solid ${config.theme.offWhiteDarker};
  border-radius: 7px;
  color: ${config.theme.darkBlue};
  cursor: default;
  height: 40px;

  img {
    width: 15px;
    height: 15px;
    display: inline-block;
  }
`;

export const WaxAccountLeft = styled.div`
  width: 12%;
`;

export const WaxAccountMiddle = styled.button`
  width: 60%;
  text-align: left;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding-top: 2px;
`;

export const WaxAccountGap = styled.div`
  width: 16%;
`;

export const WaxAccountRight = styled.button`
  width: 12%;
`;
