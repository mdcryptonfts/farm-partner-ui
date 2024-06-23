import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const useGetFarmsByPartner = () => {
    
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFarms = async () => {
        setLoading(true);
        
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
                    setFarms(res.data.rows);
                    console.log(res.data.rows);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting farms from ${api}. Error: ${error}`);
            }
        }

        setLoading(false);
    }

    return [farms, setFarms, getFarms, loading]
}
