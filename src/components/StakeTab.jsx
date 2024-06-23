import React, { useState } from "react";
import { MessageWrapper } from "../Styles";
import { handleAssetInput, showBalance } from "../data/functions/helpers";
import { ClickableP, InputWrapper, SpaceBetweenDiv } from "../data/css/Farms";
import {
  stakeAction,
  submitTransaction,
  transferAction,
} from "../data/functions/transactions";
import { useStateContext } from "../contexts/ContextProvider";
import { logInWithWharfkit } from "../data/wharfkit";

const StakeTab = (props) => {
  const {
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    isLoggedIn,
    tokenBalances,
    balancesAreLoading,
    setCurrentUsername, 
    setWharfSession,
    refresh,
    setRefresh
  } = useStateContext();

  const network = props.network;
  const symName = props.symName;
  const contract = props.contract;
  const farm = props.farm;
  const precision = props.precision;

  const [amountToStake, setAmountToStake] = useState("");

  return (
    <>
      {isLoggedIn && balancesAreLoading && (
        <MessageWrapper>Fetching token balance...</MessageWrapper>
      )}

      {isLoggedIn &&
        !balancesAreLoading &&
        showBalance(
          { currency: symName, contract: contract },
          tokenBalances,
          balancesAreLoading
        ) == 0 && (
          <MessageWrapper>
            You don't have any tokens to stake. If this is a mistake, try
            refreshing the page.
          </MessageWrapper>
        )}

      {isLoggedIn &&
        !balancesAreLoading &&
        showBalance(
          { currency: symName, contract: contract },
          tokenBalances,
          balancesAreLoading
        ) != 0 && (
          <>
            <br />
            {farm?.vesting_time > 0 && (
              <>
                <MessageWrapper>
                  <span>
                    Please note that the farm creator has set a vesting time of{" "}
                    <b>{Number(farm.vesting_time / 86400).toFixed(2)} days</b>{" "}
                    for this farm. This means that any time you stake new
                    tokens, you will not be able to unstake anything until that
                    much time has passed.
                  </span>
                </MessageWrapper>
                <br />
              </>
            )}
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Amount To Stake</p>
                <ClickableP
                  onClick={() => {
                    setAmountToStake(
                      showBalance(
                        { currency: symName, contract: contract },
                        tokenBalances,
                        balancesAreLoading
                      )
                    );
                  }}
                >
                  Max{" "}
                  {showBalance(
                    { currency: symName, contract: contract },
                    tokenBalances,
                    balancesAreLoading
                  )}
                </ClickableP>
              </SpaceBetweenDiv>
              <input
                placeholder="e.g. 69.420"
                value={amountToStake}
                onChange={(e) => {
                  handleAssetInput(e, setAmountToStake);
                }}
              />
            </InputWrapper>

            <button
              className="stake-button"
              onClick={async () => {
                await submitTransaction(
                  [
                    stakeAction(farm?.farm_name, wharfSession),
                    transferAction(
                      contract,
                      network.contracts.waxdao,
                      `${Number(amountToStake).toFixed(precision)} ${symName}`,
                      `|stake|${farm?.farm_name}|`,
                      wharfSession
                    ),
                  ],
                  "Your tokens have been staked!",
                  setShowTxModal,
                  setTxModalText,
                  setTxIsLoading,
                  wharfSession
                );
                setRefresh(!refresh);
              }}
            >
              STAKE NOW
            </button>
          </>
        )}

      {!isLoggedIn && (
        <>
          <MessageWrapper>
            You are not logged in. Please log in to interact with this farm.
          </MessageWrapper>
          <button className="stake-button"
            onClick={() => {
                logInWithWharfkit(setCurrentUsername, setWharfSession)
            }}
        >
            LOG IN
        </button>
        </>
      )}
    </>
  );
};

export default StakeTab;
