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
  baseHeight = 0,
  originalheight = 0,
  noPoolsHeight = 0,
  location = "any",
  claims,
  claimsAreLoading = true,
  stake,
  stakeIsLoading = true,
  farm,
  balanceToStake = 0
) => {
  if (pools?.length == 0 && location == "Reward Pools") {
    return `${noPoolsHeight + originalheight}px`;
  }

  if (location == "Reward Pools") {
    return `${pools?.length * 165 + baseHeight}px`;
  } else if (location == "Claim") {
    if (claimsAreLoading || claims?.length == 0)
      return `${originalheight + 180}px`;
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
    if (stakeIsLoading || (!stakeIsLoading && stake?.length == 0)) {
      return `${originalheight + 180}px`;
    } else if (
      !stakeIsLoading &&
      stake?.length > 0 &&
      Date.now() / 1000 < stake[0]?.vesting_end_time
    ) {
      return `${originalheight + 195}px`;
    }

    return `${originalheight + 280}px`;
  }

  if (location == "Stake") {
    if (farm?.vesting_time == 0 && balanceToStake != 0) {
      return `${noPoolsHeight + originalheight + 100}px`;
    } else if (balanceToStake == 0) {
      return `${originalheight + 180}px`;
    }
  }

  return `${noPoolsHeight + originalheight + 200}px`;
};

export const calculateInnerHeight = (
  pools,
  baseHeight = 0,
  originalheight = 0,
  noPoolsHeight = 0,
  location = "any",
  claims,
  claimsAreLoading = true,
  stake,
  stakeIsLoading = true,
  farm,
  balanceToStake = 0
) => {
  if (pools?.length == 0 && location == "Reward Pools") {
    return `${noPoolsHeight + originalheight}px`;
  }

  if (location == "Reward Pools") {
    return `${pools?.length * 165 + baseHeight}px`;
  } else if (location == "Claim") {
    if (claimsAreLoading || claims?.length == 0)
      return `${originalheight + 180}px`;
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
    if (stakeIsLoading || (!stakeIsLoading && stake?.length == 0)) {
      return `${originalheight + 180}px`;
    } else if (
      !stakeIsLoading &&
      stake?.length > 0 &&
      Date.now() / 1000 < stake[0]?.vesting_end_time
    ) {
      return `${originalheight + 195}px`;
    }

    return `${originalheight + 280}px`;
  }

  if (location == "Stake") {
    if (farm?.vesting_time == 0 && balanceToStake != 0) {
      return `${noPoolsHeight + originalheight + 100}px`;
    } else if (balanceToStake == 0) {
      return `${originalheight + 180}px`;
    }
  }

  return `${noPoolsHeight + originalheight + 200}px`;
};

export const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

export const roundDownAndFormat = (number) => {
  const roundedNumber = Math.floor(number);
  return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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

export const handleDurationInput = (e, setDuration, global) => {
  const max_days = global[0]?.maximum_reward_duration / 86400;
  if (e?.target?.value > max_days || e.target.value.length > max_days.length) return;
  setDuration(e.target.value.replace(/[^0-9]/g, ""));
};

export const handleNameInput = (e, setName) => {
  if (e?.target?.value?.length > 12) return;
  setName(e.target.value.replace(/[^a-z1-5.]/g, ""));
};

export const handleSymbolInput = (e, setSymbol) => {
  if (e?.target?.value?.length > 7) return;
  setSymbol(e.target.value.replace(/[^A-Z]/g, ""));
};

export const handleVestingInput = (e, setVestingDays, global) => {
  const max_days = global[0]?.maximum_lock_seconds / 86400;
  if (e?.target?.value > max_days || e.target.value.length > max_days.length)
    return;
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

export const showMyBalances = (tokens, loading, theme) => {
  if (loading)
    return (
      <span>
        <h4 style={{ color: theme.onSurface }}>0 WAX</h4>
        <h4 style={{ color: theme.onSurface }}>
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
      <h4 style={{ color: theme.onSurface }}>
        <NumberFormat
          displayType="text"
          thousandSeparator={true}
          value={waxBalance}
        />{" "}
        WAX
      </h4>
      <h4 style={{ color: theme.onSurface }}>
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

  if (e.target.value == "Oldest") {
    sortedFarmArray.sort((a, b) => a.time_created - b.time_created);
  } else if (e.target.value == "Newest") {
    sortedFarmArray.sort((a, b) => b.time_created - a.time_created);
  } else if (e.target.value == "Farm Name a-z") {
    sortedFarmArray.sort((a, b) => a.farm_name.localeCompare(b.farm_name));
  } else if (e.target.value == "Farm Name z-a") {
    sortedFarmArray.sort((a, b) => b.farm_name.localeCompare(a.farm_name));
  }

  setFarms(sortedFarmArray);
  return;
};
