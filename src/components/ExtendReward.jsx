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
  handleVestingInput,
  showBalance,
} from "../data/functions/helpers";
import { extendRewardTransaction } from "../data/functions/transactions";
import "react-datepicker/dist/react-datepicker.css";
import "../data/css/datepicker.css";
import DatePicker from "react-datepicker";
import { useStateContext } from "../contexts/ContextProvider";
import TransactionModal from "./TransactionModal";
import { Asset } from "@wharfkit/antelope";

const ExtendReward = (props) => {
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
    setRefresh
  } = useStateContext();

  const farmName = props.farmName;
  const rewardToExtend = props.rewardToExtend;
  const totalPaidOut = Asset.from(rewardToExtend.total_rewards_paid_out);
  const symName = totalPaidOut.symbol.name;
  const precision = totalPaidOut.symbol.precision;
  const contract = rewardToExtend.reward_pool?.contract;

  const [selectedToken, setSelectedToken] = useState({
    contract: contract,
    currency: symName,
    decimals: precision,
  });

  const [rewardAmount, setRewardAmount] = useState("");
  const [startNow, setStartNow] = useState(true);
  const [startTime, setStartTime] = useState(Date.now() / 1000);
  const [rewardPeriod, setRewardPeriod] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    let isMounted = true;
  
    if(isMounted){
      if(rewardAmount == "" || rewardPeriod == ""){
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }

    return () => {
      isMounted = false;
    }
  }, [rewardAmount, rewardPeriod])
  


  return (
    <>
      {showTxModal && (
        <TransactionModal
          setShowTxModal={setShowTxModal}
          txModalText={txModalText}
          txIsLoading={txIsLoading}
        />
      )}

      <StakeContainer>
        <LogoPlusHeaderWrapper>
          <h2>Extend Reward</h2>
        </LogoPlusHeaderWrapper>
        <br />

          <>
            <button
              className="stake-button"
            >
              {`REWARD ${rewardToExtend?.total_rewards_paid_out.split(" ")[1]}`}
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
                <p>1-30</p>
              </SpaceBetweenDiv>

              <input
                placeholder="e.g. 30"
                value={rewardPeriod}
                onChange={(e) => {
                  handleVestingInput(e, setRewardPeriod);
                }}
              />
            </InputWrapper>

            <br />
            <button
              className="stake-button"
              disabled={isButtonDisabled}
              onClick={async () => {
                await extendRewardTransaction(
                    farmName,
                    rewardToExtend.id,
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
              {isButtonDisabled ? "MISSING DETAILS" : "EXTEND REWARD"}
            </button>
          </>
      </StakeContainer>
    </>
  );
};

export default ExtendReward;
