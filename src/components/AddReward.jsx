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
  ModalOverlay2024,
  RentalFolderTab,
} from "../Styles";
import {
  handleAssetInput,
  handleCalendarChange,
  handleDurationInput,
  handleVestingInput,
  showBalance,
} from "../data/functions/helpers";
import { addRewardTransaction } from "../data/functions/transactions";
import "react-datepicker/dist/react-datepicker.css";
import "../data/css/datepicker.css";
import DatePicker from "react-datepicker";
import { useStateContext } from "../contexts/ContextProvider";
import TransactionModal from "./TransactionModal";
import SelectTokenModal from "./SelectTokenModal";
import { useGetGlobal } from "./CustomHooks/useGetGlobal";
import LoadingDiv from "./LoadingDiv";

const AddReward = (props) => {
  const {
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    tokenBalances,
    balancesAreLoading,
    showTxModal,
    txModalText,
    txIsLoading,
    refresh,
    setRefresh,
  } = useStateContext();

  const farmName = props.farmName;

  const [selectedToken, setSelectedToken] = useState({
    contract: "",
    currency: "",
    decimals: "",
  });

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [rewardAmount, setRewardAmount] = useState("");
  const [startNow, setStartNow] = useState(true);
  const [startTime, setStartTime] = useState(Date.now() / 1000);
  const [rewardPeriod, setRewardPeriod] = useState("");

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
  }, [rewardAmount, rewardPeriod, selectedToken]);

  if (!globalIsLoading && global?.length > 0) {
    return (
      <>
        {showTxModal && (
          <TransactionModal
            setShowTxModal={setShowTxModal}
            txModalText={txModalText}
            txIsLoading={txIsLoading}
          />
        )}

        {showTokenModal && (
          <span>
            <ModalOverlay2024 />
            <SelectTokenModal
              showTokenModal={showTokenModal}
              setShowTokenModal={setShowTokenModal}
              tokens={tokenBalances}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
          </span>
        )}
        <StakeContainer>
          <LogoPlusHeaderWrapper>
            <h2>Add Reward</h2>
          </LogoPlusHeaderWrapper>

          <br />

          <>
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
            <button
              className="stake-button"
              disabled={isButtonDisabled}
              onClick={async () => {
                await addRewardTransaction(
                  farmName,
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
              {isButtonDisabled ? "MISSING DETAILS" : "ADD REWARD"}
            </button>
          </>
        </StakeContainer>
      </>
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

export default AddReward;
