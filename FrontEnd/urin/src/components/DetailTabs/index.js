import React, { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import DetailInfo from "../DetailInfo";
import DetailInquiry from "../DetailInquiry";
import DetailFeed from "../DetailFeed";

const DetailTabs = ({ study, isLeader, isParticipant, setIsChanged }) => {
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
        {/* TODO: 스터디원이 아니면 피드는 비활성화되어 클릭되지 않는다. 피드옆에 자물쇠표시 있으면 좋을듯 */}
        {isParticipant ? <Tab label="피드" /> : <Tab label="피드" disabled />}
      </Tabs>

      {value === 0 && (
        <DetailInfo
          study={study}
          isLeader={isLeader}
          isParticipant={isParticipant}
          setIsChanged={setIsChanged}
        />
      )}
      {value === 1 && (
        <DetailInquiry
          study={study}
          isLeader={isLeader}
          isParticipant={isParticipant}
        />
      )}
      {value === 2 && (
        <DetailFeed
          study={study}
          isLeader={isLeader}
          isParticipant={isParticipant}
        />
      )}
    </div>
  );
};

export default DetailTabs;
