import React, { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import DetailInfo from "../DetailInfo";
import DetailInquiry from "../DetailInquiry";
import DetailFeed from "../DetailFeed";

const DetailTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div>
      <Tabs onChange={handleChange} value={value}>
        <Tab label="정보" />
        <Tab label="질의응답" />
        <Tab label="피드" />
      </Tabs>

      {value === 0 && <DetailInfo />}
      {value === 1 && <DetailInquiry />}
      {value === 2 && <DetailFeed />}
    </div>
  );
};

export default DetailTabs;
