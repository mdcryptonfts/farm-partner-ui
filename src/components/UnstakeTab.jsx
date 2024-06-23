import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { MessageWrapper } from "../Styles";
import { ClickableP, InputWrapper, SpaceBetweenDiv } from "../data/css/Farms";
import { handleAssetInput } from "../data/functions/helpers";
import { logInWithWharfkit } from "../data/wharfkit";

const UnstakeTab = (props) => {
  const {
    isLoggedIn,
    tokenBalances,
    balancesAreLoading,
    setCurrentUsername,
    setWharfSession,
  } = useStateContext();

  const [amountToUnstake, setAmountToUnstake] = useState("");

  const stakeIsLoading = props.stakeIsLoading;
  const stake = props.stake;
  const symName = props.symName;
  const contract = props.contract;

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
          <br />
          {Date.now() / 1000 < stake[0]?.vesting_end_time ? (
            <MessageWrapper>
              <span>
                You have <b>{stake[0]?.balance}</b> staked in this farm, but
                your unlock period is not until{" "}
                <b>
                  {new Date(stake[0]?.vesting_end_time * 1000).toLocaleString()}
                </b>
              </span>
            </MessageWrapper>
          ) : (
            <>
              {" "}
              <InputWrapper wide={true}>
                <SpaceBetweenDiv>
                  <p>Amount To Unstake</p>
                  <ClickableP
                    onClick={() => {
                      setAmountToUnstake(stake[0]?.balance.split(" ")[0]);
                    }}
                  >
                    Max{" "}
                    {stake[0]?.balance.split(" ")[0]}
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
              <button className="stake-button">UNSTAKE NOW</button>
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
