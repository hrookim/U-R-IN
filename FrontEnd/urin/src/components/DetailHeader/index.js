import React from "react";
import { useDispatch } from "react-redux";
import "../../assets/DesignSystem.css";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import {
  changeStudyStatus,
  joinStudy,
  leaveStudy,
} from "../../store/studySlice";

const DetailHeader = ({
  study,
  isLeader,
  isParticipant,
  currentMemberId,
  setIsChanged,
}) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();

  const onClickTerminate = () => {
    dispatch(changeStudyStatus({ studyId })).then(() => {
      setIsChanged(true);
      setInterval(() => setIsChanged(false), 100);
    });
  };
  const onClickJoin = () => {
    dispatch(joinStudy(studyId)).then(() => {
      setIsChanged(true);
      setInterval(() => setIsChanged(false), 100);
    });
  };
  const onClickLeave = () => {
    const participantId = currentMemberId;
    dispatch(leaveStudy({ studyId, participantId })).then(() => {
      setIsChanged(true);
      setInterval(() => setIsChanged(false), 100);
    });
  };
  return (
    <div>
      {isLeader && (
        <Button
          component={Link}
          to={`/study/${studyId}/edit`}
          className="font-40"
        >
          방 정보 수정하기
        </Button>
      )}
      <div className="font-lg font-60">{study.title}</div>
      <div className="font-40">{study.status}</div>
      {study.dday === -1 ? (
        <div />
      ) : (
        <div className="font-40">{`D-${study.dday}`}</div>
      )}

      {isLeader ? (
        <div className="font-40">
          {study.status !== "TERMINATED" && (
            <div>
              {!study.onair ? (
                <Button variant="contained">미팅 시작하기</Button>
              ) : (
                <Button variant="contained" disabled>
                  미팅 중
                </Button>
              )}
              <Button onClick={onClickTerminate}>스터디 종료하기</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="font-40">
          {isParticipant ? (
            <div className="font-40">
              {study.onair ? (
                <Button variant="contained">미팅 입장하기</Button>
              ) : (
                <Button variant="contained" disabled>
                  미팅 입장하기
                </Button>
              )}
              <Button onClick={onClickLeave}>스터디 나가기</Button>
            </div>
          ) : (
            <Button variant="contained" onClick={onClickJoin}>
              스터디 참여하기
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailHeader;
