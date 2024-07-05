import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const useGetGlobal = () => {
    
    const [global, setGlobal] = useState([]);
    const [loading, setLoading] = useState(true);

    const getGlobal = async () => {
        setLoading(true);
        
        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "global",
                    scope: network.contracts.waxdao,
                    code: network.contracts.waxdao,
                    limit: 1,
                    json: true,
                });

                if (res?.data?.rows) {
                    setGlobal(res.data.rows);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting user stake from ${api}. Error: ${error}`);
            }
        }

        setLoading(false);
    }

    return [global, getGlobal, loading]
}
