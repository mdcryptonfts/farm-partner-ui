import React, { useEffect, useState } from "react";
import { MessageWrapper } from "../Styles";
import { useStateContext } from "../contexts/ContextProvider";
import FarmManagerCard from "./FarmManagerCard";
import { getFarmsByCreator } from "../data/functions/apiCalls";

const ManageTab = () => {
  const {
    wharfSession,
    isLoggedIn,
  } = useStateContext();

  const [farms, setFarms] = useState([]);
  const [farmsAreLoading, setFarmsAreLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFarms = async () => {
      setFarmsAreLoading(true);
      const farmList = await getFarmsByCreator(wharfSession.actor);
      setFarms(farmList);
      setFarmsAreLoading(false);
    }    

    if (isMounted && isLoggedIn){
      fetchFarms();
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
