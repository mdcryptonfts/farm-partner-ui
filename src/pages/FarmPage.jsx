import React, { useEffect, useState } from "react";
import config from "../data/config.json";
import { useStateContext } from "../contexts/ContextProvider";
import { Helmet } from "react-helmet";
import "../data/css/datepicker.css";
import DatePicker from "react-datepicker";
import {
  CreateLockButton,
  FolderTab2024,
  FoldersContainer2024,
  Modal2024,
  ModalContent2024,
  ModalOverlay2024,
  PageWrapper2024,
} from "../Styles";
import {
  FoldersRowCentered
} from "../data/css/Form";
import LoadingDiv from "../components/LoadingDiv";
import { useParams } from "react-router-dom";

const getTransactionData = (
  amountToAirdrop,
  selectedToken,
  contractToHold,
  minimumAmountToHold,
  precision,
  tokenToHold,
  maximumCap,
  snapshotTime,
  title,
  description,
  logo
) => {
  let data = {
    token: "",
    contract: "",
    creator: "",
    holder_contract: "",
    min_amount: "",
    max_amount: "",
    snapshot_time: snapshotTime,
    display_data: JSON.stringify({
      name: title,
      description: description,
      preview_img: logo,
    }),
  };

  data.token = `${Number(amountToAirdrop).toFixed(selectedToken.decimals)} ${
    selectedToken.currency
  }`;
  data.contract = selectedToken.contract;
  data.creator = currentUsername;
  data.holder_contract = contractToHold;
  data.min_amount = `${Number(minimumAmountToHold).toFixed(
    Number(precision)
  )} ${tokenToHold}`;
  data.max_amount = `${Number(maximumCap).toFixed(
    Number(precision)
  )} ${tokenToHold}`;
  return data;
};

const FarmPage = () => {
  const {
    wharfSession,
    showTxModal,
    setShowTxModal,
    txModalText,
    txIsLoading,
    isLoggedIn,
  } = useStateContext();

  const { FarmName } = useParams();

  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production
    ? network.urls.website
    : config.localUrl;

  const [currentSection, setCurrentSection] = useState("Stake");

  return (
    <div id="seo">
      <Helmet>
        <title>Farm {FarmName}</title>
        <meta name="description" content="Airdrop tokens to token holders" />
        <link rel="canonical" href={`${currentWebsiteURL}/farms`} />
      </Helmet>

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

      <PageWrapper2024>
        <FoldersContainer2024>
          <FoldersRowCentered>
            <FolderTab2024
              selected={currentSection == "Browse"}
              disabled={currentSection == "Browse"}
              onClick={() => {
                setCurrentSection("Browse");
              }}
            >
              Browse
            </FolderTab2024>

            <FolderTab2024
              selected={currentSection == "Create"}
              disabled={currentSection == "Create"}
              onClick={() => {
                setCurrentSection("Create");
              }}
            >
              Create
            </FolderTab2024>

            <FolderTab2024
              selected={currentSection == "Manage"}
              disabled={currentSection == "Manage"}
              onClick={() => {
                setCurrentSection("Manage");
              }}
            >
              Manage
            </FolderTab2024>
          </FoldersRowCentered>
        </FoldersContainer2024>
        <br />
      </PageWrapper2024>
    </div>
  );
};

export default FarmPage;
