import styled from "styled-components";
import config from "../config.json";

export const NotFoundWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 80px;

  h2 {
    width: 100%;
    font-size: 124px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${config.theme.darkBlue};
    text-align: center;
  }

  h3 {
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1px;
    color: white;
    text-align: center;
    margin-top: 20px;
  }

  p {
    width: 300px;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: ${config.theme.darkBlue};
    text-align: center;
    margin-top: 10px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    max-width: 90%;
    color: white;
    height: 40px;
    background-color: ${config.theme.darkBlue};
    border-radius: 10px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }
`;
