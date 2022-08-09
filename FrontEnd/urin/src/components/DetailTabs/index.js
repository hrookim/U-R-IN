import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs } from "@mui/material";
import "./index.css";

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
    <div className="dt-container">
      <Tabs onChange={handleChange} value={value} centered fill>
        <Tab label="정보" />
        <Tab label="QnA" />
        {isParticipant ? (
          <Tab label="피드" />
        ) : (
          <Tab label="피드" icon={<FontAwesomeIcon icon={faLock} />} disabled />
        )}
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
