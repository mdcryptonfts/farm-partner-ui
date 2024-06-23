import { ContractKit } from "@wharfkit/contract";
import { APIClient } from "@wharfkit/antelope";
import config from "../../data/config.json";
import { useState } from "react";

const network = config.networks[config.currentNetwork];

const contractKit = new ContractKit({
  client: new APIClient({ url: network.endpoints.chain[0] }),
});

export const useGetClaimableBalances = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBalances = async (user, farm_name) => {
    setLoading(true);

    try {
      const contract = await contractKit.load("tf.waxdao");

      const result = await contract.readonly("showreward", {
        user: user,
        farm_name: farm_name,
      });

      setBalances(result);
    } catch (e) {
      console.log(`error fetching user rewards: ${e}`);
    }

    setLoading(false);
  };

  return [balances, getBalances, loading];
};
