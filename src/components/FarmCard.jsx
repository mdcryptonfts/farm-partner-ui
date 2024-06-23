import React, { useEffect, useState } from "react";
import {
  FarmCardWrapper,
  FarmDetailsWrapper,
  ShowDetailsButton,
} from "../data/css/FarmCard";
import { MessageWrapper } from "../Styles";
import { SpaceBetweenDiv } from "../data/css/Farms";
import { Asset, ExtendedSymbol } from "@wharfkit/antelope";
import Folders from "./Folders";
import { useGetFarmRewardPools } from "./CustomHooks/useGetFarmRewardPools";
import { calculateInnerHeight, calculateOuterHeight } from "../data/functions/helpers";
import { useStateContext } from "../contexts/ContextProvider";
import { useGetUserStake } from "./CustomHooks/useGetUserStake";
import config from "../data/config.json";
import StakeTab from "./StakeTab";
import RewardsTab from "./RewardsTab";
import UnstakeTab from "./UnstakeTab";
import ClaimTab from "./ClaimTab";
import { useGetClaimableBalances } from "./CustomHooks/useGetClaimableBalances";

const FarmCard = (props) => {
  const network = config.networks[config.currentNetwork];
  const tabs = ["Reward Pools", "Stake", "Unstake", "Claim"];

  const { tokenBalances, balancesAreLoading, wharfSession, isLoggedIn } =
    useStateContext();

  const index = props.index;
  const farm = props.farm;
  const currentIndex = props.currentIndex;
  const setCurrentIndex = props.setCurrentIndex;
  const sym = ExtendedSymbol.from(farm?.staking_token).sym;
  const precision = sym.precision;
  const symName = sym.name;
  const contract = ExtendedSymbol.from(farm?.staking_token).contract;
  const totalStaked = Asset.fromUnits(
    Number(farm?.total_staked),
    Asset.Symbol.from(sym)
  );
  const currentFarmTab = props.currentFarmTab;
  const setCurrentFarmTab = props.setCurrentFarmTab;

  // Custom Hooks
  const [pools, getPools, poolsAreLoading] = useGetFarmRewardPools();
  const [stake, getStake, stakeIsLoading] = useGetUserStake();
  const [balances, getBalances, claimsAreLoading] = useGetClaimableBalances();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && currentIndex == index) {
      if (currentFarmTab == "Reward Pools") {
        getPools(farm?.farm_name);
      } else if (currentFarmTab == "Unstake" && isLoggedIn) {
        getStake(farm?.farm_name, wharfSession.actor);
      } else if(currentFarmTab == "Claim"){
        if (isLoggedIn) {
          getBalances(wharfSession.actor, farm?.farm_name);
        }        
      }
    }

    return () => {
      isMounted = false;
    };
  }, [currentIndex, currentFarmTab]);

  return (
    <FarmCardWrapper height={calculateOuterHeight(pools, poolsAreLoading, 215, 100, 200, currentFarmTab, balances, claimsAreLoading)} show={currentIndex == index} farmTab={currentFarmTab}>
      <MessageWrapper top={"5px"} height={"40px"}>
        <SpaceBetweenDiv>
          <span>
            <b>{farm?.farm_name}</b>&nbsp;by {farm?.creator}
          </span>
          <span>
            Stake <b>{symName}</b>
            <img
              className="token-logo"
              src={`https://logos.waxdao.io/${symName.toLowerCase()}_${contract}.png`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://logos.waxdao.io/default-logo.png";
              }}
            />
          </span>
        </SpaceBetweenDiv>
      </MessageWrapper>

      <ShowDetailsButton
        onClick={() => {
          if (currentIndex == index) {
            setCurrentIndex(-1);
          } else {
            setCurrentIndex(index);
          }
        }}
      >
        {currentIndex == index ? "Hide Details" : "Show Details"}
      </ShowDetailsButton>

      <FarmDetailsWrapper height={calculateInnerHeight(pools, poolsAreLoading, 115, 0, 200, currentFarmTab, balances, claimsAreLoading)} show={currentIndex == index} farmTab={currentFarmTab}>
        {currentIndex == index && (
          <>
            <MessageWrapper top={"5px"} height={"40px"}>
              <SpaceBetweenDiv>
                <p>Total staked in farm</p>
                <p>{String(totalStaked)}</p>
              </SpaceBetweenDiv>
            </MessageWrapper>

            <Folders
              currentSection={currentFarmTab}
              setCurrentSection={setCurrentFarmTab}
              tabs={tabs}
              color={"grey"}
            />

            {currentFarmTab == "Reward Pools" && (
              <RewardsTab poolsAreLoading={poolsAreLoading} pools={pools} />
            )}

            {currentFarmTab == "Stake" && (
              <StakeTab
                network={network}
                symName={symName}
                contract={contract}
                farm={farm}
                precision={precision}
              />
            )}

            {currentFarmTab == "Unstake" && (
              <UnstakeTab
                stakeIsLoading={stakeIsLoading}
                stake={stake}
                symName={symName}
                contract={contract}
              />
            )}

            {currentFarmTab == "Claim" && (
                <ClaimTab farm={farm} balances={balances} balancesAreLoading={claimsAreLoading} />
            )}
          </>
        )}
      </FarmDetailsWrapper>
    </FarmCardWrapper>
  );
};

export default FarmCard;
