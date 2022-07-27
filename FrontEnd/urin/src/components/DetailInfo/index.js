import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";

const DetailInfo = () => {
  const [contents, setContents] = useState(
    "시간 : 수 금 7시~9시\n장소 : 강남프로그램\n수 - 자소서첨삭 시사상식 프리젠테이션 모의면접\n금 - 자소서첨삭 시사상식 토론면접 모의면접\n\n참고사항\n- 전공 학년 무관(기졸업자 가능)\n"
  );
  const [participants, setParticipants] = useState([
    {
      id: 1,
      nickname: "삼성바라기",
      isLeader: true,
    },
    {
      id: 2,
      nickname: "삼성가고싶당",
      isLeader: false,
    },
  ]);

  return (
    <div>
      <div>
        <h2>공지사항</h2>
        <Typography sx={{ whiteSpace: "pre-line" }}>{contents}</Typography>
      </div>
      <div>
        <h2>멤버</h2>
        {participants.map((participant) => {
          return (
            <>
              <Avatar>{participant.nickname}</Avatar>
              <div>{participant.nickname}</div>
              {/* 왕관모양 */}
              {/* 강퇴버튼 */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DetailInfo;
