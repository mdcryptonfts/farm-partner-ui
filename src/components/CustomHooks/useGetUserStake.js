import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const useGetUserStake = () => {
    
    const [stake, setStake] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStake = async (farmName, user) => {
        setLoading(true);
        
        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "stakers",
                    scope: user,
                    code: network.contracts.waxdao,
                    limit: 1,
                    lower_bound: farmName,
                    upper_bound: farmName,
                    json: true,
                });

                if (res?.data?.rows) {
                    setStake(res.data.rows);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting user stake from ${api}. Error: ${error}`);
            }
        }

        setLoading(false);
    }

    return [stake, getStake, loading]
}
