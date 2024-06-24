import { ContractKit } from "@wharfkit/contract";
import { APIClient, Asset } from "@wharfkit/antelope";
import config from "../../data/config.json";
import axios from "axios";
import { useState } from "react";

const network = config.networks[config.currentNetwork];

const contractKit = new ContractKit({
  client: new APIClient({ url: network.endpoints.chain[0] }),
});

export const useGetFarmPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  let state = [];

  const getPartnerTokens = async () => {
    for (const api of network.endpoints.chain) {
      try {
        const res = await axios.post(`${api}/v1/chain/get_table_rows`, {
          table: "state",
          scope: network.contracts.partner,
          code: network.contracts.partner,
          limit: 1,
          json: true,
        });

        if (res?.data?.rows?.length > 0) {
          state = res.data.rows[0];
          break;
        }
      } catch (error) {
        console.log(
          `Failed getting payment methods from ${api}. Error: ${error}`
        );
      }
    }
  };

  const getFarmPrices = async () => {
    setLoading(true);
    await getPartnerTokens();

    if (state?.accepted_tokens?.length > 0) {
      try {
        const contract = await contractKit.load("tf.waxdao");

        const result = await contract.readonly("getfarmprice", {
          partner: network.contracts.partner,
          payment_tokens: state.accepted_tokens,
        });

        if (state.partner_fee_1e6 > 0) {
          for (const r of result) {
            let price = Asset.from(r.quantity);
            let currentUnits = Number(price.units);
            let fee = (currentUnits * state.partner_fee_1e6) / 1e8;
            price.units = currentUnits + fee;
            r.quantity = price;
          }
        }

        setPrices(result);
      } catch (e) {
        console.log(`error fetching farm prices: ${e}`);
      }
    }

    setLoading(false);
  };

  return [prices, getFarmPrices, loading];
};
