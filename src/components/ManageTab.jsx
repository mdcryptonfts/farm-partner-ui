import React, { useEffect } from "react";
import { useGetFarmsToManage } from "./CustomHooks/useGetFarmsToManage";
import { MessageWrapper } from "../Styles";
import { useStateContext } from "../contexts/ContextProvider";
import FarmManagerCard from "./FarmManagerCard";

const ManageTab = () => {
  const {
    wharfSession,
    isLoggedIn,
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
      {!isLoggedIn && <MessageWrapper>You need to log in to manage your farms.</MessageWrapper>}
      {isLoggedIn && farmsAreLoading && <MessageWrapper>Farms are loading...</MessageWrapper>}

      {isLoggedIn && !farmsAreLoading && farms?.length == 0 && (
        <MessageWrapper>
          No farms were located. Either you haven't created any, or there's been
          an API issue which can be solved by refreshing the page.
        </MessageWrapper>
      )}

      {isLoggedIn && !farmsAreLoading && farms?.length > 0 && farms.map((item, index) => (
        <FarmManagerCard key={index} farm={item} />
      ))}
    </>
  );
};

export default ManageTab;
