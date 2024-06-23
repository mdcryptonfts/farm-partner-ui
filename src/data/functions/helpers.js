import { int64Max } from "../constants";
import { APIClient, Asset, ExtendedAsset } from "@wharfkit/antelope";
import config from "../config.json";
import axios from "axios";
import ContractKit from "@wharfkit/contract";
import {
  discord_svg,
  docs_svg,
  github_svg,
  medium_svg,
  telegram_svg,
  twitter_svg,
} from "../svgs";
import NumberFormat from "react-number-format";

const network = config.networks[config.currentNetwork];

const contractKit = new ContractKit({
  client: new APIClient({ url: network.endpoints.chain[0] }),
});

export const calculateOuterHeight = (
  pools,
  poolsAreLoading,
  baseHeight = 0,
  originalheight = 0,
  noPoolsHeight = 0,
  location = "any",
  claims,
  claimsAreLoading = true
) => {
  if (pools?.length == 0 && location == "Reward Pools") {
    if (poolsAreLoading) return `${0 + originalheight}px`;
    return `${noPoolsHeight + originalheight}px`;
  }

  if (location == "Reward Pools") {
    return `${pools?.length * 165 + baseHeight}px`;
  } else if (location == "Claim") {
    if (claimsAreLoading) return `${baseHeight + originalheight}px`;
    if (claims?.length == 0) return `${baseHeight + originalheight}px`;
    let buttonHeight;
    switch (claims?.length) {
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

  if (location == "Unstake") {
    return `${originalheight + 280}px`;
  }

  return `${noPoolsHeight + originalheight + 200}px`;
};

export const calculateInnerHeight = (
  pools,
  poolsAreLoading,
  baseHeight = 0,
  originalheight = 0,
  noPoolsHeight = 0,
  location = "any",
  claims,
  claimsAreLoading = true
) => {
  if (pools?.length == 0 && location == "Reward Pools") {
    if (poolsAreLoading) return `${0 + originalheight}px`;
    return `${noPoolsHeight + originalheight}px`;
  }

  if (location == "Reward Pools") {
    return `${pools?.length * 165 + baseHeight}px`;
  } else if (location == "Claim") {
    if (claimsAreLoading) return `${baseHeight + originalheight}px`;
    if (claims?.length == 0) return `${baseHeight + originalheight + 100}px`;
    let buttonHeight;
    switch (claims?.length) {
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

  if (location == "Unstake") {
    return `${originalheight + 280}px`;
  }

  return `${noPoolsHeight + originalheight + 200}px`;
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const currentRewardPool = (rewardPool) => {
  const r = rewardPool;
  const ext = ExtendedAsset.from(r.reward_pool);
  const quantity = Asset.from(ext.quantity);
  const rewardRate = r.reward_rate;
  const currentPool = (rewardRate * r.rewards_duration) / 1e8;
  return Asset.fromUnits(currentPool, String(quantity.symbol));
};

export const farmSortMethods = [
  "Newest",
  "Oldest",
  "Farm Name a-z",
  "Farm Name z-a",
];

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

export const getSocialLogo = (key) => {
  switch (key) {
    case "docs":
      return docs_svg;
    case "discord":
      return discord_svg;
    case "github":
      return github_svg;
    case "medium":
      return medium_svg;
    case "telegram":
      return telegram_svg;
    case "twitter":
      return twitter_svg;
    default:
      return key;
  }
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

  if (now > r.period_start && now < r.period_finish) return true;
  return false;
};

export const isRewardExpired = (rewardPool) => {
  const r = rewardPool;
  const now = Date.now() / 1000;

  if (now > r.period_finish) return true;
  return false;
};

export const showBalance = (selectedToken, tokenBalances, loading) => {
  if (loading || selectedToken?.currency == "") return;
  const index = tokenBalances.findIndex(
    (t) =>
      t.currency == selectedToken.currency &&
      t.contract == selectedToken.contract
  );

  if (index == -1) return 0;

  return tokenBalances[index].amount;
};

export const showMyBalances = (tokens, loading) => {
  if (loading)
    return (
      <span>
        <h4 style={{ color: config.theme.darkGrey }}>0 WAX</h4>
        <h4 style={{ color: config.theme.darkGrey }}>
          0 {config.projectToken.symbol}
        </h4>
      </span>
    );

  let waxBalance = 0;
  let projectBalance = 0;

  tokens.forEach((t) => {
    if (t.currency === "WAX" && t.contract === "eosio.token") {
      waxBalance = Number(t.amount).toFixed(2);
    } else if (
      t.currency === config.projectToken.symbol &&
      t.contract === config.projectToken.contract
    ) {
      projectBalance = Number(t.amount).toFixed(2);
    }
  });

  return (
    <span>
      <h4 style={{ color: config.theme.darkGrey }}>
        <NumberFormat
          displayType="text"
          thousandSeparator={true}
          value={waxBalance}
        />{" "}
        WAX
      </h4>
      <h4 style={{ color: config.theme.darkGrey }}>
        <NumberFormat
          displayType="text"
          thousandSeparator={true}
          value={projectBalance}
        />{" "}
        {config.projectToken.symbol}
      </h4>
    </span>
  );
};

export const sortFarms = (e, farms, setFarms) => {

    let sortedFarmArray = [...farms];
  
    if(e.target.value == "Oldest"){
      sortedFarmArray.sort((a, b) => a.time_created - b.time_created)
    } else if(e.target.value == "Newest"){
      sortedFarmArray.sort((a, b) => b.time_created - a.time_created)
    } else if(e.target.value == "Farm Name a-z"){
      sortedFarmArray.sort((a, b) => a.farm_name.localeCompare(b.farm_name));
    } else if(e.target.value == "Farm Name z-a"){
      sortedFarmArray.sort((a, b) => b.farm_name.localeCompare(a.farm_name));
    }
  
    setFarms(sortedFarmArray)
    return
}