import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { MessageWrapper } from "../Styles";
import { SpaceBetweenDiv } from "../data/css/Farms";
import {
  getRewardAction,
  submitTransaction,
} from "../data/functions/transactions";
import { logInWithWharfkit } from "../data/wharfkit";
import { WideOnly } from "../data/css/FarmCard";

const ClaimTab = (props) => {
  const {
    isLoggedIn,
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    setCurrentUsername,
    setWharfSession,
    refresh,
    setRefresh
  } = useStateContext();

  

  const farm = props.farm;
  const balances = props.balances;
  const balancesAreLoading = props.claimsAreLoading;
  
  return (
    <>
      {isLoggedIn && balancesAreLoading && (
        <MessageWrapper>Fetching claimable balances...</MessageWrapper>
      )}

      {isLoggedIn && !balancesAreLoading && balances?.length > 0 && (
        <>
          <br />
            {balances.map((item, index) => (
              <MessageWrapper key={index} top={"5px"} height={"40px"}>
              <SpaceBetweenDiv>
                <p>
                  <WideOnly as="span" breakPoint={"470px"}>You have{" "}</WideOnly>
                  <b>{String(item.quantity)}</b>
                  <WideOnly as="span" breakPoint={"470px"}>{" "}to claim!</WideOnly>
                </p>
              </SpaceBetweenDiv>
              </MessageWrapper>
            ))}
          
          <button
            className="stake-button"
            onClick={async () => {
              await submitTransaction(
                [getRewardAction(farm?.farm_name, wharfSession)],
                "Your rewards have been claimed!",
                setShowTxModal,
                setTxModalText,
                setTxIsLoading,
                wharfSession
              );
              setRefresh(!refresh);
            }}
          >
            CLAIM REWARDS
          </button>
        </>
      )}

      {isLoggedIn && !balancesAreLoading && balances?.length == 0 && (
        <>
          <br />
          <MessageWrapper top={"5px"} height={"40px"}>
            <p>No rewards to claim.</p>
          </MessageWrapper>
        </>
      )}

      {!isLoggedIn && (
        <>
          {" "}
          <MessageWrapper>
            You are not logged in.
          </MessageWrapper>
          <button
            className="stake-button"
            onClick={() => {
              logInWithWharfkit(setCurrentUsername, setWharfSession);
            }}
          >
            LOG IN
          </button>
        </>
      )}
    </>
  );
};

export default ClaimTab;
