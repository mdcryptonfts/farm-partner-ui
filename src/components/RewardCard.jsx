import { RewardPoolWrapper } from "../data/css/FarmCard";
import React from "react";
import { SpaceBetweenDiv } from "../data/css/Farms";
import { isInProgress, isRewardExpired, roundDownAndFormat } from "../data/functions/helpers";

const RewardCard = (props) => {
  const item = props.item;
  const setCurrentSection = props.setCurrentSection && props.setCurrentSection;
  const setRewardToExtend = props.setRewardToExtend && props.setRewardToExtend;
  const paid = item?.total_rewards_paid_out?.split(" ")[0];
  const symName = item?.total_rewards_paid_out?.split(" ")[1];
  const precision = paid.indexOf(".") > -1 ?
    paid.substring(paid.indexOf(".") + 1).length
    : 0;

  return (
    <RewardPoolWrapper>
      <SpaceBetweenDiv>
      <p>Daily Reward</p>
      <b>{`${roundDownAndFormat(item.reward_rate * 86400 / (10**precision) / 1e8 ) } ${symName}`}</b>
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
