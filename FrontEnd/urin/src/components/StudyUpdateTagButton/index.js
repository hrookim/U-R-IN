import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { Button } from "@mui/material";

const StudyUpdateTagButton = ({
  id,
  contents,
  getHashtagCode,
  hashtags,
  oldChecked,
}) => {
  const SelectedButtonStyle = css`
    background-color: rgb(255, 184, 2);
    color: white;
    font-size: 14px;
    border-radius: 20px;
    padding: 7px;
    text-align: center;
    border-color: rgb(255, 184, 2);
    margin: 5px 0 5px 0;
    &:hover {
      color: white;
      background-color: rgba(255, 184, 2, 0.4);
      border-color: rgb(255, 184, 2);
      margin: 5px 0 5px 0;
    }
  `;

  const unselectedButtonStyle = css`
    background-color: rgba(255, 255, 255, 1);
    color: black;

    font-size: 14px;
    border-radius: 20px;
    padding: 7px;
    text-align: center;
    border-color: rgba(0, 0, 0, 0.4);
    margin: 5px 0 5px 0;

    &:hover {
      color: white;
      background-color: rgb(255, 184, 2);
      border-color: rgb(255, 184, 2);
      margin: 5px 0 5px 0;
    }
  `;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log("oldchecked", oldChecked);
    if (oldChecked.includes(id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [oldChecked]);

  const sendHashtagCode = () => {
    getHashtagCode(id);
  };

  const handleClick = (e) => {
    const value = e.target.id;

    if (selected) {
      setSelected(false);
    } else if (hashtags.length < 3) {
      setSelected(true);
    }
    sendHashtagCode();
  };

  return (
    <div sx={{ margin: "0px" }}>
      <Button
        id={id}
        variant="outlined"
        onClick={handleClick}
        sx={selected ? SelectedButtonStyle : unselectedButtonStyle}
      >
        {contents}
      </Button>
    </div>
  );
};

export default StudyUpdateTagButton;
