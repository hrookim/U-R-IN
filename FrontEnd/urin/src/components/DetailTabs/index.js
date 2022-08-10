import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import DetailInfo from "../DetailInfo";
import DetailInquiry from "../DetailInquiry";
import DetailFeed from "../DetailFeed";

const DetailTabs = ({ study, isLeader, isParticipant, setIsChanged }) => {
  const [key, setKey] = useState("정보");

  return (
    <div className="dt-container">
      <Tabs
        defaultActiveKey="정보"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="정보" title="정보">
          <DetailInfo
            study={study}
            isLeader={isLeader}
            isParticipant={isParticipant}
            setIsChanged={setIsChanged}
          />
        </Tab>
        <Tab eventKey="QnA" title="QnA">
          <DetailInquiry
            study={study}
            isLeader={isLeader}
            isParticipant={isParticipant}
          />
        </Tab>
        {isParticipant ? (
          <Tab eventKey="피드" title="피드">
            <DetailFeed
              study={study}
              isLeader={isLeader}
              isParticipant={isParticipant}
            />
          </Tab>
        ) : (
          <Tab
            eventKey="피드"
            title={
              <span>
                <LockIcon /> 피드
              </span>
            }
            disabled
          >
            <DetailFeed
              study={study}
              isLeader={isLeader}
              isParticipant={isParticipant}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default DetailTabs;
