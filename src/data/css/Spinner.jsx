import styled from "styled-components";

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

export const SpinnerRed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: whitesmoke;
  animation: rotate 0.6s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerBlue = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid transparent;
  border-left-color: whitesmoke;
  animation: rotate 0.6s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerGreen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid transparent;
  border-right-color: whitesmoke;
  animation: rotate 0.6s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
