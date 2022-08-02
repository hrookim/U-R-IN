import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Avatar, Typography } from "@mui/material";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getStudy } from "../../store/studySlice";

const DetailInfo = () => {
  // dispatch와 selector는 redux와 관련
  // dispatch: redux의 함수를 불러올 때 사용
  //           Slice에 있는 함수 중 필요한 것을 import해서 dispatch와 결합
  //           dispatch(getStudy)
  // selector: redux의 상태를 불러올 때 사용, 함수형으로 써야 함
  //           (state) => state.study
  const dispatch = useDispatch();
  const study = useSelector((state) => state.study);

  // useParams는 react-router와 관련
  // 현재 위치가 /study/:studyId이기 때문에
  // : 뒤에 있는 studyId를 가져올 수 있음
  const { studyId } = useParams();

  // useEffect의 첫번째 인자: 컴퍼넌트가 mounted, updated, unmounted될 때 수행할 함수
  // 최초 진입시 컴퍼넌트의 study는 initialState상태(정보가 없는 상태)이므로 dispatch로 데이터를 불러와야 함
  // useEffect의 두번째 인자:
  // 없는 경우, 빈 배열, 배열 안에 의존값 => https://react.vlpt.us/basic/16-useEffect.html
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
