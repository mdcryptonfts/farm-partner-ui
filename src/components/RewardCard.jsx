import { RewardPoolWrapper } from "../data/css/FarmCard";
import React from "react";
import { SpaceBetweenDiv } from "../data/css/Farms";
import { currentRewardPool, isInProgress, isRewardExpired, roundDownAndFormat } from "../data/functions/helpers";

const RewardCard = (props) => {
  const item = props.item;
  const setCurrentSection = props.setCurrentSection && props.setCurrentSection;
  const setRewardToExtend = props.setRewardToExtend && props.setRewardToExtend;

  return (
    <RewardPoolWrapper>
      <SpaceBetweenDiv>
        <p>Reward Pool</p>
        <b>{`${roundDownAndFormat(String(currentRewardPool(item)).split(" ")[0])} ${String(currentRewardPool(item)).split(" ")[1]}`}</b>
      </SpaceBetweenDiv>

      <SpaceBetweenDiv>
        <p>Reward Contract</p>
        <b>{String(item.reward_pool.contract)}</b>
      </SpaceBetweenDiv>

      <SpaceBetweenDiv>
        <p>In Progress?</p>
        <b>{isInProgress(item) ? "Yes" : "No"}</b>
      </SpaceBetweenDiv>

      <SpaceBetweenDiv>
        <p>Starts</p>
        <b>{new Date(item.period_start * 1000).toLocaleString()}</b>
      </SpaceBetweenDiv>

      <SpaceBetweenDiv>
        <p>Ends</p>
        <b>{new Date(item.period_finish * 1000).toLocaleString()}</b>
      </SpaceBetweenDiv>

      {props.manage && isRewardExpired(item) && (
        <div className="w-100 flex mt-3 justify-center">
        <button className="stake-button"
          onClick={() => {
            setCurrentSection("Extend Reward");
            setRewardToExtend(item);
          }}
        >
            EXTEND
        </button>
        </div>
      )}
    </RewardPoolWrapper>
  );
};

export default RewardCard;
