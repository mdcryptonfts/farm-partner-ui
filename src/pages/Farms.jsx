import React, { useEffect, useState } from "react";
import config from "../data/config.json";
import { useStateContext } from "../contexts/ContextProvider";
import { Helmet } from "react-helmet";
import {
  MessageWrapper,
  ModalOverlay2024,
  PageWrapper2024,
} from "../Styles";
import SelectTokenModal from "../components/SelectTokenModal";
import { useGetFarmPrices } from "../components/CustomHooks/useGetFarmPrices";
import Folders from "../components/Folders";
import TransactionModal from "../components/TransactionModal";
import CreateFarm from "../components/CreateFarm";
import { useSearchParams } from "react-router-dom";
import { InputWrapper, StakeContainer } from "../data/css/Farms";
import FarmCard from "../components/FarmCard";
import { farmSortMethods, sortFarms } from "../data/functions/helpers";
import ManageTab from "../components/ManageTab";
import { getFarmsByCreator, getFarmsByPartner, getStakedOnly } from "../data/functions/apiCalls";

const Farms = () => {
  const {
    showTxModal,
    setShowTxModal,
    txModalText,
    txIsLoading,
    tokenBalances,
    balancesAreLoading,
    currentUsername,
    isLoggedIn
  } = useStateContext();

  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production
    ? network.urls.website
    : config.localUrl;

  const tabs = ["browse", "create", "manage", "staked only"];
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const creatorParam = searchParams.get("creator");

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    contract: "",
    currency: "",
    decimals: "",
  });

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSection, setCurrentSection] = useState("browse");
  const [farmName, setFarmName] = useState("");
  const [stakingSymbol, setStakingSymbol] = useState("");
  const [stakingContract, setStakingContract] = useState("");
  const [stakingDecimals, setStakingDecimals] = useState("");
  const [vestingDays, setVestingDays] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [startNow, setStartNow] = useState(true);
  const [startTime, setStartTime] = useState(Date.now() / 1000);
  const [rewardPeriod, setRewardPeriod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState({});
  const [currentFarmTab, setCurrentFarmTab] = useState("Reward Pools");
  const [farmsAreLoading, setFarmsAreLoading] = useState(true);
  const [farms, setFarms] = useState([]);

  // Custom Hooks
  const [prices, getFarmPrices, pricesAreLoading] = useGetFarmPrices();

  useEffect(() => {
    let isMounted = true;

    if (isMounted && currentSection == "create") {
      getFarmPrices();
    } else if (isMounted && currentSection == "browse") {
      setFarmsAreLoading(true);
      const fetchFarms = async () => {
        if (creatorParam) {
          const creatorFarms = await getFarmsByCreator(creatorParam);
          if (isMounted) {
            setFarms(creatorFarms);
            setFarmsAreLoading(false);
          }
        } else {
          const partnerFarms = await getFarmsByPartner();
          if (isMounted) {
            setFarms(partnerFarms);
            setFarmsAreLoading(false);
          }
        }
      };
      fetchFarms();
    } else if (isMounted && currentSection === "staked only") {
      setFarmsAreLoading(true);
      const fetchFarms = async () => {
        if (isLoggedIn) {
          const stakedFarms = await getStakedOnly(currentUsername);
          if (isMounted) {
            setFarms(stakedFarms);
            setFarmsAreLoading(false);
          }
        } else {
          if (isMounted) {
            setFarms([]);
            setFarmsAreLoading(false);
          }
        }
      };
      fetchFarms();
    }

    return () => {
      isMounted = false;
    };
  }, [currentSection, creatorParam]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (tabParam && tabs.indexOf(tabParam) > -1) {
        setCurrentSection(tabParam);
      } else {
        setCurrentSection("browse");
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="seo">
      <Helmet>
        <title>Token Farms</title>
        <meta
          name="description"
          content="Create, view and manage your own token staking system"
        />
        <link rel="canonical" href={`${currentWebsiteURL}/farms`} />
      </Helmet>

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
        <br />

        {currentSection == "create" && (
          <CreateFarm
            farmName={farmName}
            setFarmName={setFarmName}
            stakingSymbol={stakingSymbol}
            setStakingSymbol={setStakingSymbol}
            stakingContract={stakingContract}
            setStakingContract={setStakingContract}
            stakingDecimals={stakingDecimals}
            setStakingDecimals={setStakingDecimals}
            vestingDays={vestingDays}
            setVestingDays={setVestingDays}
            setShowTokenModal={setShowTokenModal}
            rewardAmount={rewardAmount}
            setRewardAmount={setRewardAmount}
            selectedToken={selectedToken}
            tokenBalances={tokenBalances}
            balancesAreLoading={balancesAreLoading}
            startNow={startNow}
            setStartNow={setStartNow}
            startTime={startTime}
            setStartTime={setStartTime}
            rewardPeriod={rewardPeriod}
            setRewardPeriod={setRewardPeriod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            pricesAreLoading={pricesAreLoading}
            prices={prices}
          />
        )}

        {(currentSection == "browse" || currentSection == "staked only") && (
          <>
            {farmsAreLoading && (
              <MessageWrapper>Farms are loading...</MessageWrapper>
            )}

            {!farmsAreLoading && farms && farms.length == 0 && (
              <MessageWrapper>
                No farms were located. Either none have been created by{" "}
                {network.contracts.partner}, or you need to try refreshing the
                page due to an API error.
              </MessageWrapper>
            )}

            {!farmsAreLoading && farms && farms.length > 0 && (
              <>
                <StakeContainer padding={"10px"} paddingBottom={"10px"}>
                  <InputWrapper wide={true}>
                    <select
                      onChange={(e) => {
                        sortFarms(e, farms, setFarms);
                      }}
                    >
                      <option hidden>Sort By</option>
                      {farmSortMethods.map((method, index) => (
                        <option key={index} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>
                </StakeContainer>

                {farms.map((item, index) => (
                  <FarmCard
                    key={index}
                    farm={item}
                    index={index}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    currentFarmTab={currentFarmTab}
                    setCurrentFarmTab={setCurrentFarmTab}
                  />
                ))}
              </>
            )}
          </>
        )}

        {currentSection == "manage" && <ManageTab />}
      </PageWrapper2024>
    </div>
  );
};

export default Farms;
