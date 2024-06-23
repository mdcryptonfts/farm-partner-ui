import styled from "styled-components";
import config from "../config.json";

export const LargeNavWrapper2024 = styled.div`
  width: 100%;
  max-width: 100%;
  position: fixed;
  z-index: 15000;
  top: 0px;
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
  border-bottom: 1px solid ${config.theme.textMain};
  height: 110px;
  bottom: 0px;
  color: white;
  text-align: center;
  font-size: 12px;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const LargeNav2024TopWrapper = styled.div`
  width: 100%;
  height: 45px;
  border-bottom: 1px solid ${config.theme.textMain};
  display: flex;
  align-items: center;
  padding-left: 10px;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const LargeNavTopLeftWrapper = styled.div`
  width: auto;
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

export const LargeNavTopRightWrapper = styled.div`
  width: auto;
  display: flex;
  max-width: 20%;
  justify-content: right;
  height: 100%;
  padding-right: 10px;
  align-items: center;
`;

export const LargeNav2024TopItem = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  color: ${config.theme.textMain};
  box-sizing: border-box;
  padding-top: 5px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const LargeNavbar2024LoginButton = styled.button`
  width: 150px;
  border: 1px solid white;
  border-radius: 5px;
  height: 30px;
  color: white;
  font-weight: 500;
  text-align: center;
  transition: color 1s, border-color 1s;

  :hover {
    color: ${config.theme.darkBlue};
    border-color: ${config.theme.darkBlue};
  }
`;

export const LargeNav2024BottomWrapper = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  justify-content: left;
  box-sizing: border-box;

  h2 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: ${config.theme.darkBlue};
  }

  img {
    width: 150px;
    height: auto;
  }
`;

export const LargeNav2024LinksWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: left;
  box-sizing: border-box;
  width: 750px;
  padding-left: 10px;
`;

export const LargeNav2024LinkButton = styled.button`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  color: ${config.theme.textMain};
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 14px;
  display: flex;
  transition: color 0.7s;
  position: relative;

  svg {
    fill: ${config.theme.darkBlue};
    width: 20px;
    margin-right: 5px;
    height: auto;
  }

  :hover {
    color: ${config.theme.textMain};
  }
`;

export const LargeNavLinkDropDown = styled.div`
  position: absolute;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "100%" : "0%")};
  transition: visibility 0s, opacity 0.5s;
  top: 45px;
  left: 50%;
  transform: translate(-50%, 0%);
  min-width: 180px;
  width: auto;
  height: auto;
  max-height: 400px;
  white-space: nowrap;
  border-radius: 15px;
  border: 1px solid ${config.theme.offWhiteDarker};
  background-color: ${config.theme.offWhite};
  padding-top: 10px;
  padding-bottom: 15px;
`;

export const LargeNavDropDownInnerWrapper = styled.div`
  overflow-y: scroll;
  white-space: nowrap;
  height: auto;
  max-height: 380px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;

  &::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${config.theme.primary};
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  //Firefox
  scrollbar-color: ${config.theme.primary} transparent;
  scrollbar-width: thin;
`;

export const LargeNavLinkDropDownRow = styled.div`
  width: 100%;
  color: ${config.theme.darkBlue};
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 400;
  transition: opacity 0.5s;
  text-align: left;
  padding: 10px;
  padding-bottom: 5px;

  :hover {
    opacity: 100%;
  }

  p {
    text-align: center;
    display: inline-block;
    width: 50px;
    color: ${config.theme.textMain};
    background-color: ${config.theme.danger};
    border-radius: 5px;
    font-weight: 600;
    padding: 3px;
    margin-left: 7px;
  }
`;

export const LargeNav2024SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  mix-width: 200px;
  flex-grow: 1;
  box-sizing: border-box;
  height: 100%;
  justify-content: right;
  padding-right: 15px;

  input {
    width: 200px;
    outline: none;
    background-color: ${config.theme.darkGrey};
    border-radius: 7px;
    padding: 10px;
    padding-left: 15px;
    font-size: 12px;
    font-weight: 600;
  }
`;

export const UserDropDown = styled.div`
  z-index: 15011;
  position: fixed;
  right: 10px;
  top: 50px;
  bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "100%" : "0%")};
  transition: visibility 0s, opacity 0.5s;
  width: 350px;

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

  border: 1px solid ${config.theme.textSecondaryDarker};
  border-radius: 15px;
`;
export const UserDrowDownInnerScrollWrapper = styled.div`
  overflow-y: scroll;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${config.theme.darkBlue};
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  //Firefox
  scrollbar-color: ${config.theme.darkBlue} transparent;
  scrollbar-width: thin;
`;

export const UserDropDownTopSection = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: left;
  box-sizing: border-box;
`;

export const UserDropDownTopLeft = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  align-items: center;
  padding-left: 5px;
`;

export const UserDropDownAvatarCont = styled.div`
  width: 15px;
  height: 15px;
  text-align: center;
  background-color: ${config.theme.darkGrey};
  border-radius: 50%;
`;
export const UserDropDownUserNameCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${config.theme.textMain};
  padding-left: 10px;

  h3 {
  }

  p {
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    color: ${config.theme.textSecondaryDarker};
  }
`;
export const UserDropDownBalancesCont = styled.div`
  width: 400px;
  max-width: 90%;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 10px;
  height: 125px;

  @media (max-width: 1100px) {
    margin-left: 10px;
    margin-right: unset;
  }

  h3 {
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    padding: 10px;
    padding-bottom: 5px;
    color: ${config.theme.darkBlue};
  }

  h4 {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding-left: 10px;
    letter-spacing: 0.7px;
  }

  a {
    display: flex;
    align-items: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: 30px;
    margin-top: 10px;
  }
`;

export const UserDropDownBuyWaxDaoButton = styled.button`
  width: 100%;
  height: 30px;
  color: white;
  text-align: center;
  transition: color 1s, border-color 1s;
  background-color: ${config.theme.darkBlue};
  border-radius: 7px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);

`;

export const UserDropDownLinkButton = styled.div`
  width: 95%;
  height: 60px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${config.theme.offWhite};
  border: 1px solid ${config.theme.offWhiteDarker};
  border-radius: 7px;
  transition: background-color 0.5s;

  h3 {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.7px;
    color: ${config.theme.darkBlue};
  }

  p {
    color: ${config.theme.darkGrey};
    font-size: 12px;
  }

  :hover {
    cursor: pointer;
  }
`;

export const UserDropDownWalletsSeparator = styled.div`
  width: 95%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  height: 5px;
  border-bottom: 1px solid ${config.theme.darkGrey};
`;

export const UserDropDownWalletsTitleCont = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 0px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: white;
  }

  button {
    margin-left: 15px;
    font-size: 30px;
    font-weight: 600;
    text-align: right;
    color: ${config.theme.darkBlue};

    svg {
      fill: ${config.theme.textMain};
      width: 20px;
      height: 20px;
      stroke: ${config.theme.textMain};
    }
  }
`;

export const SmallNavWrapper2024 = styled.div`
  width: 100%;
  max-width: 100%;
  position: fixed;
  z-index: 15000;
  top: 0px;
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
  height: 45px;
  bottom: 0px;
  color: white;
  text-align: center;
  font-size: 12px;

  @media (min-width: 1101px) {
    display: none;
  }
`;

export const SmallNav2024SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  mix-width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  height: 100%;
  justify-content: center;
  padding-right: 15px;
  padding-right: 15px;

  input {
    width: 90%;
    outline: none;
    background-color: ${config.theme.darkGrey};
    border-radius: 7px;
    padding: 10px;
    padding-left: 15px;
    font-size: 12px;
    font-weight: 600;
  }
`;

export const SmallNavTopLeftWrapper = styled.div`
  width: auto;
  display: flex;
  max-width: 70%;
  height: 100%;
  padding-top: 10px;
  padding-left: 15px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: ${config.theme.darkBlue};
  }

  img {
    height: 25px;
    width: auto;
  }
`;

export const SmallNavTopRightWrapper = styled.div`
  width: auto;
  display: flex;
  max-width: 20%;
  justify-content: right;
  height: 100%;
  padding-right: 10px;
  align-items: center;

  svg {
    transition: fill 0.5s, stroke 0.5s;
    width: 25px;
    height: 25px;
    fill: white;
    margin-right: 10px;
    stroke: ${(props) => (props.open ? config.theme.textMain : "none")};

    :hover {
      fill: ${config.theme.darkBlue};
      cursor: pointer;
      stroke: ${(props) => (props.open ? config.theme.primary : "none")};
    }
  }
`;

export const SmallNavDropDown = styled.div`
  position: fixed;
  width: 400px;
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  bottom: 0px;
  z-index: 15011;
  padding-top: 10px;
  padding-bottom: 10px;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "100%" : "0%")};
  transition: visibility 0s, opacity 0.5s;

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

  @media (min-width: 1101px) {
    display: none;
  }
`;

export const SmallNavWelcomeWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: left;
  box-sizing: border-box;
`;

export const SmallNavWelcomeInnerCont = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  box-sizing: border-box;
`;

export const SmallNavWelcomeSvgWrapper = styled.div`
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 50px;
    height: 50px;
    fill: ${config.theme.primary};
  }
`;

export const SmallNavWelcomeRightCont = styled.div`
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  flex-wrap: wrap;

  h3 {
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.7px;
    color: ${config.theme.textSecondaryDarker};
    margin: 0px;
  }

  h4 {
    margin: 0px;
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    color: ${config.theme.textMain};
  }
`;

export const SmallNavLoginButtonWrapper = styled.div`
  width: 100%;
  padding-left: 25px;
  display: flex;
  justify-content: left;
  box-sizing: border-box;
`;

export const SmallNavbar2024LoginButton = styled.button`
  width: 200px;
  border-radius: 5px;
  height: 30px;
  background-color: ${config.theme.darkBlue};
  color: white;
  text-align: center;
  margin-bottom: 15px;
`;

export const SmallScreenWalletsWrapper = styled.div`
  width: 100%;
  height: ${(props) => !props.open && "0px"};
  overflow-y: ${(props) => !props.open && "hidden"};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "100%" : "0%")};
  transition: visibility 0s, opacity 0.5s;
  margin-bottom: 15px;
`;

export const SmallNavLinkWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${config.theme.primary};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  justify-content: left;

  h3 {
    padding-left: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${config.theme.textMain};
    letter-spacing: 0.7px;
  }
`;

export const SmallNavLinkSvgWrapper = styled.div`
  width: 30px;
  height: 30px;

  svg {
    height: 25px;
    width: 25px;
    fill: ${config.theme.primary};
  }
`;

export const SmallNavLinkRightSvgWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-grow: 1;
  justify-content: right;

  svg {
    height: 25px;
    width: 25px;
    fill: ${config.theme.textMain};
    stroke: ${config.theme.textMain};
  }
`;

export const SmallNavSecondaryLinkWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  height: ${(props) => !props.open && "0px"};
  overflow-y: ${(props) => !props.open && "hidden"};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "100%" : "0%")};
  transition: visibility 0s, opacity 0.5s;
`;

export const SmallNavSecondaryLink = styled.div`
  width: 100%;
  color: ${config.theme.textSecondaryDarker};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.7px;
  padding-top: 5px;
  padding-left: 5px;
  transition: color 0.3s;

  :hover {
    color: ${config.theme.textMain};
  }

  p {
    text-align: center;
    display: inline-block;
    width: 50px;
    color: ${config.theme.textMain};
    background-color: ${config.theme.danger};
    border-radius: 5px;
    font-weight: 600;
    padding: 3px;
    margin-left: 7px;
  }
`;

export const SmallNavBottomWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${config.theme.darkBlue};
  padding-top: 10px;
  padding-bottom: 70px;
  color: ${config.theme.textSecondaryDarker};
`;

export const CloseDivXIconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 10px;
  padding-top: 15px;

  svg {
    width: 20px;
    height: 20px;
    stroke: ${config.theme.textMain};
  }
`;

export const SmallNavSocialIconsDiv = styled.div`
    width: 100%;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 15px;
    display: flex;
    justify-content: left;
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

export const LargeNavSocialIconsDiv = styled.div`
  width: auto;
  padding-top: 13px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  gap: 20px;
  color: ${config.theme.primary};

  svg {
    fill: ${config.theme.darkBlue};
    width: 20px;
    height: 20px;
    transition: fill 0.3s;

    :hover {
      fill: white;
      cursor: pointer;
    }
  }
`;
