import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Avatar, Typography } from "@mui/material";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getStudy } from "../../store/studySlice";

const DetailInfo = () => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const study = useSelector((state) => state.study);

  useEffect(() => {
    dispatch(getStudy(studyId));
  }, []);

  return (
    <div>
      <div>
        <h2>공지사항</h2>
        <Typography sx={{ whiteSpace: "pre-line" }}>{study.notice}</Typography>
      </div>
      <div>
        <h2>멤버</h2>
        {study.participants.map((participant) => (
          <div key={participant.id}>
            <Avatar>{participant.nickname[0]}</Avatar>
            <span>
              {participant.nickname}
              {/* TODO: leader vs isLeader? */}
              {participant.leader && <FontAwesomeIcon icon={faCrown} />}
            </span>
            {/* TODO: 강퇴버튼 - 로그인 한 유저가 방장이라면 강퇴기능 추가 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailInfo;
