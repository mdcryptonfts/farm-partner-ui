import React, { useEffect } from "react";
import {
  FarmCardWrapper,
  FarmDetailsWrapper,
  ShowDetailsButton,
  WideOnly,
} from "../data/css/FarmCard";
import { MessageWrapper } from "../Styles";
import { SpaceBetweenDiv } from "../data/css/Farms";
import { Asset, ExtendedSymbol } from "@wharfkit/antelope";
import Folders from "./Folders";
import {
  calculateInnerHeight,
  calculateOuterHeight,
  roundDownAndFormat,
  showBalance,
} from "../data/functions/helpers";
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

  const {
    wharfSession,
    isLoggedIn,
    refresh,
    tokenBalances,
    balancesAreLoading,
  } = useStateContext();

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
  const [stake, getStake, stakeIsLoading] = useGetUserStake();
  const [balances, getBalances, claimsAreLoading] = useGetClaimableBalances();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && currentIndex == index) {
      if (currentFarmTab == "Unstake" && isLoggedIn) {
        getStake(farm?.farm_name, wharfSession.actor);
      } else if (currentFarmTab == "Claim") {
        if (isLoggedIn) {
          getBalances(wharfSession.actor, farm?.farm_name);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [currentIndex, currentFarmTab, refresh]);

  return (
    <FarmCardWrapper
      height={calculateOuterHeight(
        farm?.reward_pools?.rewards,
        215,
        100,
        200,
        currentFarmTab,
        balances,
        claimsAreLoading,
        stake,
        stakeIsLoading,
        farm,
        showBalance(
          { currency: symName, contract: contract },
          tokenBalances,
          balancesAreLoading
        )
      )}
      show={currentIndex == index}
      farmTab={currentFarmTab}
    >
      <MessageWrapper top={"5px"} height={"40px"}>
        <SpaceBetweenDiv>
          <span>
            <b>{farm?.farm_name}</b>
            <WideOnly as="span" breakPoint={"470px"}>
              &nbsp;by {farm?.original_creator}
            </WideOnly>
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

      <FarmDetailsWrapper
        height={calculateInnerHeight(
          farm?.reward_pools?.rewards,
          115,
          0,
          200,
          currentFarmTab,
          balances,
          claimsAreLoading,
          stake,
          stakeIsLoading,
          farm,
          showBalance(
            { currency: symName, contract: contract },
            tokenBalances,
            balancesAreLoading
          )
        )}
        show={currentIndex == index}
        farmTab={currentFarmTab}
      >
        {currentIndex == index && (
          <>
            <MessageWrapper top={"5px"} height={"40px"}>
              <SpaceBetweenDiv>
                <p>{String(totalStaked).split(" ")[1]} in farm</p>
                <p>{roundDownAndFormat(String(totalStaked).split(" ")[0])}</p>
              </SpaceBetweenDiv>
            </MessageWrapper>

            <Folders
              currentSection={currentFarmTab}
              setCurrentSection={setCurrentFarmTab}
              tabs={tabs}
              color={"grey"}
            />

            {currentFarmTab == "Reward Pools" && (
              <RewardsTab poolsAreLoading={false} pools={farm?.reward_pools?.rewards} />
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
                farm={farm}
                precision={precision}
                stakeIsLoading={stakeIsLoading}
                stake={stake}
                symName={symName}
                contract={contract}
              />
            )}

            {currentFarmTab == "Claim" && (
              <ClaimTab
                farm={farm}
                balances={balances}
                balancesAreLoading={claimsAreLoading}
              />
            )}
          </>
        )}
      </FarmDetailsWrapper>
    </FarmCardWrapper>
  );
};

export default FarmCard;
