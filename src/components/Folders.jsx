import React from "react";
import { FolderTab2024, FoldersContainer2024 } from "../Styles";
import { FoldersRowCentered } from "../data/css/Form";
import { capitalizeFirstLetter } from "../data/functions/helpers";

const Folders = (props) => {
  const currentSection = props.currentSection;
  const setCurrentSection = props.setCurrentSection;
  const tabs = props.tabs;
  let color = "white";
  if(props.color){
    color = props.color;
  }
  return (
    <FoldersContainer2024>
      <FoldersRowCentered>
        {tabs?.length > 0 &&
          tabs.map((item, index) => (
            <FolderTab2024 key={index}
              color={color}
              selected={currentSection == item}
              disabled={currentSection == item}
              onClick={() => {
                setCurrentSection(item);
              }}
            >
              {capitalizeFirstLetter(item)}
            </FolderTab2024>
          ))}
      </FoldersRowCentered>
    </FoldersContainer2024>
  );
};

export default Folders;
