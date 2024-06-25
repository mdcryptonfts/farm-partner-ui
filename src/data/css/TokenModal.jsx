import styled from "styled-components";
import config from "../config.json";

export const ModalContent = styled.div`
  color: white;
  font-size: 14px;
  a {
    color: ${props => props.theme.primary};
  }
`;

export const SelectTokenModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15011;

  width: 420px;
  border: 1px solid #2e2d2d;
  border-radius: 10px;
  height: 480px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background-color: ${props => props.theme.modalBackground};
  text-align: center;

  @media (max-width: 480px) {
    width: 98%;
  }
`;

export const SelectTokenHeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  color: ${props => props.theme.onPrimary};
  font-weight: 400;
  padding: 10px;
  text-align: left;
  margin-bottom: 15px;
`;

export const SelectTokenRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 18px;

  img {
    width: 25px;
    height: 25px;
  }

  button {
    display: inherit;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px;
    width: 100%;
    :hover {
      background-color: rgba(99, 99, 99, 0.3);
      transition: background-color 0.3s;
    }
  }
`;
export const SelectTokenRowTokenName = styled.div`
  padding-left: 7px;
  font-size: 16px;
  font-weight: 300;
  //border: 1px solid green;

  span {
    color: ${props => props.theme.secondaryDarker};
    font-size: 12px;
    font-weight: 400;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const SelectTokenRowTokenAmount = styled.div`
  flex-grow: 1;
  text-align: right;
  font-size: 18px;
  color: ${props => props.theme.onModal};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const SelectTokenModalInnerWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 80%;
  max-height: 80%;
  background-color: #1c1c1b;
  text-align: left;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;

  -ms-overflow-style: scrollbar; /* IE and Edge */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.secondary} black;

  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.secondary};
  }

  ::-webkit-scrollbar-track {
    background: #dfdcdc40;
  }

  a {
    color: ${props => props.theme.primary};
  }
`;
