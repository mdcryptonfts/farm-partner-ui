import styled from "styled-components";
import config from "../config.json";

export const LogoPlusHeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 24px;
    color: ${config.theme.darkBlue};
    font-weight: 600;
  }

  svg {
    position: absolute;
    width: 35px;
    height: 35px;
    fill: ${config.theme.darkBlue};
    top: 0px;
    left: 20%;
  }
`;

export const LPLockContainer = styled.div`
  width: 500px;
  background-color: ${config.theme.secondaryDark};
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  padding-bottom: 25px;
  box-shadow: 1px 1px 3px 0px ${config.theme.secondaryLight};

  h2 {
    font-size: 24px;
    color: ${config.theme.textMain};
    font-weight: 600;
  }

  @media (max-width: 560px) {
    width: 95%;
  }
`;

export const FoldersRowCentered = styled.div`
  width: 100%;
  height: 30px;
  font-size: 14px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 450px) {
    font-size: 10px;
  }

  @media (max-width: 375px) {
    font-size: 8px;
  }
`;

export const ChooseExchangeCont = styled.div`
  width: 90%;
  padding: 1em;
  background-color: #161616;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

export const ChooseExchangeButton = styled.button`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${config.theme.secondaryLight};
  margin-top: 15px;
  height: 45px;
  font-weight: 600;

  img {
    display: inline-block;
    width: auto;
    height: 90%;
    //border: 1px solid green;
  }

  :hover {
    border: 1px solid ${config.theme.textMain};
    transform: scale(1.05);
    transition: transform 0.2s;
  }
`;

export const ChooseTokenButton = styled.button`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${config.theme.secondaryLight};
  margin-top: 15px;
  height: 45px;
  font-weight: 600;

  :hover {
    border: 1px solid ${config.theme.textMain};
    transform: scale(1.05);
    transition: transform 0.2s;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  padding-top: 30px;
  background-color: transparent;
  box-sizing: border-box;
  display: block;
  justify-content: center;
  //flex-wrap: wrap;
  vertical-align: middle;

  h2 {
    color: ${config.theme.primary};
    font-weight: 600;
    font-size: 16px;
    width: 100%;
  }

  h3 {
    width: 100%;
    padding-top: 5px;
    font-size: 12px;
    color: ${config.theme.textSecondary};
  }
`;

export const LockAmountInput = styled.div`
  width: 100%;

  input {
    background-color: transparent;
    border: 1px solid ${config.theme.secondaryLight};
    border-radius: 7px;
    padding: 5px;
    padding-left: 10px;
    width: ${(props) => (props.wide ? "90%" : "auto")};

    :focus {
      outline: 2px solid ${config.theme.primary};
    }
  }

  select {
    background-color: transparent;
    border: 1px solid ${config.theme.secondaryLight};
    border-radius: 7px;
    padding: 5px;
    padding-left: 10px;
    width: ${(props) => (props.wide ? "90%" : "auto")};

    :focus {
      outline: 2px solid ${config.theme.primary};
    }
  }

  textarea {
    background-color: transparent;
    border: 1px solid ${config.theme.secondaryLight};
    border-radius: 7px;
    padding: 5px;
    padding-left: 10px;
    width: ${(props) => (props.wide ? "90%" : "auto")};
    max-width: ${(props) => (props.wide ? "90%" : "100%")};
    resize: ${(props) => (props.allowResize ? "auto" : "none")};

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

    :focus {
      outline: 2px solid ${config.theme.primary};
    }
  }

  h3 {
    width: 100%;
    padding-top: 5px;
    font-size: 12px;
    color: ${config.theme.textSecondary};
  }
`;

export const Slider = styled.input`
  max-width: 100%;
  height: 24px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 300px;
  background: transparent; // Make the slider background transparent
  border: none; // Remove any border

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #bcbcbc;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 2px #000000;
    border: 0px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: ${config.theme.primary};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6.5px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #bcbcbc;
  }
  &::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #bcbcbc;
    border-radius: 1px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 2px #000000;
    border: 0px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: ${config.theme.primary};
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #bcbcbc;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-fill-upper {
    background: #bcbcbc;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 2px #000000;
    border: 0px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: ${config.theme.primary};
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #bcbcbc;
  }
  &:focus::-ms-fill-upper {
    background: #bcbcbc;
  }
`;

export const DarkBgTextBox = styled.div`
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${config.theme.secondaryDarker};

  a {
    color: ${config.theme.primary};
  }

  h2 {
    color: ${config.theme.textMain};
    font-size: 18px;
  }

  p {
    padding-top: 0px;
    color: ${config.theme.textSecondary};
    font-size: 12px;
    margin-top: 0px;
  }
`;
