import { ContractKit } from "@wharfkit/contract";
import { APIClient, Asset } from "@wharfkit/antelope";
import config from "../../data/config.json";
import axios from "axios";
import { useState } from "react";

const HONEY = { sym: "4,HONEY", contract: "nfthivehoney" };
const LSW = { sym: "8,LSW", contract: "lsw.alcor" };
const LSWAX = { sym: "8,LSWAX", contract: "token.fusion" };
const NEFTY = { sym: "8,NEFTY", contract: "token.nefty" };
const WAX = { sym: "8,WAX", contract: "eosio.token" };
const WAXDAO = { sym: "8,WAXDAO", contract: "token.waxdao" };

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
          partner: "prtnr.waxdao",
          payment_tokens: state.accepted_tokens,
        });

        if (state.partner_fee_1e6 > 0) {
          for (const r of result) {
            let quantity = Asset.from(r.quantity);
            let price = Number(String(r.quantity).split(" ")[0]);
            let precision = Asset.from(r.quantity).symbol.precision;
            let fee = (price * state.partner_fee_1e6) / 1e8;
            price = Number(price + fee).toFixed(precision);
            r.quantity = `${price} ${quantity.symbol.name}`;
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
