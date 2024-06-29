import React, { useEffect, useState } from "react";
import {
  FoldersContainer2024,
  MessageWrapper,
  PageWrapper2024,
  RentalFolderTab,
} from "../Styles";
import Folders from "../components/Folders";
import TransactionModal from "../components/TransactionModal";
import { useStateContext } from "../contexts/ContextProvider";
import config from "../data/config.json";
import { useParams } from "react-router-dom";
import LoadingDiv from "../components/LoadingDiv";
import NotFound from "../components/NotFound";
import RewardCard from "../components/RewardCard";
import { getFarmSingle, getStakersList } from "../data/functions/apiCalls";
import { SpaceBetweenDiv, StakeContainer } from "../data/css/Farms";
import { RewardPoolWrapper } from "../data/css/FarmCard";
import { roundDownAndFormat } from "../data/functions/helpers";
import { FoldersRowCentered } from "../data/css/Form";
import StakeTab from "../components/StakeTab";
import { ExtendedSymbol } from "@wharfkit/antelope";
import UnstakeTab from "../components/UnstakeTab";
import { useGetUserStake } from "../components/CustomHooks/useGetUserStake";
import { useGetClaimableBalances } from "../components/CustomHooks/useGetClaimableBalances";
import ClaimTab from "../components/ClaimTab";

const FarmPage = () => {
  const network = config.networks[config.currentNetwork];
  const tabs = ["Farm Info", "Positions", "Claim", "Leaderboard"];

  const { FarmName } = useParams();

  const {
    showTxModal,
    setShowTxModal,
    txModalText,
    txIsLoading,
    tokenBalances,
    balancesAreLoading,
    getTokenBalances,
    isLoggedIn,
    currentUsername,
    wharfSession,
    refresh,
    setRefresh,
  } = useStateContext();

  // Custom Hooks
  const [farm, setFarm] = useState([]);
  const [farmIsLoading, setFarmIsLoading] = useState(true);
  const [stakers, setStakers] = useState([]);
  const [stakersAreLoading, setStakersAreLoading] = useState(true);

  const [currentSection, setCurrentSection] = useState("Farm Info");

  const positionTabs = ["Stake", "Unstake"];
  const [positionTab, setPositionTab] = useState("Stake");
  const [sym, setSym] = useState({});
  const [symName, setSymName] = useState("");
  const [precision, setPrecision] = useState("");
  const [contract, setContract] = useState("");

  // Custom Hooks
  const [stake, getStake, stakeIsLoading] = useGetUserStake();
  const [balances, getBalances, claimsAreLoading] = useGetClaimableBalances();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (positionTab == "Unstake" && isLoggedIn) {
        getStake(farm[0]?.farm_name, wharfSession.actor);
      } else if (currentSection == "Claim") {
        if (isLoggedIn) {
          getBalances(wharfSession.actor, farm[0]?.farm_name);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [positionTab, currentSection, refresh]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const fetchFarm = async () => {
        setFarmIsLoading(true);
        setStakersAreLoading(true);
        const farmData = await getFarmSingle(FarmName);
        const stakerData = await getStakersList(FarmName);
        setFarm(farmData);
        setStakers(stakerData);
        setFarmIsLoading(false);
        setStakersAreLoading(false);

        setSym(ExtendedSymbol.from(farmData[0]?.staking_token).sym);
        setPrecision(
          ExtendedSymbol.from(farmData[0]?.staking_token).sym.precision
        );
        setSymName(ExtendedSymbol.from(farmData[0]?.staking_token).sym.name);
        setContract(
          String(ExtendedSymbol.from(farmData[0]?.staking_token).contract)
        );
      };
      if (farm?.length == 0) {
        fetchFarm();
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (!farmIsLoading && farm?.length > 0) {
    return (
      <div>
        {showTxModal && (
          <TransactionModal
            setShowTxModal={setShowTxModal}
            txModalText={txModalText}
            txIsLoading={txIsLoading}
          />
        )}

        <PageWrapper2024>
          <Folders
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            tabs={tabs}
          />

          {currentSection == "Farm Info" && (
            <>
              <RewardPoolWrapper>
                <SpaceBetweenDiv>
                  <p>Farm Name</p>
                  <b>{farm[0]?.farm_name}</b>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                  <p>Creator</p>
                  <b>{farm[0]?.original_creator}</b>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                  <p>Staking Token</p>
                  <b>{symName}</b>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                  <p>Token Contract</p>
                  <b>{contract}</b>
                </SpaceBetweenDiv>
                <SpaceBetweenDiv>
                  <p>{symName} Staked</p>
                  <b>{roundDownAndFormat(farm[0]?.total_staked)}</b>
                </SpaceBetweenDiv>
              </RewardPoolWrapper>

              {farm[0]?.reward_pools?.rewards?.length == 0 && (
                <MessageWrapper>
                  No reward pools exist for this farm yet.
                </MessageWrapper>
              )}

              {farm[0]?.reward_pools?.rewards?.length > 0 &&
                farm[0]?.reward_pools?.rewards?.map((item, index) => (
                  <RewardCard
                    key={index}
                    item={item}
                    manage={false}
                    setCurrentSection={setCurrentSection}
                  />
                ))}
            </>
          )}

          {currentSection == "Positions" && (
            <StakeContainer wide={true}>
              <Folders
                tabs={positionTabs}
                currentSection={positionTab}
                setCurrentSection={setPositionTab}
              />

              {positionTab == "Stake" && (
                <StakeTab
                  network={network}
                  symName={symName}
                  contract={contract}
                  farm={farm}
                  precision={precision}
                />
              )}

              {positionTab == "Unstake" && (
                <UnstakeTab
                  farm={farm}
                  precision={precision}
                  stakeIsLoading={stakeIsLoading}
                  stake={stake}
                  symName={symName}
                  contract={contract}
                />
              )}
            </StakeContainer>
          )}

          {currentSection == "Claim" && (
            <StakeContainer wide={true}>
              <ClaimTab
                farm={farm}
                balances={balances}
                balancesAreLoading={claimsAreLoading}
              />
            </StakeContainer>
          )}

          {currentSection == "Leaderboard" && (
            <>
              {stakersAreLoading && <LoadingDiv />}

              {!stakersAreLoading && stakers?.length == 0 && (
                <MessageWrapper>
                  No one is currently staking in this farm.
                </MessageWrapper>
              )}

              {!stakersAreLoading && stakers?.length > 0 && (
                <RewardPoolWrapper>
                  <SpaceBetweenDiv>
                    <b>Wallet</b>
                    <b>Balance</b>
                  </SpaceBetweenDiv>
                  {stakers.map((item, index) => (
                    <SpaceBetweenDiv key={index} marginTop="8px">
                      <a
                        href={`${network.urls.explorer}/account/${item.username}`}
                        target="none"
                      >
                        {item.username}
                      </a>
                      <b>
                        {roundDownAndFormat(
                          item.balance.quantity.split(" ")[0]
                        )}
                      </b>
                    </SpaceBetweenDiv>
                  ))}
                </RewardPoolWrapper>
              )}
            </>
          )}
        </PageWrapper2024>
      </div>
    );
  } else if (farmIsLoading) {
    return (
      <PageWrapper2024>
        <LoadingDiv />
      </PageWrapper2024>
    );
  } else if (!farmIsLoading && farm?.length == 0) {
    return <NotFound />;
  }
};

export default FarmPage;
