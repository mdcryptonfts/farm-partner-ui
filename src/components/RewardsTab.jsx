import React from "react";
import { MessageWrapper } from "../Styles";
import RewardCard from "./RewardCard";

const RewardsTab = (props) => {
    const poolsAreLoading = props.poolsAreLoading;
    const pools = props.pools;

  return (
    <>
      {poolsAreLoading && (
        <MessageWrapper>Fetching reward pools...</MessageWrapper>
      )}

      {!poolsAreLoading && pools?.length == 0 && (
        <MessageWrapper>This farm does not have any rewards.</MessageWrapper>
      )}

      {!poolsAreLoading &&
        pools?.length > 0 &&
        pools.map((item, poolIndex) => (
          <RewardCard key={poolIndex} item={item} />
        ))}
    </>
  );
};

export default RewardsTab;
