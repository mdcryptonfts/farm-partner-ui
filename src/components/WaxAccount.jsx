import React from "react";
import {
  WaxAccountButton,
  WaxAccountGap,
  WaxAccountInnerCont,
  WaxAccountLeft,
  WaxAccountMiddle,
  WaxAccountRight,
} from "../data/css/SidebarStyles";
import { FaTrashAlt } from "react-icons/fa";
import cloud_logo from "../data/images/mycloudwallet.png";
import anchor_logo from "../data/images/anchor.svg";
import wombat_logo from "../data/images/wombat_logo.png";
import scatter_logo from "../data/images/scatter_logo.png";
import { removeWharfSession, switchWharfAccount } from "../data/wharfkit";
import config from "../data/config.json";
import { useStateContext } from "../contexts/ContextProvider";

const getWalletLogo = (session) => {
  switch (session.walletPlugin.id) {
    case "anchor":
      return anchor_logo;
    case "cloudwallet":
      return cloud_logo;
    case "wombat":
      return wombat_logo;
    case "scatter":
      return scatter_logo;
    default:
      return anchor_logo;
  }
};

const WaxAccount = (props) => {
  const { setCurrentUsername, setWharfSession } = useStateContext();

  const item = props.item;
  const setSessions = props.setSessions;

  return (
    <WaxAccountButton>
      <WaxAccountInnerCont>
        <WaxAccountLeft>
          <img src={getWalletLogo(item)} />
        </WaxAccountLeft>

        <WaxAccountMiddle
          onClick={() => {
            switchWharfAccount(
              item.actor,
              item.permission,
              item.walletPlugin.id,
              setCurrentUsername,
              setWharfSession
            );
          }}
        >
          {item.actor} ({item.permission})
        </WaxAccountMiddle>

        <WaxAccountGap />

        <WaxAccountRight
          onClick={() => {
            removeWharfSession(
              item.actor,
              item.permission,
              item.walletPlugin.id,
              setSessions
            );
          }}
        >
          <FaTrashAlt
            style={{
              display: "inline-block",
              color: config.theme.darkBlue,
            }}
          />
        </WaxAccountRight>
      </WaxAccountInnerCont>
    </WaxAccountButton>
  );
};

export default WaxAccount;
