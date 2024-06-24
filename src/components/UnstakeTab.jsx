import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { MessageWrapper } from "../Styles";
import { ClickableP, InputWrapper, SpaceBetweenDiv } from "../data/css/Farms";
import { handleAssetInput } from "../data/functions/helpers";
import { logInWithWharfkit } from "../data/wharfkit";
import { makeAction, submitTransaction } from "../data/functions/transactions";
import config from "../data/config.json";

const network = config.networks[config.currentNetwork];

const UnstakeTab = (props) => {
  const {
    isLoggedIn,
    setCurrentUsername,
    setWharfSession,
    refresh,
    setRefresh,
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
  } = useStateContext();

  const farm = props.farm;
  const stakeIsLoading = props.stakeIsLoading;
  const stake = props.stake;
  const precision = props.precision;
  const symName = props.symName;

  const [amountToUnstake, setAmountToUnstake] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    let isMounted = true;
  
    if(isMounted){
      if(amountToUnstake == "" || parseFloat(amountToUnstake) == 0){
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }

    return () => {
      isMounted = false;
    }
  }, [amountToUnstake])  

  return (
    <>
      {isLoggedIn && stakeIsLoading && (
        <MessageWrapper>Fetching staked balance...</MessageWrapper>
      )}

      {isLoggedIn && !stakeIsLoading && stake?.length == 0 && (
        <MessageWrapper>
          You don't have anything staked in this farm. If this is a mistake, try
          refreshing the page.
        </MessageWrapper>
      )}

      {isLoggedIn && !stakeIsLoading && stake?.length != 0 && (
        <>

          {Date.now() / 1000 < stake[0]?.vesting_end_time ? (
            <MessageWrapper>
              <span>
                Your <b>{stake[0]?.balance}</b> unlocks at{" "}
                <b>
                  {new Date(stake[0]?.vesting_end_time * 1000).toLocaleString()}
                </b>
              </span>
            </MessageWrapper>
          ) : (
            <>
              <br/>
              <InputWrapper wide={true}>
                <SpaceBetweenDiv>
                  <p>Amount To Unstake</p>
                  <ClickableP
                    onClick={() => {
                      setAmountToUnstake(stake[0]?.balance.split(" ")[0]);
                    }}
                  >
                    Max {stake[0]?.balance.split(" ")[0]}
                  </ClickableP>
                </SpaceBetweenDiv>
                <input
                  placeholder="e.g. 69.420"
                  value={amountToUnstake}
                  onChange={(e) => {
                    handleAssetInput(e, setAmountToUnstake);
                  }}
                />
              </InputWrapper>
              <button
                className="stake-button"
                disabled={isButtonDisabled}
                onClick={async () => {
                  await submitTransaction(
                    [
                      makeAction(
                        network.contracts.waxdao,
                        "unstake",
                        {
                          user: wharfSession.actor,
                          farm_name: farm?.farm_name,
                          amount: `${Number(amountToUnstake).toFixed(
                            precision
                          )} ${symName}`,
                        },
                        wharfSession
                      ),
                    ],
                    "Your tokens have been unstaked!",
                    setShowTxModal,
                    setTxModalText,
                    setTxIsLoading,
                    wharfSession
                  );
                  setRefresh(!refresh);
                }}
              >
                {isButtonDisabled ? "ENTER AMOUNT" : "UNSTAKE NOW"}
              </button>
            </>
          )}
        </>
      )}

      {!isLoggedIn && (
        <>
          <MessageWrapper>
            You are not logged in. Please log in to interact with this farm.
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

export default UnstakeTab;
