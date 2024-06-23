import React, { useEffect, useState } from "react";
import {
  MessageWrapper,
  ModalOverlay2024,
  PageWrapper2024,
} from "../Styles";
import Folders from "../components/Folders";
import TransactionModal from "../components/TransactionModal";
import { useStateContext } from "../contexts/ContextProvider";
import SelectTokenModal from "../components/SelectTokenModal";
import config from "../data/config.json";
import { useGetFarmRewardPools } from "../components/CustomHooks/useGetFarmRewardPools";
import { useParams } from "react-router-dom";
import { useGetFarmSingle } from "../components/CustomHooks/useGetFarmSingle";
import LoadingDiv from "../components/LoadingDiv";
import NotFound from "../components/NotFound";
import RewardCard from "../components/RewardCard";
import AddReward from "../components/AddReward";
import ExtendReward from "../components/ExtendReward";

const ManageFarmPage = () => {
  const network = config.networks[config.currentNetwork];
  const tabs = ["Reward Pools", "New Reward", "Extend Reward"];

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
  } = useStateContext();

  // Custom Hooks
  const [pools, getPools, poolsAreLoading] = useGetFarmRewardPools();
  const [farm, getFarm, farmIsLoading, farmCreator] = useGetFarmSingle();

  const [currentSection, setCurrentSection] = useState("Reward Pools");
  const [rewardToExtend, setRewardToExtend] = useState({});
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    contract: "",
    currency: "",
    decimals: "",
  });

  useEffect(() => {
    let isMounted = true;

    if (farm?.length == 0) {
      getFarm(FarmName);
    }

    if (currentSection == "Reward Pools") {
      getPools(FarmName);
    }

    return () => {
      isMounted = false;
    };
  }, [currentSection]);

  if (
    !farmIsLoading &&
    farm?.length > 0 &&
    isLoggedIn &&
    currentUsername == farmCreator
  ) {
    return (
      <div>
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

        <PageWrapper2024>
          <Folders
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            tabs={tabs}
          />

          {currentSection == "Reward Pools" && <>
            {poolsAreLoading && <LoadingDiv />}

            {!poolsAreLoading && pools?.length == 0 && (
                <MessageWrapper>
                    No reward pools exist for this farm yet.
                </MessageWrapper>
            )}

            {!poolsAreLoading && pools?.length > 0 && pools.map((item, index) => (
                <RewardCard key={index} item={item} manage={true} 
                setCurrentSection={setCurrentSection} 
                setRewardToExtend={setRewardToExtend}
                />
            ))}            

          </>}

          {currentSection == "New Reward" && (
            <AddReward farmName={farm[0]?.farm_name} />
          )}

          {currentSection == "Extend Reward" && (
            <>
            {rewardToExtend?.id ? (
              <ExtendReward farmName={FarmName} rewardToExtend={rewardToExtend} />
            ) : <MessageWrapper>
              No reward has been selected. Please choose a reward from the `Reward Pools` section.
              </MessageWrapper>}

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
  } else if (
    !farmIsLoading &&
    (!isLoggedIn || currentUsername != farmCreator)
  ) {
    return (
      <PageWrapper2024>
        <MessageWrapper>
          Only the farm creator can manage a farm.
        </MessageWrapper>
      </PageWrapper2024>
    );
  }
};

export default ManageFarmPage;
