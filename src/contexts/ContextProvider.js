import React, { createContext, useContext, useState, useEffect } from "react";
import config from "../data/config.json";
import axios from "axios";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  // Native Hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentSelectedApi, setCurrentSelectedApi] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [txIsLoading, setTxIsLoading] = useState(false);
  const [wharfSession, setWharfSession] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [balancesAreLoading, setBalancesAreLoading] = useState(true);  
  const [showTxModal, setShowTxModal] = useState(false);
  const [txModalText, setTxModalText] = useState("");
  const [price, setPrice] = useState("");
  const [priceIsLoading, setPriceIsLoading] = useState(true);
  
  const network = config.networks[config.currentNetwork];
  const networkName = config.currentNetwork === "testnet" ? "waxtest" : "wax";

  useEffect(() => {
    const username = localStorage.getItem("waxAccount");
    if (username && username.length > 1) {
      setCurrentUsername(username);
      setIsLoggedIn(true);
    }
  }, []);

  const getTokenBalances = async () => {
    if (!isLoggedIn || !currentUsername) {
      return;
    }

    setBalancesAreLoading(true);

    for (const api of network.endpoints.lightapi) {
      try {
        const res = await axios.get(`${api}/api/balances/${networkName}/${currentUsername}?pretty=1`);

        if (res.data && res.data.balances) {
          setTokenBalances(res.data.balances);
        }
        break;
      } catch (error) {
        console.log(`An error occurred with ${api}. Trying next API...`);
        console.error(error);
      }
    }

    setBalancesAreLoading(false);
  };

  const getPrice = async () => {

    setPriceIsLoading(true);

    const requestData = {
        id: `${config.projectToken.symbol}@${config.projectToken.contract}`,
      };
      
      try {
        const res = await axios
        .post("https://tokens.waxdaobp.io/get-token", requestData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })    

        if (res.data && res.data.tokenData) {
            setPrice(res.data.tokenData.basic?.usd_price);
            console.log(res.data);
        }
    } catch (error) {
        console.log(`Failed to fetch token price. Error: ${error}`);
    } finally {
      setPriceIsLoading(false);
    }           
}    

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      getTokenBalances();
    }
    return () => {
      isMounted = false;
    }    
  }, [isLoggedIn, currentUsername, refresh]);

useEffect(() => {
  let isMounted = true;
  if(isMounted){
    getPrice();
  }
  return () => {
    isMounted = false;
  }
}, [])


  return (
    <StateContext.Provider
      value={{
        currentSelectedApi,
        setCurrentSelectedApi,
        currentUsername,
        setCurrentUsername,
        isLoggedIn,
        setIsLoggedIn,
        refresh,
        setRefresh,
        tokenBalances,
        balancesAreLoading,
        getTokenBalances,
        txIsLoading,
        setTxIsLoading,
        wharfSession,
        setWharfSession,
        showTxModal,
        setShowTxModal,
        txModalText,
        setTxModalText,
        price,
        priceIsLoading,
        refresh,
        setRefresh
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
