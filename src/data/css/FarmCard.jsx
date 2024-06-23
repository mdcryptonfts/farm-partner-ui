import styled from "styled-components";
import config from "../config.json";

export const FarmCardWrapper = styled.div`
  position: relative;
  height: ${(props) => (!props.show ? "100px" : props.height ? props.height : "495px")};
  width: 90%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 14px;
  //font-weight: 500;
  background-color: white;
  color: ${config.theme.darkGrey};
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  border: 1px solid ${config.theme.offWhiteDarker};
  transition: height 0.3s;
`;

export const FarmDetailsWrapper = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);

  position: absolute;
  top: 99px;
  height: ${(props) =>
    !props.show ? "0px" : props.height ? props.height : "405px"};
  width: 100%;
  left: 0px;
  visibility: ${(props) => !props.show && "hidden"};
  overflow: hidden;
  transition: height 0.3s, visibility 0.3s;
`;

export const FarmManagerCardWrapper = styled.div`
  position: relative;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 14px;
  //font-weight: 500;
  background-color: white;
  color: ${config.theme.darkGrey};
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  border: 1px solid ${config.theme.offWhiteDarker};
  transition: height 0.3s;
`;

export const RewardPoolWrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 12px;
  background-color: ${config.theme.offWhite};
  color: ${config.theme.darkGrey};
  padding: 10px;
  height: ${(props) => props.height && props.height};
  margin-top: ${(props) => (props.top ? props.top : "25px")};
  border-radius: 10px;
  border: 1px solid ${config.theme.offWhiteDarker};

  a {
    color: ${config.theme.darkBlue};
    font-weight: 600;
  }
`;

export const ShowDetailsButton = styled.button`
  position: absolute;
  top: 65px;
  height: 25px;
  width: 90%;
  left: 5%;
  border: 1px solid gray;
  border-radius: 7px;
  transition: color 0.3s, border 0.3s, letter-spacing 0.15s,
    background-color 0.15s;

  :hover {
    color: ${config.theme.darkBlue};
    border: 1px solid ${config.theme.darkBlue};
    letter-spacing: 1px;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
