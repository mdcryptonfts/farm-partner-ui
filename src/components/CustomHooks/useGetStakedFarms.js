import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const useGetStakedFarms = () => {
    
    const [stake, setStake] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStake = async (user) => {
        setLoading(true);
        
        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "stakers",
                    scope: user,
                    code: network.contracts.waxdao,
                    limit: 100,
                    json: true,
                });

                if (res?.data?.rows?.length > 0) {
                    setStake(res.data.rows);
                    console.log(res.data.rows);
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
