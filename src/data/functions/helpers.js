import { int64Max } from "../constants";
import { APIClient, Asset, ExtendedAsset } from "@wharfkit/antelope";
import config from "../config.json";
import axios from "axios";
import ContractKit from "@wharfkit/contract";


const network = config.networks[config.currentNetwork];

const contractKit = new ContractKit({
  client: new APIClient({ url: network.endpoints.chain[0] }),
});

export const calculateOuterHeight = (pools, poolsAreLoading, baseHeight = 0, originalheight = 0, noPoolsHeight = 0, location = "any", 
  claims, claimsAreLoading = true
) => {
  console.log(`location: ${location}`)

  if(pools?.length == 0 && location == "Reward Pools" ){
    console.log(`${noPoolsHeight + originalheight}px`)
    if(poolsAreLoading) return `${0 + originalheight}px`;
    return `${noPoolsHeight + originalheight}px`;
  }

  if(location == "Reward Pools"){
    return `${pools?.length * 165 + baseHeight}px`;
  } else if(location == "Claim"){
    // if there is more than 0 pools, add stake button height
    // this should take in `stake`, not `pools`
    if(claimsAreLoading) return `${baseHeight + originalheight}px`
    if(claims?.length == 0) return `${baseHeight + originalheight}px`
    let buttonHeight;
    switch(claims?.length){
      case 0:
        buttonHeight = 0;
        break;
      case 1:
        buttonHeight = 95;
        break;
      default:
        buttonHeight = 85;
        break;
    }
    return `${claims?.length * 50 + baseHeight + buttonHeight}px`;
  }

  if(location == "Unstake"){
    return `${originalheight + 280}px`
  }  
  
  return `${noPoolsHeight + originalheight + 200}px`;
}

export const calculateInnerHeight = (pools, poolsAreLoading, baseHeight = 0, originalheight = 0, noPoolsHeight = 0, location = "any", 
  claims, claimsAreLoading = true
) => {
  console.log(`location: ${location}`)

  if(pools?.length == 0 && location == "Reward Pools" ){
    console.log(`${noPoolsHeight + originalheight}px`)
    if(poolsAreLoading) return `${0 + originalheight}px`;
    return `${noPoolsHeight + originalheight}px`;
  }

  if(location == "Reward Pools"){
    return `${pools?.length * 165 + baseHeight}px`;
  } else if(location == "Claim"){
    if(claimsAreLoading) return `${baseHeight + originalheight}px`
    if(claims?.length == 0) return `${baseHeight + originalheight + 100}px`
    let buttonHeight;
    switch(claims?.length){
      case 0:
        buttonHeight = 0;
        break;
      case 1:
        buttonHeight = 95;
        break;
      default:
        buttonHeight = 85;
        break;
    }
    return `${claims?.length * 50 + baseHeight + buttonHeight}px`;
  }

  if(location == "Unstake"){
    return `${originalheight + 280}px`
  }
  
  return `${noPoolsHeight + originalheight + 200}px`;
}

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const currentRewardPool = (rewardPool) => {
    const r = rewardPool;
    const ext = ExtendedAsset.from(r.reward_pool);
    const quantity = Asset.from(ext.quantity);
    const rewardRate = r.reward_rate;
    const currentPool = rewardRate * r.rewards_duration / 1e8;
    return Asset.fromUnits(currentPool, String(quantity.symbol));
}

export const farmSortMethods = [
    "Newest",
    "Oldest",
    "Farm Name a-z",
    "Farm Name z-a",
]

export const getNextReward = async () => {
  for (const api of network.endpoints.chain) {
    try {
      const res = await axios.post(`${api}/v1/chain/get_table_rows`, {
        table: "global",
        scope: network.contracts.waxdao,
        code: network.contracts.waxdao,
        limit: 1,
        json: true,
      });

      if (res?.data?.rows?.length > 0) {
        return res.data.rows[0].total_incentives_created;
      }
    } catch (error) {
      console.log(`Failed getting reward ID from ${api}. Error: ${error}`);
    }
  }

  return null;
};

export const handleAssetInput = (e, setAsset) => {
  if (
    e?.target?.value > int64Max ||
    e.target.value < 0 ||
    e.target.value.length > 20
  )
    return;
  setAsset(e.target.value.replace(/[^0-9.]/g, ""));
};

export const handleCalendarChange = (e, setTime) => {
  const date = new Date(e);
  const value = date.getTime() / 1000;

  setTime(value);
  return;
};

export const handleDecimalInput = (e, setDecimals) => {
  if (e?.target?.value > 18 || e.target.value.length > 2) return;
  setDecimals(e.target.value.replace(/[^0-9]/g, ""));
};

export const handleNameInput = (e, setName) => {
  if (e?.target?.value?.length > 12) return;
  setName(e.target.value.replace(/[^a-z1-5.]/g, ""));
};

export const handleSymbolInput = (e, setSymbol) => {
  if (e?.target?.value?.length > 7) return;
  setSymbol(e.target.value.replace(/[^A-Z]/g, ""));
};

export const handleVestingInput = (e, setVestingDays) => {
  if (e?.target?.value > 30 || e.target.value.length > 2) return;
  setVestingDays(e.target.value.replace(/[^0-9]/g, ""));
};

export const isInProgress = (rewardPool) => {
    const r = rewardPool;
    const now = Date.now() / 1000;

    if(now > r.period_start && now < r.period_finish) return true;
    return false;
}

export const isRewardExpired = (rewardPool) => {
  const r = rewardPool;
  const now = Date.now() / 1000;

  if(now > r.period_finish) return true;
  return false;
}

export const showBalance = (selectedToken, tokenBalances, loading) => {
  if (loading || selectedToken?.currency == "") return;
  const index = tokenBalances.findIndex(
    (t) =>
      t.currency == selectedToken.currency &&
      t.contract == selectedToken.contract
  )

  if(index == -1) return 0;

  return tokenBalances[index].amount;
};
