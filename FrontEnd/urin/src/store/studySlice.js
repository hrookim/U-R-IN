import React from "react";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api";

// FIXME: navigate를 하고 싶다면, component에서 받아와야 한다! 자세한 코드는 createStudy 참조

// study
// 스터디 상세 보기
export const getStudy = createAsyncThunk("GET_STUDY", async (studyId) => {
  try {
    console.log("스터디 가져오는 중");
    const response = await axiosInstance.get(`studies/${studyId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

// 스터디 생성
export const createStudy = createAsyncThunk(
  "CREATE_STUDY",
  async ({ form, navigate }) => {
    try {
      const response = await axiosInstance.post(`studies/`, form);
      const { studyId } = response.data;
      navigate(`/study/${studyId}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 스터디 정보 수정
export const updateStudy = createAsyncThunk(
  "UPDATE_STUDY",
  async ({ studyId, form, navigate }) => {
    try {
      const response = await axiosInstance.put(`studies/${studyId}`, form);
      const newStudyId = response.data.studyId;
      navigate(`/study/${newStudyId}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 스터디 상태 변경 FIXME: 내가 리더인지 확인 필요 detailHeader -> 수정으로 props 넘기기 / 종료하기만 처리하면 됨!
export const changeStudyStatus = createAsyncThunk(
  "CHANGE_STUDY_STATUS",
  async (studyId, status) => {
    try {
      const response = await axiosInstance.patch(`studies/${studyId}`, {
        status,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// participants
// 스터디 가입 FIXME: 내가 스터디원인지 확인 필요 detailHeader
export const joinStudy = createAsyncThunk("JOIN_STUDY", async (studyId) => {
  try {
    const response = await axiosInstance.post(
      `studies/${studyId}/participants`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

// 스터디 참가자 삭제 FIXME: 이 기능은... 어느페이지에서 구현되는 기능일까요
// TODO: 스스로 나가는 것과 강퇴 구분 필요, 함수를 나눠야 할 수도 있음
export const leaveStudy = createAsyncThunk(
  "LEAVE_STUDY",
  async (studyId, participantsId) => {
    try {
      const response = await axiosInstance.delete(
        `studies/${studyId}/participants/${participantsId}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

const studySlice = createSlice({
  // state에 들어가는 이름
  // 각 컴퍼넌트에서 state.study 이런 식으로 부를 때 사용
  name: "study",
  // 초기 상태, 백으로부터 데이터를 불러오는데 혹시라도 실패한다면 이 데이터가 보이기 때문에
  // 빈 객체 보다는 적당히 형태를 잡아두는게 좋음
  initialState: {
    currentMember: 0,
    expirationDate: "1996-08-28", // 예시
    dday: 0,
    id: 0,
    memberCapacity: 0,
    notice: "string",
    onair: true,
    participants: [
      {
        id: 0,
        isLeader: true,
        nickname: "string",
      },
    ],
    status: "COMPLETED",
    title: "string",
  },
  // 비동기 통신이 없는 상황에서 사용 : 서버에 요청 없이 study의 상태를 바꿀 일이 없기 때문에 딱히 쓸 일이 없음
  reducers: {},

  // [함수명.함수상태]: (state, { payload }) => {상태를 변경 or 함수가 실행된 다음 하고 싶은 행동}

  // 함수상태: pending, fulfilled, rejected 등이 있음, rejected는 요청에 실패한 경우 => 에러 처리에 사용
  // state: study를 의미하지만 study가 아닌 state로 적어야 하는 점 주의
  // payload: 보통 함수의 return 문 안에 있는 요청으로 받아온 response.data
  //          API명세에서 응답을 어떻게 보내주는지 확인

  // [getStudy.fulfilled]: (state, { payload }) => payload,
  // getStudy가 완료되면 현재 상태인 state를 payload(getStudy가 받아온 response.data)로 대체시키겠다.
  extraReducers: {
    [getStudy.fulfilled]: (state, { payload }) => payload,
    // [createStudy.pending]: (state, {payload}) => {},
    [createStudy.fulfilled]: (state, { payload }) => {},
    // TODO
    // [updateStudy.fulfilled]:
    // [changeStudyStatus.fulfilled]:
    // [joinStudy.fulfilled]:
    // [leaveStudy.fulfilled]:
  },
});

export default studySlice.reducer;
