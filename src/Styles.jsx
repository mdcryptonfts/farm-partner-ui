import styled, { createGlobalStyle } from 'styled-components'
import config from "./data/config.json";

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
    color: white;
    height: 60px;
    background-color: ${config.theme.darkBlue};
    border-radius: 7px;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  }  
`


export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: ${config.theme.background};
  

`


export const Body = styled.div`
    min-height: 80vh;
    padding: 0px;
    background-color: ${config.theme.background};
`


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

  color: ${config.theme.textMain};

  :hover{
      background-color: ${config.theme.textMain};
      color: ${config.theme.main};
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
    color: ${config.theme.textMain};
    word-wrap: break-word;
    overflow: hidden;

    background: rgb(156,207,225);
    background: -moz-radial-gradient(circle, rgba(156,207,225,1) 0%, rgba(116,178,209,1) 58%);
    background: -webkit-radial-gradient(circle, rgba(156,207,225,1) 0%, rgba(116,178,209,1) 58%);
    background: radial-gradient(circle, rgba(156,207,225,1) 0%, rgba(116,178,209,1) 58%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#9ccfe1",endColorstr="#74b2d1",GradientType=1);

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
    background-color: ${config.theme.secondaryDark};
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
    color: ${config.theme.textMain};
    font-size: 14px;
    a{
        color: ${config.theme.primary}
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
        fill: ${config.theme.danger};
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
        fill: ${config.theme.success};
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
        color: ${config.theme.darkBlue};
        font-weight: 700;
        font-size: 28px;
        //font-style: italic;
    }

    h3 {
        color: ${config.theme.darkBlue};
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

export const SwapCont = styled.div`
    position: relative;
    width: 420px;
    border: 1px solid #2e2d2d;
    border-radius: 10px;
    height: 480px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    background-color: #1c1c1b;

    @media (max-width: 480px) {
        width: 98%;
    }     
`

export const SwapTopCont = styled.div`
    position: absolute;
    width: 100%;
    top: 0px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: right;
`

export const SwapFormTitle = styled.div`
    position: absolute;
    top: 5px;
    width: 100%;
    text-align: center;
    color: ${config.theme.primary};
`

export const RightAlignedContainer = styled.div`
    align-self: flex-end;
    padding-top: 4px;
    padding-right: 25px;
`;


export const SwapInputCont = styled.div`
    position: absolute;
    width: 90%;
    height: 150px;
    border-radius: 7px;
    background-color: #2e2d2d;
    top: 35px;
    left: 5%;
    padding: 15px;
`

export const SwapOutputCont = styled.div`
    position: absolute;
    width: 90%;
    height: 150px;
    border-radius: 7px;
    background-color: #2e2d2d;
    top: 240px;
    left: 5%;
    padding: 15px;
`

export const SubmitSwapButton = styled.button`
    position: absolute;
    width: 90%;
    height: 55px;
    border-radius: 7px;
    background-color: #2e2d2d;
    top: 410px;
    left: 5%;
    border: 1px solid #403f3f;
    color: ${config.theme.primary};

    :hover{
        background-color: rgba(99, 99, 99, 0.3);
        transition: background-color 0.3s;
    }    
`
export const SwapRow1 = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-weight: 400;
    color: ${config.theme.textSecondary}
`

export const SwapRow2 = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    font-weight: 400;
    color: ${config.theme.textMain}

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

export const SwapRowContractName = styled.div`
    height: 15px;
    width: 100%;
    text-align: right;
    font-size: 12px;
    font-weight: 300;
    color: ${config.theme.textSecondary}
    opacity: 80%;
`

export const SwapTokenDiv = styled.div`
    width: 30%;
    font-size: 14px;
    text-align: center;
`

export const SwapTokenAmountDiv = styled.div`
    width: 70%;
    font-size: 24px;
    text-align: right;

    @media (max-width: 420px) {
       font-size: 18px;
    }        

    @media (max-width: 375px) {
        font-size: 14px;
    }       

    input{
        background-color: inherit;
        text-align: inherit;
        
        :focus{
            outline: none;
        }
    }
`


export const SwapRow3 = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 300;
    color: ${config.theme.textSecondary}
    padding: 10px;   

    button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid ${config.theme.textSecondary};
        border-radius: 5px;
        padding: 5px;
        width: 70px;
        align-items: center;
        height: 100%;
        :hover{
            background-color: rgba(99, 99, 99, 0.3);
            transition: background-color 0.3s;
        }

        @media (max-width: 420px) {
            width: 50px;
            font-size: 10px;
        } 

    }


`

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
    background-color: #1c1c1b;
    text-align: center;

    @media (max-width: 480px) {
        width: 98%;
    } 
`



export const SelectTokenHeaderCont = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    color: ${config.theme.textMain};
    font-weight: 400;
    padding: 10px;
    text-align: left;
    margin-bottom: 15px;
`

export const SelectTokenRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 18px;

    img{
        width: 25px;
        height: 25px;
    }

    button{
        display: inherit;
        flex-wrap: wrap;
        align-items: center;
        padding: 12px;
        width:100%;
        :hover{
            background-color: rgba(99, 99, 99, 0.3);
            transition: background-color 0.3s;
        }
    }
`
export const SelectTokenRowTokenName = styled.div`
    padding-left: 7px;
    font-size: 16px;
    font-weight: 300;

    span{
        color: ${config.theme.textSecondary};
        font-size: 12px;
        font-weight: 400;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    } 

`

export const SelectTokenRowTokenAmount = styled.div`
    flex-grow: 1;
    text-align: right;
    font-size: 18px;
    color: ${config.theme.textSecondary};

    @media (max-width: 480px) {
        font-size: 14px;
    }     
`

export const SelectLpTokenUnderlyingInfo = styled.div`
    width: 100%;
    font-size: 12px;
    text-align: left;
    padding-left: 10px;
`

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

    -ms-overflow-style: scrollbar;  /* IE and Edge */
    scrollbar-width: thin;
    scrollbar-color: ${config.theme.primary} black; 

    ::-webkit-scrollbar{
        height: 4px;
    }

    ::-webkit-scrollbar-thumb{

        background: ${config.theme.primary};
    }

    ::-webkit-scrollbar-track{

        background: #dfdcdc40;
    }

    a{
        color: ${config.theme.primary};
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
    border-bottom: ${props => props.selected == true ? `2px solid ${config.theme.darkBlue}` : 'none'};
    height: 30px;
    color: ${props => props.selected == true ? config.theme.darkBlue : props.color ? props.color : 'white' };
    font-weight: 500;

    :hover{
        color: ${config.theme.darkBlue};
    }

    @media (max-width: 768px) {
        min-width: 20%;
        width: 25%;
    }
`

export const RentalFolderTab = styled.button`
    display: inline-block;
    width: 175px;
    border-bottom: ${props => props.selected == true ? `2px solid ${config.theme.darkBlue}` : 'none'};
    height: 30px;
    color: ${props => props.selected == true ? config.theme.darkBlue : config.theme.darkGrey };
    font-weight: 500;

    :hover{
        color: ${config.theme.darkBlue};
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
    background-color: ${config.theme.offWhite};
    color: ${config.theme.darkGrey};
    padding: 10px;
    height: ${props => props.height && props.height};
    margin-top: ${props => props.top ? props.top : "25px"};
    border-radius: 10px;
    border: 1px solid ${config.theme.offWhiteDarker};

    a{
        color: ${config.theme.darkBlue};
        font-weight: 600;
    }
`
