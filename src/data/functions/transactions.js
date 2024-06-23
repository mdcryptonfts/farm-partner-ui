import { ModalErrorCont, ModalSuccessCont } from "../../Styles";
import config from "../config.json";
import { error_svg, success_svg } from "../svgs";
import { getNextReward } from "./helpers";

const network = config.networks[config.currentNetwork];

export const addRewardAction = (
  farmName,
  startNow,
  startTime,
  duration,
  rewardToken,
  wharfSession
) => {
  const data = {
    farm_name: farmName,
    start_now: startNow,
    start_time: startTime,
    duration: duration,
    reward_token: rewardToken,
  };
  return makeAction(network.contracts.partner, "addreward", data, wharfSession);
};

export const createFarmAction = (
  farmName,
  stakingToken,
  vestingTime,
  wharfSession
) => {
  const data = {
    creator: wharfSession.actor,
    farm_name: farmName,
    staking_token: stakingToken,
    vesting_time: vestingTime,
  };
  return makeAction(
    network.contracts.partner,
    "createfarm",
    data,
    wharfSession
  );
};

export const addRewardTransaction = async (
  farmName,
  rewardAmount,
  startNow,
  startTime,
  rewardPeriod,
  selectedToken,
  setShowTxModal,
  setTxModalText,
  setTxIsLoading,
  wharfSession
) => {
  
  const nextReward = await getNextReward();

  const actions = [
    addRewardAction(
      farmName,
      startNow,
      startTime,
      rewardPeriod * 86400,
      {
        sym: `${selectedToken?.decimals},${selectedToken?.currency}`,
        contract: selectedToken?.contract,
      },
      wharfSession
    ),

    transferAction(
      selectedToken?.contract,
      network.contracts.partner,
      `${Number(rewardAmount).toFixed(selectedToken?.decimals)} ${
        selectedToken.currency
      }`,
      `|rewards|${farmName}|${nextReward}|`,
      wharfSession
    ),
  ];

  await submitTransaction(
    actions,
    "Your reward pool has been created!",
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    wharfSession
  );
};

export const createFarmTransaction = async (
  paymentMethod,
  farmName,
  stakingDecimals,
  stakingSymbol,
  stakingContract,
  vestingDays,
  rewardAmount,
  startNow,
  startTime,
  rewardPeriod,
  selectedToken,
  setShowTxModal,
  setTxModalText,
  setTxIsLoading,
  wharfSession
) => {
  

  const nextReward = await getNextReward();

  const actions = [
    transferAction(
      paymentMethod?.contract,
      network.contracts.partner,
      paymentMethod?.quantity,
      "farm payment",
      wharfSession
    ),

    createFarmAction(
      farmName,
      {
        sym: `${stakingDecimals},${stakingSymbol}`,
        contract: stakingContract,
      },
      vestingDays * 86400,
      wharfSession
    ),

    addRewardAction(
      farmName,
      startNow,
      startTime,
      rewardPeriod * 86400,
      {
        sym: `${selectedToken?.decimals},${selectedToken?.currency}`,
        contract: selectedToken?.contract,
      },
      wharfSession
    ),

    transferAction(
      selectedToken?.contract,
      network.contracts.partner,
      `${Number(rewardAmount).toFixed(selectedToken?.decimals)} ${
        selectedToken.currency
      }`,
      `|rewards|${farmName}|${nextReward}|`,
      wharfSession
    ),
  ];

  await submitTransaction(
    actions,
    "Your farm has been created!",
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    wharfSession
  );
};

export const extendRewardAction = (
  farmName,
  reward_id,
  startNow,
  startTime,
  duration,
  wharfSession
) => {
  const data = {
    farm_name: farmName,
    reward_id: reward_id,
    start_now: startNow,
    start_time: startTime,
    duration: duration,
  };
  return makeAction(network.contracts.partner, "extendreward", data, wharfSession);
};

export const extendRewardTransaction = async (
  farmName,
  reward_id,
  rewardAmount,
  startNow,
  startTime,
  rewardPeriod,
  selectedToken,
  setShowTxModal,
  setTxModalText,
  setTxIsLoading,
  wharfSession
) => {
  
  const actions = [
    extendRewardAction(
      farmName,
      reward_id,
      startNow,
      startTime,
      rewardPeriod * 86400,
      wharfSession
    ),

    transferAction(
      selectedToken?.contract,
      network.contracts.partner,
      `${Number(rewardAmount).toFixed(selectedToken?.decimals)} ${
        selectedToken.currency
      }`,
      `|rewards|${farmName}|${reward_id}|`,
      wharfSession
    ),
  ];

  await submitTransaction(
    actions,
    "Your reward pool has been extended!",
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    wharfSession
  );
};

export const getRewardAction = (farmName, wharfSession) => {
  const data = {user: wharfSession.actor, farm_name: farmName};
  return makeAction(network.contracts.waxdao, "getreward", data, wharfSession);
}

export const makeAction = (account, actionName, data, wharfSession) => {
  return {
    account: account,
    name: actionName,
    authorization: [wharfSession.permissionLevel],
    data: data,
  };
};

export const transferAction = (contract, to, quantity, memo, wharfSession) => {
  const data = {
    from: wharfSession.actor,
    to: to,
    quantity: quantity,
    memo: memo,
  };
  return makeAction(contract, "transfer", data, wharfSession);
};

export const stakeAction = (farmName, wharfSession) => {
  return makeAction(network.contracts.waxdao, "stake", {user: wharfSession.actor, farm_name: farmName}, wharfSession);
}

export const submitTransaction = async (
  actions,
  successMessage,
  setShowTxModal,
  setTxModalText,
  setTxIsLoading,
  wharfSession
) => {
  setShowTxModal(true);
  setTxModalText("Awaiting confirmation...");

  if (localStorage.getItem("wharf--session") == null) {
    setTxModalText(
      "You are not logged in. Click the wallet icon in the top menu"
    );
    return;
  }

  const session = wharfSession;

  try {
    const result = await session.transact(
      { actions: actions },
      config.txSettings
    );
    setTxIsLoading(true);
    setTxModalText(config.processingTxMessage);
    const timer = setTimeout(() => {
      setTxModalText(
        <span>
          <ModalSuccessCont>{success_svg}</ModalSuccessCont>
          {successMessage}
        </span>
      );

      setTxIsLoading(false);
    }, config.spinnerDuration);
    return () => clearTimeout(timer);
  } catch (e) {
    console.log("ERROR: ", e);
    setTxModalText(
      <span>
        <ModalErrorCont>{error_svg}</ModalErrorCont>
        {e.message}
      </span>
    );
    setShowTxModal(true);
  }
};
