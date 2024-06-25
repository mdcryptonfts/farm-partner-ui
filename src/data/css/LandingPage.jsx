import styled from "styled-components";

export const MainSection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 80px;

  h2 {
    width: 100%;
    max-width: 700px;
    padding: 0px 15px 0px 15px;
    font-size: 72px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${props => props.theme.primary};
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
    color: ${props => props.theme.primary};
    text-align: center;
    margin-top: 10px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    max-width: 90%;
    color: ${props => props.theme.onPrimary};
    height: 40px;
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
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
  background: ${props => props.theme.customGradient};

  h2 {
    width: 100%;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    color: ${props => props.theme.primary};
  }

  p {
    color: ${props => props.theme.onBackground};
    width: 100%;
    text-align: center;
    letter-spacing: 0.7px;
    font-weight: 500;
  }
`;

export const FeatureCard = styled.div`
  width: 400px;
  height: 220px;
  background-color: ${props => props.theme.surface};
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
    color: ${props => props.theme.primary};
  }

  p {
    position: absolute;
    top: 130px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: ${props => props.theme.onSurface};
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
    background-color: ${props => props.theme.primary};
    border-radius: 7px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    fill: ${props => props.fill && props.fill};
    stroke: ${props => props.stroke && props.stroke};
    width: 50px;
    height: 50px;
  }
`;
