import React, { useEffect, useState } from "react";
import {
  ClickableP,
  InputWrapper,
  SpaceBetweenDiv,
  StakeContainer,
} from "../data/css/Farms";
import { FoldersRowCentered, LogoPlusHeaderWrapper } from "../data/css/Form";
import {
  FoldersContainer2024,
  MessageWrapper,
  RentalFolderTab,
} from "../Styles";
import {
  handleAssetInput,
  handleCalendarChange,
  handleDecimalInput,
  handleDurationInput,
  handleNameInput,
  handleSymbolInput,
  handleVestingInput,
  showBalance,
} from "../data/functions/helpers";
import { createFarmTransaction } from "../data/functions/transactions";
import { logInWithWharfkit } from "../data/wharfkit";
import "react-datepicker/dist/react-datepicker.css";
import "../data/css/datepicker.css";
import DatePicker from "react-datepicker";
import { useStateContext } from "../contexts/ContextProvider";
import { useGetGlobal } from "./CustomHooks/useGetGlobal";
import LoadingDiv from "./LoadingDiv";

const CreateFarm = (props) => {
  const {
    isLoggedIn,
    setCurrentUsername,
    setWharfSession,
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    refresh,
    setRefresh,
  } = useStateContext();

  const farmName = props.farmName;
  const setFarmName = props.setFarmName;
  const stakingSymbol = props.stakingSymbol;
  const setStakingSymbol = props.setStakingSymbol;
  const stakingContract = props.stakingContract;
  const setStakingContract = props.setStakingContract;
  const stakingDecimals = props.stakingDecimals;
  const setStakingDecimals = props.setStakingDecimals;
  const vestingDays = props.vestingDays;
  const setVestingDays = props.setVestingDays;
  const setShowTokenModal = props.setShowTokenModal;
  const rewardAmount = props.rewardAmount;
  const setRewardAmount = props.setRewardAmount;
  const selectedToken = props.selectedToken;
  const tokenBalances = props.tokenBalances;
  const balancesAreLoading = props.balancesAreLoading;
  const startNow = props.startNow;
  const setStartNow = props.setStartNow;
  const startTime = props.startTime;
  const setStartTime = props.setStartTime;
  const rewardPeriod = props.rewardPeriod;
  const setRewardPeriod = props.setRewardPeriod;
  const paymentMethod = props.paymentMethod;
  const setPaymentMethod = props.setPaymentMethod;
  const pricesAreLoading = props.pricesAreLoading;
  const prices = props.prices;

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [global, getGlobal, globalIsLoading] = useGetGlobal();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getGlobal();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (
        Object.keys(paymentMethod).length == 0 ||
        farmName.length == 0 ||
        stakingDecimals == "" ||
        stakingSymbol == "" ||
        stakingContract == "" ||
        vestingDays == "" ||
        rewardAmount == "" ||
        rewardPeriod == "" ||
        selectedToken?.contract == ""
      ) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [
    paymentMethod,
    farmName,
    stakingDecimals,
    stakingSymbol,
    stakingContract,
    vestingDays,
    rewardAmount,
    rewardPeriod,
    selectedToken,
  ]);

  if (!globalIsLoading && global?.length > 0) {
    return (
      <StakeContainer>
        <LogoPlusHeaderWrapper>
          <h2>Farm Creator</h2>
        </LogoPlusHeaderWrapper>

        <br />

        {!isLoggedIn ? (
          <>
            <MessageWrapper top={"5px"} height={"40px"}>
              <p>You are not logged in, please log in to create a farm.</p>
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
        ) : (
          <>
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Farm Name</p>
                <p>a-z, 1-5, .</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. mytokenfarm"
                value={farmName}
                onChange={(e) => {
                  handleNameInput(e, setFarmName);
                }}
              />
            </InputWrapper>

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Staking Token Symbol</p>
                <p>CAPS</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. WAX"
                value={stakingSymbol}
                onChange={(e) => {
                  handleSymbolInput(e, setStakingSymbol);
                }}
              />
            </InputWrapper>

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Staking Token Contract</p>
                <p>a-z, 1-5, .</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. eosio.token"
                value={stakingContract}
                onChange={(e) => {
                  handleNameInput(e, setStakingContract);
                }}
              />
            </InputWrapper>

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Staking Token Decimals</p>
                <p>0-18</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. 8"
                value={stakingDecimals}
                onChange={(e) => {
                  handleDecimalInput(e, setStakingDecimals);
                }}
              />
            </InputWrapper>

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Vesting Period Days</p>
                <p>{`0-${global[0]?.maximum_lock_seconds / 86400}`}</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. 15"
                value={vestingDays}
                onChange={(e) => {
                  handleVestingInput(e, setVestingDays, global);
                }}
              />
            </InputWrapper>

            <button
              className="stake-button"
              onClick={() => {
                setShowTokenModal(true);
              }}
            >
              {selectedToken?.currency == ""
                ? "SELECT REWARD TOKEN"
                : `REWARD ${selectedToken.currency}`}
            </button>

            <br />
            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Reward Amount</p>
                <ClickableP
                  onClick={() => {
                    setRewardAmount(
                      showBalance(
                        selectedToken,
                        tokenBalances,
                        balancesAreLoading
                      )
                    );
                  }}
                >
                  Max{" "}
                  {showBalance(
                    selectedToken,
                    tokenBalances,
                    balancesAreLoading
                  )}
                </ClickableP>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. 69.420"
                value={rewardAmount}
                onChange={(e) => {
                  handleAssetInput(e, setRewardAmount);
                }}
              />
            </InputWrapper>

            <FoldersContainer2024>
              <FoldersRowCentered>
                <RentalFolderTab
                  selected={startNow}
                  disabled={startNow}
                  onClick={() => {
                    setStartNow(true);
                  }}
                >
                  Start Now
                </RentalFolderTab>

                <RentalFolderTab
                  selected={!startNow}
                  disabled={!startNow}
                  onClick={() => {
                    setStartNow(false);
                  }}
                >
                  Start Later
                </RentalFolderTab>
              </FoldersRowCentered>
            </FoldersContainer2024>

            {!startNow ? (
              <>
                <InputWrapper wide={true}>
                  <br />
                  <SpaceBetweenDiv>
                    <p>Start Time</p>
                  </SpaceBetweenDiv>

                  <DatePicker
                    showTimeSelect
                    timeIntervals={15}
                    selected={new Date(startTime * 1000)}
                    onChange={(e) => {
                      handleCalendarChange(e, setStartTime);
                    }}
                    dateFormat="Pp"
                  />
                </InputWrapper>
                {Date.now() / 1000 > startTime && (
                  <MessageWrapper>
                    <p>Start time can not be in the past!</p>
                  </MessageWrapper>
                )}
              </>
            ) : (
              <MessageWrapper>
                Choosing to "Start Now" means that rewards will start being
                distributed as soon as you create the farm.
              </MessageWrapper>
            )}

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Reward Period Days</p>
                <p>{`1-${global[0]?.maximum_reward_duration / 86400}`}</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. 30"
                value={rewardPeriod}
                onChange={(e) => {
                  handleDurationInput(e, setRewardPeriod, global);
                }}
              />
            </InputWrapper>

            <br />
            <InputWrapper wide={true}>
              <SpaceBetweenDiv>
                <p>Payment Method</p>
                <p></p>
              </SpaceBetweenDiv>

              {/* React was buggy with rendering, so needed to stringify/parse for it to work */}
              {/* TODO: Prices may become invalidated after TWAP is refreshed, this needs
               * to be refactored to not include the price (only token/contract should be part
               * of the key)
               * Price should either be refreshed during the creation of the transaction,
               * or a small buffer can be displayed to the user and then refunded if the
               * contract receives extra
               */}
              <select
                onChange={(e) => {
                  setPaymentMethod(JSON.parse(e.target.value));
                }}
              >
                <option hidden>
                  {pricesAreLoading
                    ? "Loading Price List"
                    : prices?.length > 0
                    ? "Select Payment Method"
                    : "Price List Not Found"}
                </option>
                {!pricesAreLoading &&
                  prices?.length > 0 &&
                  prices.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {String(item.quantity)}
                    </option>
                  ))}
              </select>
            </InputWrapper>
            <br />

            <button
              className="stake-button"
              disabled={isButtonDisabled}
              onClick={async () => {
                await createFarmTransaction(
                  paymentMethod,
                  farmName,
                  stakingDecimals,
                  stakingSymbol,
                  stakingContract,
                  vestingDays,
                  rewardAmount,
                  startNow,
                  startTime,
                  rewardPeriod,
                  selectedToken,
                  setShowTxModal,
                  setTxModalText,
                  setTxIsLoading,
                  wharfSession
                );
                setRefresh(!refresh);
              }}
            >
              {isButtonDisabled ? "MISSING DETAILS" : "CREATE FARM"}
            </button>
          </>
        )}
      </StakeContainer>
    );
  } else if (globalIsLoading) {
    return <LoadingDiv />;
  } else {
    return (
      <MessageWrapper>
        Error loading contract state, please refresh.
      </MessageWrapper>
    );
  }
};

export default CreateFarm;
