import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { Button } from "@mui/material";

const SearchButton = ({
  id,
  contents,
  getHashtagCode,
  hashtags,
  oldChecked,
}) => {
  const SelectedButtonStyle = css`
    background-color: #0037fa;
    color: white;
    font-size: 14px;
    border-radius: 20px;
    padding: 7px;
    text-align: center;
    border-color: #0037fa;
    margin: 5px 0 5px 0;
    &:hover {
      color: white;
      background-color: rgba(0, 55, 250, 0.4);
      border-color: #0037fa;
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
    border-color: black;
    margin: 5px 0 5px 0;

    &:hover {
      color: black;
      background-color: rgba(255, 255, 255, 0.8);
      border-color: rgba(255, 255, 255, 0.6);
      margin: 5px 0 5px 0;
    }
  `;

  const [selected, setSelected] = useState(false);

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

export default SearchButton;
