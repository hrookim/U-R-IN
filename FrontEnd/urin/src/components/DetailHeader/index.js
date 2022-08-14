import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import "../../assets/DesignSystem.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

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
    const confirmAnswer = window.confirm("스터디를 종료하시겠습니까?");
    if (confirmAnswer) {
      dispatch(changeStudyStatus({ studyId })).then(() => {
        setIsChanged(true);
        setInterval(() => setIsChanged(false), 100);
      });
    }
  };
  const onClickJoin = () => {
    dispatch(joinStudy(studyId)).then(() => {
      setIsChanged(true);
      setInterval(() => setIsChanged(false), 100);
    });
  };
  const onClickLeave = () => {
    const confirmAnswer = window.confirm("스터디를 탈퇴하시겠습니까?");
    if (confirmAnswer) {
      const participantId = currentMemberId;
      dispatch(leaveStudy({ studyId, participantId })).then(() => {
        setIsChanged(true);
        setInterval(() => setIsChanged(false), 100);
      });
    }
  };
  return (
    <div>
      <div className="dh-container">
        <div className="dh-chips">
          {study.hashtagNameList.map((item) => (
            <button
              type="button"
              className="dh-chip-button font-30 font-xs"
              disabled
              key={item.code}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="dh-container-item">
          <span className="font-xl font-70">{study.title}</span>
          {isLeader && (
            <Link to={`/study/${studyId}/edit`} className="dh-setting-icon">
              <SettingsIcon color="action" sx={{ fontSize: 30 }} />
            </Link>
          )}
        </div>
        <div className="dh-container-item">
          {study.status === "TERMINATED" && (
            <span className="font-40 font-sm dh-tag">종료</span>
          )}
          {study.status === "COMPLETED" && (
            <span className="font-40 font-sm dh-tag">모집 완료</span>
          )}
          {study.status === "RECRUITING" && (
            <span className="font-40 font-sm dh-tag">모집 중</span>
          )}
          {study.dday > 0 && (
            <span className="font-40 font-sm dh-tag">{`D-${study.dday}`}</span>
          )}
          {study.dday <= 0 && (
            <span className="font-40 font-sm dh-tag">D-day</span>
          )}
        </div>

        {study.status !== "TERMINATED" && (
          <div className="dh-container-item2">
            {isLeader ? (
              <div className="font-40">
                {study.status !== "TERMINATED" && (
                  <div>
                    {study.isOnair ? (
                      <button
                        type="button"
                        className="dh-meeting-button font-50 font-sm"
                        disabled
                      >
                        미팅 중
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="dh-meeting-button font-50 font-sm"
                      >
                        미팅 시작하기
                      </button>
                    )}
                    <button
                      type="button"
                      className="dh-study-button font-50 font-sm"
                      onClick={onClickTerminate}
                    >
                      스터디 종료하기
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="font-40">
                {isParticipant ? (
                  <div className="font-40">
                    {study.isOnair ? (
                      <button
                        type="button"
                        className="dh-meeting-button font-50 font-sm"
                      >
                        미팅 입장하기
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="dh-meeting-button font-50 font-sm"
                        disabled
                      >
                        미팅 입장하기
                      </button>
                    )}
                    <button
                      type="button"
                      className="dh-study-button dh-study-button-leave font-50 font-sm"
                      onClick={onClickLeave}
                    >
                      스터디 나가기
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="dh-study-button font-50 font-md"
                    onClick={onClickJoin}
                  >
                    스터디 참여하기
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailHeader;
