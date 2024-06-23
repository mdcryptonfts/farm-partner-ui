import styled from "styled-components";
import config from "../config.json";

export const MainSection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 80px;

  h2 {
    width: 100%;
    padding: 0px 15px 0px 15px;
    font-size: 72px;
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
    margin-top: 15px;
  }

  @media (max-width: 680px) {
    padding-top: 40px;

    h2 {
      font-size: 48px;
    }
  }
`;

export const FeaturesWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: auto;
  min-height: 100px;
  gap: 25px;
  padding: 25px;
  padding-top: 40px;
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

  h2 {
    width: 100%;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    color: ${config.theme.darkBlue};
  }

  p {
    width: 100%;
    text-align: center;
    letter-spacing: 0.7px;
    font-weight: 500;
  }
`;

export const FeatureCard = styled.div`
  width: 400px;
  height: 220px;
  background-color: ${config.theme.background};
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  h3 {
    position: absolute;
    top: 90px;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: ${config.theme.darkBlue};
  }

  p {
    position: absolute;
    top: 130px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: ${config.theme.darkGrey};
    padding: 0px 10px 0px 10px;

    @media (max-width: 450px) {
      font-size: 10px;
    }
  }

  button {
    position: absolute;
    top: 150px;
    width: 90%;
    left: 5%;
    color: white;
    height: 60px;
    background-color: ${config.theme.darkBlue};
    border-radius: 7px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    fill: ${props => props.fill ? props.fill : config.theme.darkGrey};
    stroke: ${props => props.stroke && props.stroke};
    width: 50px;
    height: 50px;
  }
`;
