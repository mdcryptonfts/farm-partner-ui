import React from "react";
import {
  ModalContent,
  SelectTokenHeaderCont,
  SelectTokenModalInnerWrapper,
  SelectTokenModalWrapper,
  SelectTokenRow,
  SelectTokenRowTokenAmount,
  SelectTokenRowTokenName,
} from "../data/css/TokenModal";

const SelectTokenModal = (props) => {
  const showTokenModal = props.showTokenModal;
  const setShowTokenModal = props.setShowTokenModal;
  const tokens = props.tokens;
  const selectedToken = props.selectedToken;
  const setSelectedToken = props.setSelectedToken;

  return (
    <SelectTokenModalWrapper className={showTokenModal}>
      <SelectTokenHeaderCont>
        <div>Select A Token</div>
        <div style={{ paddingRight: "5px", fontWeight: "300" }}>
          <button onClick={() => setShowTokenModal(false)}>X</button>
        </div>
      </SelectTokenHeaderCont>
      <SelectTokenModalInnerWrapper>
        <ModalContent>
          {tokens?.length > 0 ? (
            tokens
              .sort((a, b) => b.amount - a.amount)
              .map((t, index) => (
                <SelectTokenRow key={index}>
                  <button
                    onClick={() => {
                      setSelectedToken(t);
                      setShowTokenModal(false);
                    }}
                  >
                    <img
                      src={`https://logos.waxdao.io/${t.currency.toLowerCase()}_${
                        t.contract
                      }.png`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://logos.waxdao.io/default-logo.png";
                      }}
                    />

                    <SelectTokenRowTokenName>
                      {t.currency}
                    </SelectTokenRowTokenName>

                    <SelectTokenRowTokenAmount>
                      {t.amount}
                    </SelectTokenRowTokenAmount>
                  </button>
                </SelectTokenRow>
              ))
          ) : (
            <span>No tokens available</span>
          )}
        </ModalContent>
      </SelectTokenModalInnerWrapper>
    </SelectTokenModalWrapper>
  );
};

export default SelectTokenModal;
