import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

// Note
// This logic is temporary since there won't be many farms at initial launch
// Not scalable, will be replaced with a custom API built from SHIP
// See: https://waxdao.gitbook.io/waxdao/products/token-farms/developers/build-an-api

const network = config.networks[config.currentNetwork];

export const useGetFarmsToManage = () => {
    
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    let partnerFarms = [];
    let waxdaoFarms = [];

    const getPartnerFarms = async () => {
        setLoading(true);

        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "farms",
                    scope: network.contracts.partner,
                    code: network.contracts.partner,
                    limit: 100,
                    json: true,
                });

                if (res?.data?.rows) {
                    partnerFarms = res.data.rows;
                    console.log(res.data.rows);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting partner farms from ${api}. Error: ${error}`);
            }
        }

    }

    const getFarms = async (user) => {
        setLoading(true);
        await getPartnerFarms();
        
        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "farms",
                    scope: network.contracts.waxdao,
                    code: network.contracts.waxdao,
                    key_type: "name",
                    index_position: 2,
                    limit: 100,
                    lower_bound: network.contracts.partner,
                    upper_bound: network.contracts.partner,
                    json: true,
                });

                if (res?.data?.rows) {
                    waxdaoFarms = res.data.rows;

                    waxdaoFarms = waxdaoFarms.filter(f => {
                        const partnerFarm = partnerFarms.find(pf => pf.farm_name == f.farm_name);
                        return partnerFarm && partnerFarm.creator == user;
                    });

                    console.log(waxdaoFarms);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting waxdao farms from ${api}. Error: ${error}`);
            }
        }

        setFarms(waxdaoFarms);
        setLoading(false);
    }

    return [farms, getFarms, loading]
}
