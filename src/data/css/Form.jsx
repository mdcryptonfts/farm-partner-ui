import styled from "styled-components";

export const LogoPlusHeaderWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 24px;
    color: ${props => props.theme.primary};
    font-weight: 600;
  }

  svg {
    position: absolute;
    width: 35px;
    height: 35px;
    fill: ${props => props.theme.primary};
    top: 0px;
    left: 20%;
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
