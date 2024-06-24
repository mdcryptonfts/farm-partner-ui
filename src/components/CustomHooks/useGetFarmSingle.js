import { useState } from "react";
import config from "../../data/config.json";
import axios from "axios";

// Note
// This logic is temporary since there won't be many farms at initial launch
// Not scalable, will be replaced with a custom API built from SHIP
// See: https://waxdao.gitbook.io/waxdao/products/token-farms/developers/build-an-api

const network = config.networks[config.currentNetwork];

export const useGetFarmSingle = () => {
    
    const [farm, setFarm] = useState([]);
    const [farmCreator, setFarmCreator] = useState("");
    const [loading, setLoading] = useState(true);
    let partnerFarm = [];
    let waxdaoFarm = [];

    const getPartnerFarm = async (farmName) => {
        setLoading(true);

        for (const api of network.endpoints.chain) {
            try {
                const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                    table: "farms",
                    scope: network.contracts.partner,
                    code: network.contracts.partner,
                    lower_bound: farmName,
                    upper_bound: farmName,
                    limit: 1,
                    json: true,
                });

                if (res?.data?.rows) {
                    partnerFarm = res.data.rows;
                    setFarmCreator(res.data.rows[0].creator);
                    break;
                }
            } catch (error) {
                console.log(`Failed getting partner farm from ${api}. Error: ${error}`);
            }
        }

    }

    const getFarm = async (farmName) => {
        setLoading(true);
        await getPartnerFarm(farmName);
        
        if(partnerFarm?.length > 0){
            for (const api of network.endpoints.chain) {
                try {
                    const res = await axios.post(`${api}/v1/chain/get_table_rows`,{
                        table: "farms",
                        scope: network.contracts.waxdao,
                        code: network.contracts.waxdao,
                        limit: 1,
                        lower_bound: farmName,
                        upper_bound: farmName,
                        json: true,
                    });
    
                    if (res?.data?.rows) {

                        if(res.data.rows[0].farm_name == partnerFarm[0].farm_name){
                            waxdaoFarm = res.data.rows;
                        }
                            
                        break;
                    }
                } catch (error) {
                    console.log(`Failed getting waxdao farm from ${api}. Error: ${error}`);
                }
            }
        }


        setFarm(waxdaoFarm);
        setLoading(false);
    }

    return [farm, getFarm, loading, farmCreator]
}
