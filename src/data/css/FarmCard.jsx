import styled from "styled-components";

export const FarmCardWrapper = styled.div`
  position: ${props => props.position ? props.position : "relative"};
  height: ${(props) => (!props.show ? "100px" : props.height ? props.height : "495px")};
  width: 90%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 14px;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.onSurface};
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.secondaryAccent};
  transition: height 0.3s;
`;

export const FarmDetailsWrapper = styled.div`
  background-color: ${props => props.theme.surface};
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
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.onSurface};
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.secondaryAccent};
  transition: height 0.3s;
`;

export const RewardPoolWrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 12px;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.onSurface};
  padding: 10px;
  height: ${(props) => props.height && props.height};
  margin-top: ${(props) => (props.top ? props.top : "25px")};
  border-radius: 10px;
  border: 1px solid ${props => props.theme.secondaryAccent};

  a {
    color: ${props => props.theme.primary};
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
    color: ${props => props.theme.primary};
    border: 1px solid ${props => props.theme.primary};
    letter-spacing: 1px;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const WideOnly = styled.div`
  @media(max-width: ${props => props.breakPoint}) {
    display: none;
  }
`;