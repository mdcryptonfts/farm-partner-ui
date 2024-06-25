import React from "react";
import {
  UserDropDown,
  UserDropDownBalancesCont,
  UserDropDownBuyWaxDaoButton,
  UserDropDownLinkButton,
  UserDropDownTopLeft,
  UserDropDownTopSection,
  UserDropDownWalletsSeparator,
  UserDropDownWalletsTitleCont,
  UserDrowDownInnerScrollWrapper,
} from "../data/css/NavbarStyles";
import config from "../data/config.json";
import { showMyBalances } from "../data/functions/helpers";
import { useStateContext } from "../contexts/ContextProvider";
import { logInWithWharfkit, logOutWharfkit } from "../data/wharfkit";
import WaxAccount from "./WaxAccount";
import { useTheme } from "../contexts/ThemeContext";

const network = config.networks[config.currentNetwork];
const currentWebsiteURL = config.production
  ? network.urls.website
  : config.localUrl;

const DropDownLarge = (props) => {
  const { theme } = useTheme();
  const {
    tokenBalances,
    balancesAreLoading,
    setCurrentUsername,
    setWharfSession,
    currentUsername,
  } = useStateContext();

  const showUserDropDown = props.showUserDropDown;
  const setShowUserDropDown = props.setShowUserDropDown;
  const sessions = props.sessions;
  const setSessions = props.setSessions;

  return (
    <UserDropDown open={showUserDropDown}>
      <UserDrowDownInnerScrollWrapper>
        <UserDropDownTopSection>
          <UserDropDownTopLeft></UserDropDownTopLeft>

          <div
            style={{
              width: "10%",
              textAlign: "right",
              paddingRight: "5px",
              fontSize: "22px",
              fontWeight: "400",
              color: config.theme.textMain,
            }}
          >
            <button
              onClick={() => {
                setShowUserDropDown(false);
              }}
            >
              X
            </button>
          </div>
        </UserDropDownTopSection>
        <UserDropDownBalancesCont>
          <h3>MY BALANCES</h3>
          {showMyBalances(tokenBalances, balancesAreLoading, theme)}
          <a href={config.buyTokensUrl} target="none">
            <UserDropDownBuyWaxDaoButton>
              BUY {config.projectToken.symbol}
            </UserDropDownBuyWaxDaoButton>
          </a>
        </UserDropDownBalancesCont>
        <a href={`${currentWebsiteURL}/farms`}>
          <UserDropDownLinkButton>
            <h3>FARMS</h3>
            <p>View, create and manage token farms</p>
          </UserDropDownLinkButton>
        </a>

        <a href={config.socials.docs} target="none">
          <UserDropDownLinkButton>
            <h3>DOCS</h3>
            <p>Find answers to all of your questions</p>
          </UserDropDownLinkButton>
        </a>

        <UserDropDownWalletsSeparator />
        <UserDropDownWalletsTitleCont>
          <h3>MY WALLETS</h3>
          <button
            onClick={() => {
              logInWithWharfkit(setCurrentUsername, setWharfSession);
            }}
          >
            +
          </button>
        </UserDropDownWalletsTitleCont>
        <span className={sessions?.length > 1 && "hidden"}>
          <UserDropDownLinkButton
            onClick={() => logOutWharfkit(setCurrentUsername, setWharfSession)}
          >
            <h3>LOG OUT</h3>
            <p>End your session with WaxFusion</p>
          </UserDropDownLinkButton>
        </span>
        {sessions?.length > 1 &&
          sessions.map((item, index) => (
            <span
              key={index}
              className={
                item.actor == currentUsername &&
                item.permission ==
                  JSON.parse(localStorage.getItem("wharf--session"))
                    .permission &&
                "hidden"
              }
            >
              <WaxAccount key={index} item={item} setSessions={setSessions} />
            </span>
          ))}
      </UserDrowDownInnerScrollWrapper>
    </UserDropDown>
  );
};

export default DropDownLarge;
