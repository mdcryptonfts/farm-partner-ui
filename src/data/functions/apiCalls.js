import config from "../config.json";
import axios from "axios";

const network = config.networks[config.currentNetwork];

export const getFarmSingle = async (farm_name) => {
    for (const api of network.endpoints.tokenfarms) {
      try {
        const res = await axios.post(
          `${api}/get-farm`,
          {
            farm_name: farm_name,
            json: true,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
  
        if (res?.data?.farm) {
          return res.data.farm;
        }
      } catch (error) {
        console.log(`Failed getting single farm from ${api}. Error: ${error}`);
        return [];
      }
  
      return [];
    }
  };

export const getFarmsByCreator = async (user, page = 1, limit = 100, sort = "newest") => {
  for (const api of network.endpoints.tokenfarms) {
    try {
      const res = await axios.post(
        `${api}/get-farms`,
        {
          original_creator: user,
          page: page,
          limit: limit,
          sort: sort,          
          json: true,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.farms) {
        return res.data.farms;
      }
    } catch (error) {
      console.log(`Failed getting waxdao farms from ${api}. Error: ${error}`);
      return [];
    }

    return [];
  }
};

export const getFarmsByPartner = async (page = 1, limit = 100, sort = "newest") => {
  for (const api of network.endpoints.tokenfarms) {
    try {
      const res = await axios.post(
        `${api}/get-farms`,
        {
          creator: network.contracts.partner,
          page: page,
          limit: limit,
          sort: sort,
          json: true,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.farms) {
        return res.data.farms;
      }
    } catch (error) {
      console.log(`Failed getting farms from ${api}. Error: ${error}`);
      return [];
    }
    return [];
  }
};

export const getStakedOnly = async (user, page = 1, limit = 100, sort = "newest") => {
    for (const api of network.endpoints.tokenfarms) {
      try {
        const res = await axios.post(
          `${api}/staked-only`,
          {
            staker: user,
            page: page,
            limit: limit,
            sort: sort,
            json: true,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
  
        if (res?.data?.farms) {
            console.log(res.data.farms);
          return res.data.farms;
        }
      } catch (error) {
        console.log(`Failed getting staked only from ${api}. Error: ${error}`);
        return [];
      }
      return [];
    }
  };