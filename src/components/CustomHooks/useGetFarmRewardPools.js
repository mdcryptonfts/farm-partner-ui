import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const useGetFarmRewardPools = () => {
    
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPools = async (farmName) => {
        setLoading(true);
        
        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "rewards",
                    scope: farmName,
                    code: network.contracts.waxdao,
                    limit: 100,
                    json: true,
                });

                if (res?.data?.rows) {
                    setPools(res.data.rows);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting reward pools from ${api}. Error: ${error}`);
            }
        }

        setLoading(false);
    }

    return [pools, getPools, loading]
}
