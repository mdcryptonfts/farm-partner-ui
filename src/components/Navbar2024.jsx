import React, { useEffect, useRef, useState } from "react";
import config from "../data/config.json";
import { useStateContext } from "../contexts/ContextProvider";
import {
  fetchSessionsFromLocalStorage,
  logInWithWharfkit,
  logOutWharfkit,
} from "../data/wharfkit";
import { Modal2024, ModalContent2024, ModalOverlay2024 } from "../Styles";
import {
  CloseDivXIconWrapper,
  LargeNav2024BottomWrapper,
  LargeNav2024LinkButton,
  LargeNav2024LinksWrapper,
  LargeNav2024TopItem,
  LargeNav2024TopWrapper,
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
  UserDropDownBalancesCont,
  UserDropDownBuyWaxDaoButton,
  UserDropDownLinkButton,
  UserDropDownWalletsSeparator,
  UserDropDownWalletsTitleCont,
  UserDrowDownInnerScrollWrapper,
} from "../data/css/NavbarStyles";
import { burger_menu_icon, docs_svg, down_arrow_svg, farm_svg, x_close_svg } from "../data/svgs";
import LoadingDiv from "./LoadingDiv";
import WaxAccount from "./WaxAccount";
import { getSocialLogo, showMyBalances } from "../data/functions/helpers";
import DropDownLarge from "./DropDownLarge";

const network = config.networks[config.currentNetwork];
const currentWebsiteURL = config.production
  ? network.urls.website
  : config.localUrl;

const Navbar2024 = () => {
  const {
    currentUsername,
    setCurrentUsername,
    txModalText,
    showTxModal,
    setShowTxModal,
    setWharfSession,
    tokenBalances,
    balancesAreLoading,
    isLoggedIn,
    setIsLoggedIn,
    txIsLoading,
  } = useStateContext();

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
            <LargeNav2024TopItem>
              {config.projectToken.symbol} PRICE: {"69 WAX"}
            </LargeNav2024TopItem>

            <LargeNavSocialIconsDiv>
              {Object.entries(config.socials).length > 0 &&
                Object.entries(config.socials).map(([key, value]) => (
                  <a href={value} target="none">
                    {getSocialLogo(key)}
                  </a>
                ))}
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
            <DropDownLarge
              showUserDropDown={showUserDropDown}
              setShowUserDropDown={setShowUserDropDown}
              sessions={sessions}
              setSessions={setSessions}
            />
          </LargeNavTopRightWrapper>
        </LargeNav2024TopWrapper>
        <LargeNav2024BottomWrapper>
          <a href={currentWebsiteURL}>
            <h2>{config.appName}</h2>
          </a>
          <LargeNav2024LinksWrapper>
            <a href={`${currentWebsiteURL}/farms`}>
              <LargeNav2024LinkButton>{farm_svg} FARMS</LargeNav2024LinkButton>
            </a>

            <a href={config.socials.docs} target="none">
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
              <h2>{config.appName}</h2>
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
                {showMyBalances(tokenBalances, balancesAreLoading)}
                <a href={`${currentWebsiteURL}/stake`}>
                  <UserDropDownBuyWaxDaoButton>
                    BUY {config.projectToken.symbol}
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

          <a href={config.socials.docs} target="none">
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
                      <WaxAccount
                        key={index}
                        item={item}
                        setSessions={setSessions}
                      />
                    </span>
                  ))}
              </SmallScreenWalletsWrapper>
            </span>
          )}

          <br />
          <SmallNavBottomWrapper>
            <SmallNavSocialIconsDiv>
              {Object.entries(config.socials).length > 0 &&
                Object.entries(config.socials).map(([key, value]) => (
                  <a href={value} target="none">
                    {getSocialLogo(key)}
                  </a>
                ))}
            </SmallNavSocialIconsDiv>
            <LargeNav2024TopItem>
              {config.projectToken.symbol} PRICE: {"69 WAX"}
            </LargeNav2024TopItem>
          </SmallNavBottomWrapper>
        </UserDrowDownInnerScrollWrapper>
      </SmallNavDropDown>
    </div>
  );
};

export default Navbar2024;
