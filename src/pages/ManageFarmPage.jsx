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
import { useParams } from "react-router-dom";
import LoadingDiv from "../components/LoadingDiv";
import NotFound from "../components/NotFound";
import RewardCard from "../components/RewardCard";
import AddReward from "../components/AddReward";
import ExtendReward from "../components/ExtendReward";
import { getFarmSingle } from "../data/functions/apiCalls";

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
  const [farm, setFarm] = useState([]);
  const [farmIsLoading, setFarmIsLoading] = useState(true);

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

    if(isMounted){
      const fetchFarm = async () => {
        setFarmIsLoading(true);
        const farmData = await getFarmSingle(FarmName);
        setFarm(farmData);
        setFarmIsLoading(false);
      }
      if (farm?.length == 0) {
        fetchFarm();
      }

    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (
    !farmIsLoading &&
    farm?.length > 0 &&
    isLoggedIn &&
    currentUsername == farm[0]?.original_creator
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

            {farm[0]?.reward_pools?.rewards?.length == 0 && (
                <MessageWrapper>
                    No reward pools exist for this farm yet.
                </MessageWrapper>
            )}

            {farm[0]?.reward_pools?.rewards?.length > 0 && farm[0]?.reward_pools?.rewards?.map((item, index) => (
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
            {rewardToExtend && 'id' in rewardToExtend ? (
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
    (!isLoggedIn || currentUsername != farm[0]?.original_creator)
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
