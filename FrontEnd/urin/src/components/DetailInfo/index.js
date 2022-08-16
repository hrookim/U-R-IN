import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Avatar, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { leaveStudy } from "../../store/studySlice";
import "../../assets/DesignSystem.css";
import "./index.css";

const StyledXbutton = styled.span`
  color: red;
  cursor: pointer;
`;

const DetailInfo = ({ study, isLeader, isParticipant, setIsChanged }) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();

  const onClickLeave = (memberId) => {
    dispatch(leaveStudy([studyId, memberId])).then(() => {
      setIsChanged(true);
      setInterval(() => setIsChanged(false), 100);
    });
  };
  return (
    <div className="detail-info">
      <div>
        <p className="font-70 content-title">공지사항</p>
        <hr />
        <Typography className="font-sm font-40" sx={{ whiteSpace: "pre-line" }}>
          {study.notice}
        </Typography>
      </div>
      <div>
        <p className="font-70 content-title2">멤버</p>
        <hr />
        {study.participants.map((participant) => (
          <div
            key={participant.id}
            className="member-info"
            style={{ margin: "0 0 15px 0" }}
          >
            <Avatar sx={{ width: "30px", height: "30px" }}>
              {participant.nickname[0]}
            </Avatar>
            <span>{participant.nickname}</span>
            {participant.isLeader && (
              <FontAwesomeIcon icon={faCrown} style={{ margin: "0 0 0 8px" }} />
            )}
          </div>
        ))}
        {/* {study.participants.map((participant) => (
          <div
            key={participant.id}
            className="member-info"
            style={{ margin: "0 0 15px 0" }}
          >
            <Avatar sx={{ width: "30px", height: "30px" }}>
              {participant.nickname[0]}
            </Avatar>
            <span>{participant.nickname}</span>
            {participant.isLeader && (
              <FontAwesomeIcon icon={faCrown} style={{ margin: "0 0 0 8px" }} />
            )}
            {console.log(isLeader, study.status)}
            {isLeader &&
            !participant.isLeader &&
            study.status != "TERMINATED" ? (
              <IconButton onClick={() => onClickLeave(participant.id)}>
                <RemoveCircleOutlineIcon
                  sx={{ fontSize: "small", color: "#f44336" }}
                />
              </IconButton>
            ) : null}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default DetailInfo;
