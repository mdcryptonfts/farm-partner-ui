import styled from "styled-components";

export const InputWrapper = styled.div`
  width: 100%;

  input,
  select {
    font-size: 18px;
    color: ${props => props.theme.onSurface};
    background-color: ${props => props.theme.secondary};
    border: 1px solid ${props => props.theme.secondaryAccent};
    border-radius: 7px;
    padding: 5px;
    padding-left: 10px;
    width: ${(props) => (props.wide ? "90%" : "auto")};

    :focus {
      outline: none;
      border: 1px solid ${props => props.theme.onSurface};
    }
  }

  textarea {
    background-color: transparent;
    border: 1px solid ${props => props.theme.secondary};
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
      background-color: ${props => props.theme.onSurface};
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    //Firefox
    scrollbar-color: ${props => props.theme.primary} transparent;
    scrollbar-width: thin;

    :focus {
      outline: 2px solid ${props => props.theme.primary};
    }
  }

  h3 {
    width: 100%;
    padding-top: 5px;
    font-size: 12px;
    color: ${props => props.theme.secondary};
  }

  h4 {
    width: 100%;
    padding-top: 5px;
    font-size: 12px;
    color: ${props => props.theme.onSurface};
  }
`;

export const StakeContainer = styled.div`
  width: 500px;
  background-color: ${(props) => (props.bg ? props.bg : props.theme.surface)};
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  padding: ${(props) => (props.padding ? props.padding : "15px")};
  text-align: center;
  border-radius: 15px;
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "25px"};
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);

  span {
    font-size: 12px;
    color: ${props => props.theme.onSurface};
  }

  h2 {
    font-size: 24px;
    color: ${props => props.theme.primary};
    font-weight: 600;
  }

  @media (max-width: 560px) {
    width: 95%;
  }
`;

export const SpaceBetweenDiv = styled.div`
  display: flex;
  position: ${(props) => props.top && "absolute"};
  top: ${(props) => props.top && props.top};
  padding-left: ${(props) => props.top && "10px"};
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  margin-bottom: 5px;
  justify-content: space-between;
  color: ${(props) => props.theme.onSurface};

  .token-logo {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-bottom: 4px;
    margin-left: 5px;
  }

  @media (max-width: 535px) {
    flex-wrap: ${(props) => props.wrap && "wrap"};
  }
`;

export const ClickableP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
