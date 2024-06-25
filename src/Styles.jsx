import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  body {
    font-family: 'Exo', sans-serif;
  }

  .stake-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    font-weight: 500;
    letter-spacing: 0.7px;
    color: ${({ theme }) => theme.onPrimary};
    height: 60px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 7px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  }  
`


export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: ${props => props.theme.background};
`


export const Body = styled.div`
    min-height: 80vh;
    padding: 0px;
    background-color: ${props => props.theme.background};
`

export const CheckboxContainer = styled.div`

  font-size: 14px;

  img{
    width: 20px;
    height: 20px;
  }

  div{
    width: 20px;
    height: 20px;
    border: 1px solid ${props => props.theme.primary};
    border-radius: 3px;
  }

  :hover{
    cursor: pointer;
  }
`;

export const CloseModalButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 900;
  border: 1px solid white;
  margin-top: 1em;

  @media (max-width: 500px) {
      font-size: 14px;
  }

  color: ${props => props.theme.onPrimary};

  :hover{
      background-color: ${props => props.theme.onPrimary};
      color: ${props => props.theme.primary};
      transition: background-color 1s;
  }
`


export const NewRow = styled.div`
    flex-basis: 100%;
`

export const PageWrapper2024 = styled.div`
    width: 100vw;
    max-width: 100%;
    min-height: 900px;
    margin-left: 0px; 
    margin-right: 0px;
    margin-top: ${props => props.profile ? '0px' : '70px'};
    padding-bottom: 2em;
    padding-top: ${props => props.profile ? '0px' : '50px'};
    color: ${props => props.theme.onBackground};
    word-wrap: break-word;
    overflow: hidden;

    background: ${props => props.theme.customGradient};
    
    @media (max-width: 1100px) {
        margin-top: ${props => props.profile ? '0px' : '45px'};
    }

    @media (max-width: 900px) {
        height: auto;
    }

`

export const PageBody2024 = styled.div`
    width: ${props => props.fullWidth ? '100%' : '900px'};
    min-height: 900px;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    overflow: hidden;

    @media (max-width: 1020px) {
        width: ${props => props.fullWidth ? '100%' : '700px'};
    }

    @media (max-width: 760px) {
        width: ${props => props.fullWidth ? '100%' : '620px'};
    }   
    
    @media (max-width: 630px) {
        width: ${props => props.fullWidth ? '100%' : '98%'};
    }       
`

export const Modal2024 = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 15011;
    width: 450px;
    max-width: 90%;
    height: auto;
    max-height: 70%;
    background-color: ${props => props.theme.modalBackground};
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 15px;
    overflow-x: scroll;

    @media (max-width: 900px) {
        margin-top: 50px; 
    }
`

export const ModalContent2024 = styled.div`
    padding-top: 30px;
    color: ${props => props.theme.onBackground};
    font-size: 14px;
    a{
        color: ${props => props.theme.primary};
    }
    

`

export const ModalErrorCont = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;

    svg{
        width: 50px;
        height: 50px;
        fill: ${props => props.theme.danger};
    }
`
export const ModalSuccessCont = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;

    svg{
        width: 50px;
        height: 50px;
        fill: ${props => props.theme.success};
    }
`

export const ModalOverlay2024 = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15010;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 80%;
    
`

export const HeaderCont2024 = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    h2 {
        color: ${props => props.theme.primary};
        font-weight: 700;
        font-size: 28px;
    }

    h3 {
        color: ${props => props.theme.primary};
        font-weight: 500;
        font-size: 16px;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1em;
    }

    @media (max-width: 760px) {
        flex-wrap: wrap;
        flex-direction: column;
        align-items: stretch;

        div {
            text-align: center;
            width: 100%;
            flex-basis: 100%;
            padding: 0.3em;
        }

        h3 {
            font-size: 14px;
        }        
    }
`

export const FoldersContainer2024 = styled.div`
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    clear: both;
`
export const FolderTab2024 = styled.button`
    display: inline-block;
    width: 175px;
    border-bottom: ${props => props.selected == true ? `2px solid ${props.theme.primary}` : 'none'};
    height: 30px;
    color: ${props => props.selected == true ? props.theme.primary : props.color ? props.color : 'white' };
    font-weight: 500;

    :hover{
        color: ${props => props.theme.primary};
    }

    @media (max-width: 768px) {
        min-width: 20%;
        width: 25%;
    }
`

export const RentalFolderTab = styled.button`
    display: inline-block;
    width: 175px;
    border-bottom: ${props => props.selected == true ? `2px solid ${props.theme.primary}` : 'none'};
    height: 30px;
    color: ${props => props.selected == true ? props.theme.primary : props.theme.darkGrey };
    font-weight: 500;

    :hover{
        color: ${props => props.theme.primary};
    }

    @media (max-width: 768px) {
        min-width: 20%;
        width: 25%;
    }
`

export const MessageWrapper = styled.div`
    width: 90%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-size: 12px;
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.primary};
    padding: 10px;
    height: ${props => props.height && props.height};
    margin-top: ${props => props.top ? props.top : "25px"};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.secondaryAccent};

    a{
        color: ${props => props.theme.primary};
        font-weight: 600;
    }
`
