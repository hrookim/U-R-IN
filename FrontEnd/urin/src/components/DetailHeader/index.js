import React, { useState } from "react";
import "../../assets/DesignSystem.css";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

const DetailHeader = () => {
  // study detail에서 props으로 받을 것
  const studyHeader = {
    currentMember: 2,
    dday: 40,
    id: 1,
    memberCapacity: 6,
    notice: "string", // Header에서는 사용되지 않음
    onair: true,
    participants: [
      {
        id: 1,
        isLeader: true,
        nickname: "string",
      }, // Header에서는 사용되지 않음
    ],
    status: "RECRUITING",
    title: "카카오엔터프라이즈 프론트엔드 면접 스터디",
  };
  // TODO: currentUser 필요
  // TODO: isLeader, isParticipant 확인 필요
  // TODO: 스터디 참여하기, 나가기, 종료하기 -> redux
  // TODO: 미팅 입장하기: 미팅 창 생성
  const isLeader = false;
  const isParticipant = true;
  const { studyId } = useParams();

  return (
    <div>
      <Button
        component={Link}
        to={`/study/${studyId}/edit`}
        className="font-40"
      >
        방 정보 수정하기
      </Button>
      <div className="font-lg font-60">{studyHeader.title}</div>
      <div className="font-40">{studyHeader.status}</div>
      <div className="font-40">{`D-${studyHeader.dday}`}</div>

      {isLeader ? (
        <div className="font-40">
          {!studyHeader.onair ? (
            <Button variant="contained">미팅 시작하기</Button>
          ) : (
            <Button variant="contained" disabled>
              미팅 중
            </Button>
          )}
          <Button>스터디 종료하기</Button>
        </div>
      ) : (
        <div className="font-40">
          {isParticipant ? (
            <div className="font-40">
              {studyHeader.onair ? (
                <Button variant="contained">미팅 입장하기</Button>
              ) : (
                <Button variant="contained" disabled>
                  미팅 입장하기
                </Button>
              )}
              <Button>스터디 나가기</Button>
            </div>
          ) : (
            <Button variant="contained">스터디 참여하기</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailHeader;
// 1. 방장이냐? -> 미팅 시작하기
// 2. 스터디원이다 (onair에서 두가지로 나뉘고)
// 3. 스터디원이 아니다. (status 두가지로 나뉘고)
