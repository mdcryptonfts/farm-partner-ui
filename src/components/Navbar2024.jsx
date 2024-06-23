import React, { useEffect, useRef, useState } from "react";
import config from "../data/config.json";
import { useStateContext } from "../contexts/ContextProvider";
import {
  fetchSessionsFromLocalStorage,
  logInWithWharfkit,
  logOutWharfkit,
  removeWharfSession,
  switchWharfAccount,
} from "../data/wharfkit";
import cloud_logo from "../data/images/mycloudwallet.png";
import anchor_logo from "../data/images/anchor.svg";
import wombat_logo from "../data/images/wombat_logo.png";
import scatter_logo from "../data/images/scatter_logo.png";
import { FaTrashAlt } from "react-icons/fa";
import {
  Modal2024,
  ModalContent2024,
  ModalOverlay2024
} from "../Styles";
import {
  CloseDivXIconWrapper,
  LargeNav2024BottomWrapper,
  LargeNav2024LinkButton,
  LargeNav2024LinksWrapper,
  LargeNav2024TopItem,
  LargeNav2024TopWrapper,
  LargeNavDropDownInnerWrapper,
  LargeNavLinkDropDown,
  LargeNavLinkDropDownRow,
  LargeNavSocialIconsDiv,
  LargeNavTopLeftWrapper,
  LargeNavTopRightWrapper,
  LargeNavWrapper2024,
  LargeNavbar2024LoginButton,
  SmallNavBottomWrapper,
  SmallNavDropDown,
  SmallNavLoginButtonWrapper,
  SmallNavSocialIconsDiv,
  SmallNavTopLeftWrapper,
  SmallNavTopRightWrapper,
  SmallNavWrapper2024,
  SmallNavbar2024LoginButton,
  SmallScreenWalletsWrapper,
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
import { burger_menu_icon, down_arrow_svg, x_close_svg } from "../data/svgs";
import NumberFormat from "react-number-format";
import {
  WaxAccountButton,
  WaxAccountGap,
  WaxAccountInnerCont,
  WaxAccountLeft,
  WaxAccountMiddle,
  WaxAccountRight,
} from "../data/css/SidebarStyles";
import {
  discord_svg,
  docs_svg,
  medium_svg,
  telegram_svg,
  twitter_svg,
  water_svg,
} from "../data/svgs";
import LoadingDiv from "./LoadingDiv";

const showWaxAndWaxdaoBalance = (tokens, loading) => {
  const waxColor = config.theme.darkGrey;
  const waxdaoColor = config.theme.darkGrey;

  if (loading)
    return (
      <span>
        <h4 style={{ color: waxColor }}>0 WAX</h4>
        <h4 style={{ color: waxdaoColor }}>0 LSWAX</h4>
      </span>
    );

  let waxBalance = 0;
  let lsWaxBalance = 0;

  tokens.forEach((t) => {
    if (t.currency === "WAX" && t.contract === "eosio.token") {
      waxBalance = Number(t.amount).toFixed(2);
    } else if (
      t.currency === config.projectToken.symbol &&
      t.contract === config.projectToken.contract
    ) {
      lsWaxBalance = Number(t.amount).toFixed(2);
    }
  });

  return (
    <span>
      <h4 style={{ color: waxColor }}>
        <NumberFormat
          displayType="text"
          thousandSeparator={true}
          value={waxBalance}
        />{" "}
        WAX
      </h4>
      <h4 style={{ color: waxdaoColor }}>
        <NumberFormat
          displayType="text"
          thousandSeparator={true}
          value={lsWaxBalance}
        />{" "}
        LSWAX
      </h4>
    </span>
  );
};

const getWalletLogo = (session) => {
  if (session.walletPlugin.id == "anchor") return anchor_logo;
  else if (session.walletPlugin.id == "cloudwallet") return cloud_logo;
  else if (session.walletPlugin.id == "wombat") return wombat_logo;
  else if (session.walletPlugin.id == "scatter") return scatter_logo;
};

const handleNavBlur = (e, setSelectedTab) => {
  if (
    e.relatedTarget &&
    e.relatedTarget.href &&
    e.relatedTarget.href.indexOf("http") > -1
  ) {
    return;
  }
  setSelectedTab("");
};

const Navbar2024 = () => {
  const {
    currentUsername,
    setCurrentUsername,
    txModalText,
    showTxModal,
    setShowTxModal,
    setWharfSession,
    userStake,
    stakeIsLoading,
    tokenBalances,
    balancesAreLoading,
    isLoggedIn,
    setIsLoggedIn,
    txIsLoading,
  } = useStateContext();

  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production
    ? network.urls.website
    : config.localUrl;

  const [sessions, setSessions] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showSmallScreenDropDown, setShowSmallScreenDropDown] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  const [screenSize, setScreenSize] = useState(0);
  const screenSizeRef = useRef(window.innerWidth);

  useEffect(() => {
    fetchSessionsFromLocalStorage(setSessions);
  }, []);

  useEffect(() => {
    if (currentUsername && isLoggedIn) {
      setCurrentUsername(currentUsername);
      setIsLoggedIn(true);
      console.log("is logged in")
    } else {
      console.log("You are not logged in");
    }
  }, [currentUsername]);

  useEffect(() => {
    const handleResize = () => {
      const old_width = screenSizeRef.current;
      const new_width = window.innerWidth;
      const break_point = Number(1100);

      if (
        (old_width < break_point && new_width >= break_point) ||
        (old_width > break_point && new_width <= break_point)
      ) {
        setSelectedTab("");
        setShowSmallScreenDropDown(false);
        setShowUserDropDown(false);
        setShowWallets(false);
      }

      screenSizeRef.current = new_width;
      setScreenSize(new_width);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <div>
      {showTxModal && (
        <>
          <ModalOverlay2024 />
          <Modal2024>
            <div
              style={{
                width: "100%",
                textAlign: "right",
                paddingRight: "5px",
                fontSize: "22px",
                fontWeight: "400",
                color: config.theme.textMain,
              }}
            >
              <button
                onClick={() => {
                  setShowTxModal(false);
                }}
              >
                X
              </button>
            </div>
            <ModalContent2024>{txModalText}</ModalContent2024>

            {txIsLoading && <LoadingDiv />}
          </Modal2024>
        </>
      )}

      {/* Large Screen Navbar */}

      <LargeNavWrapper2024>
        <LargeNav2024TopWrapper>
          <LargeNavTopLeftWrapper>
            <LargeNav2024TopItem>LSWAX PRICE: {"69 WAX"}</LargeNav2024TopItem>
            <LargeNav2024TopItem>
              {/* CIRCULATING SUPPLY: {formatNumber(Number(supply))} */}
            </LargeNav2024TopItem>
            <LargeNav2024TopItem>
              {/* MARKET CAP: {formatNumber(Number(marketCap))}{" WAX"} */}
            </LargeNav2024TopItem>
            <LargeNavSocialIconsDiv>
              {/* Telegram */}
              <a href={network.urls.telegram} target="none">
                {telegram_svg}
              </a>

              {/* Twitter */}
              <a href={network.urls.twitter} target="none">
                {twitter_svg}
              </a>

              {/* Discord */}
              <a href={network.urls.discord} target="none">
                {discord_svg}
              </a>

              {/* Medium */}
              <a href={network.urls.medium} target="none">
                {medium_svg}
              </a>
            </LargeNavSocialIconsDiv>
          </LargeNavTopLeftWrapper>
          <LargeNavTopRightWrapper>
            <LargeNavbar2024LoginButton
              onClick={() => {
                if (!isLoggedIn) {
                  logInWithWharfkit(setCurrentUsername, setWharfSession);
                } else {
                  setShowUserDropDown((prev) => !prev);
                }
              }}
            >
              {isLoggedIn ? currentUsername : "LOG IN"}
            </LargeNavbar2024LoginButton>
            <ModalOverlay2024 className={!showUserDropDown && "hidden"} />
            <UserDropDown open={showUserDropDown}>
              <UserDrowDownInnerScrollWrapper>
                <UserDropDownTopSection>
                  <UserDropDownTopLeft></UserDropDownTopLeft>

                  <div
                    style={{
                      //border: "1px solid yellow",
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
                  {showWaxAndWaxdaoBalance(tokenBalances, balancesAreLoading)}
                  <a href={`${currentWebsiteURL}/stake`}>
                    <UserDropDownBuyWaxDaoButton>
                      BUY SWAX/LSWAX
                    </UserDropDownBuyWaxDaoButton>
                  </a>
                </UserDropDownBalancesCont>
                <a href={`${currentWebsiteURL}/farms`}>
                  <UserDropDownLinkButton>
                    <h3>FARMS</h3>
                    <p>View, create and manage token farms</p>
                  </UserDropDownLinkButton>
                </a>

                <a href={network.urls.docs} target="none">
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
                    onClick={() =>
                      logOutWharfkit(setCurrentUsername, setWharfSession)
                    }
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
                    </span>
                  ))}
              </UserDrowDownInnerScrollWrapper>
            </UserDropDown>
          </LargeNavTopRightWrapper>
        </LargeNav2024TopWrapper>
        <LargeNav2024BottomWrapper>
          <a href={currentWebsiteURL}>
            {/* <img src={header_logo} /> */}
            <h2>WaxFusion</h2>
          </a>
          <LargeNav2024LinksWrapper>
            <a href={`${currentWebsiteURL}/farms`}>
              <LargeNav2024LinkButton>{water_svg} FARMS</LargeNav2024LinkButton>
            </a>

            <a href={network.urls.docs} target="none">
              <LargeNav2024LinkButton>{docs_svg} DOCS</LargeNav2024LinkButton>
            </a>
          </LargeNav2024LinksWrapper>
        </LargeNav2024BottomWrapper>
      </LargeNavWrapper2024>

      {/* Small Screen Navbar */}

      <SmallNavWrapper2024>
        <ModalOverlay2024 className={!showSmallScreenDropDown && "hidden"} />
        <LargeNav2024TopWrapper>
          <SmallNavTopLeftWrapper>
            <a href={currentWebsiteURL}>
              {/* <img src={white_logo} /> */}
              <h2>WaxFusion</h2>
            </a>
          </SmallNavTopLeftWrapper>
          <SmallNavTopRightWrapper open={showSmallScreenDropDown}>
            <button
              onClick={() =>
                showSmallScreenDropDown
                  ? setShowSmallScreenDropDown(false)
                  : setShowSmallScreenDropDown(true)
              }
            >
              {!showSmallScreenDropDown && burger_menu_icon}
            </button>
          </SmallNavTopRightWrapper>
        </LargeNav2024TopWrapper>
      </SmallNavWrapper2024>
      <SmallNavDropDown open={showSmallScreenDropDown}>
        <CloseDivXIconWrapper>
          <button
            onClick={() => {
              setShowSmallScreenDropDown(false);
            }}
          >
            {x_close_svg}
          </button>
        </CloseDivXIconWrapper>

        <UserDrowDownInnerScrollWrapper>
          {!isLoggedIn && (
            <span>
              <SmallNavLoginButtonWrapper>
                <SmallNavbar2024LoginButton
                  onClick={() => {
                    logInWithWharfkit(setCurrentUsername, setWharfSession);
                  }}
                >
                  LOG IN
                </SmallNavbar2024LoginButton>
              </SmallNavLoginButtonWrapper>
            </span>
          )}

          {isLoggedIn && (
            <span>
              <UserDropDownBalancesCont>
                <h3>MY BALANCES</h3>
                {showWaxAndWaxdaoBalance(tokenBalances, balancesAreLoading)}
                <a href={`${currentWebsiteURL}/stake`}>
                  <UserDropDownBuyWaxDaoButton>
                    BUY SWAX/LSWAX
                  </UserDropDownBuyWaxDaoButton>
                </a>
              </UserDropDownBalancesCont>
            </span>
          )}

          <a href={`${currentWebsiteURL}/farms`}>
            <UserDropDownLinkButton>
              <h3>FARMS</h3>
              <p>View, create and manage token farms</p>
            </UserDropDownLinkButton>
          </a>

          <a href={network.urls.docs} target="none">
            <UserDropDownLinkButton>
              <h3>DOCS</h3>
              <p>Find answers to all of your questions</p>
            </UserDropDownLinkButton>
          </a>

          {isLoggedIn && (
            <span>
              <UserDropDownWalletsSeparator />
              <UserDropDownWalletsTitleCont>
                <h3>{sessions?.length == 1 ? "ADD WALLET" : "MY WALLETS"}</h3>
                <button
                  onClick={() => {
                    logInWithWharfkit(setCurrentUsername, setWharfSession);
                  }}
                >
                  +
                </button>
                {sessions?.length > 1 && (
                  <button onClick={() => setShowWallets((prev) => !prev)}>
                    {showWallets ? x_close_svg : down_arrow_svg}
                  </button>
                )}
              </UserDropDownWalletsTitleCont>
              <span className={sessions?.length > 1 && "hidden"}>
                <UserDropDownLinkButton
                  onClick={() =>
                    logOutWharfkit(setCurrentUsername, setWharfSession)
                  }
                >
                  <h3>LOG OUT</h3>
                  <p>End your session with WaxFusion</p>
                </UserDropDownLinkButton>
              </span>

              <SmallScreenWalletsWrapper open={showWallets}>
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
                    </span>
                  ))}
              </SmallScreenWalletsWrapper>
            </span>
          )}

          <br />
          <SmallNavBottomWrapper>
            <SmallNavSocialIconsDiv>
              {/* Telegram */}
              <a href={network.urls.telegram} target="none">
                {telegram_svg}
              </a>

              {/* Twitter */}
              <a href={network.urls.twitter} target="none">
                {twitter_svg}
              </a>

              {/* Discord */}
              <a href={network.urls.discord} target="none">
                {discord_svg}
              </a>

              {/* Medium */}
              <a href={network.urls.medium} target="none">
                {medium_svg}
              </a>
            </SmallNavSocialIconsDiv>
            <LargeNav2024TopItem>LSWAX PRICE: {"69 WAX"}</LargeNav2024TopItem>
          </SmallNavBottomWrapper>
        </UserDrowDownInnerScrollWrapper>
      </SmallNavDropDown>
    </div>
  );
};

export default Navbar2024;
