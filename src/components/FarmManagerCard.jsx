import React, { useState } from "react";
import { FarmManagerCardWrapper, WideOnly } from "../data/css/FarmCard";
import { MessageWrapper } from "../Styles";
import { SpaceBetweenDiv } from "../data/css/Farms";
import { Asset, ExtendedSymbol } from "@wharfkit/antelope";
import config from "../data/config.json";

const network = config.networks[config.currentNetwork];
const currentWebsiteURL = config.production
  ? network.urls.website
  : config.localUrl;

const FarmManagerCard = (props) => {
  const farm = props.farm;
  const sym = ExtendedSymbol.from(farm?.staking_token).sym;
  const symName = sym.name;
  const contract = ExtendedSymbol.from(farm?.staking_token).contract;

  return (
    <FarmManagerCardWrapper>
      <MessageWrapper top={"5px"} height={"40px"}>
        <SpaceBetweenDiv>
        <span>
            <b>{farm?.farm_name}</b>
            <WideOnly as="span" breakPoint={"470px"}>
            &nbsp;by {farm?.creator}
            </WideOnly>
          </span>
          <span>
            Stake <b>{symName}</b>
            <img
              className="token-logo"
              src={`https://logos.waxdao.io/${symName.toLowerCase()}_${contract}.png`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://logos.waxdao.io/default-logo.png";
              }}
            />
          </span>
        </SpaceBetweenDiv>
      </MessageWrapper>

      <div className="w-100 flex justify-center">
        <a
          href={`${currentWebsiteURL}/manage-farm/${farm?.farm_name}`}
          className="stake-button"
        >
          MANAGE
        </a>
      </div>
    </FarmManagerCardWrapper>
  );
};

export default FarmManagerCard;
