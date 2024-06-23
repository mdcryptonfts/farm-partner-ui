import React, { useEffect } from "react";
import { useGetFarmsToManage } from "./CustomHooks/useGetFarmsToManage";
import { MessageWrapper } from "../Styles";
import { useStateContext } from "../contexts/ContextProvider";
import FarmManagerCard from "./FarmManagerCard";

const ManageTab = () => {
  const {
    wharfSession,
    setShowTxModal,
    setTxModalText,
    setTxIsLoading,
    isLoggedIn,
    tokenBalances,
    balancesAreLoading,
    setCurrentUsername,
    setWharfSession,
  } = useStateContext();

  const [farms, getFarms, farmsAreLoading] = useGetFarmsToManage();

  useEffect(() => {
    let isMounted = true;

    if (isMounted && isLoggedIn){
        getFarms(wharfSession.actor);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {farmsAreLoading && <MessageWrapper>Farms are loading...</MessageWrapper>}

      {!farmsAreLoading && farms?.length == 0 && (
        <MessageWrapper>
          No farms were located. Either you haven't created any, or there's been
          an API issue which can be solved by refreshing the page.
        </MessageWrapper>
      )}

      {!farmsAreLoading && farms?.length > 0 && farms.map((item, index) => (
        <FarmManagerCard key={index} farm={item} />
      ))}
    </>
  );
};

export default ManageTab;
