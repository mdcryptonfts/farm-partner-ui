import React from "react";
import { Modal2024, ModalContent2024, ModalOverlay2024 } from "../Styles";
import config from "../data/config.json";
import LoadingDiv from "./LoadingDiv";
import { useTheme } from "../contexts/ThemeContext";

const TransactionModal = (props) => {
    const { theme } = useTheme();
    const setShowTxModal = props.setShowTxModal;
    const txModalText = props.txModalText;
    const txIsLoading = props.txIsLoading;
  return (
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
            color: theme.onBackground,
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
  );
};

export default TransactionModal;
