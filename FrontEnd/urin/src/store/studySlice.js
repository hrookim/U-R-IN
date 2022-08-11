import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

// FIXME: navigate를 하고 싶다면, component에서 받아와야 한다! 자세한 코드는 createStudy 참조
// TODO: git branch 이름 변경: fix -> 위의 내용 수정, Studyupdate, create에서 종료일 없음 재 클릭시 갱신안되는 것 수정

// study
// 스터디 상세 보기
export const getStudy = createAsyncThunk(
  "GET_STUDY",
  async ({ studyId, navigate }) => {
    try {
      console.log("스터디 가져오는 중");
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      navigate("/notfound");
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 스터디 생성
export const createStudy = createAsyncThunk(
  "CREATE_STUDY",
  async ({ form, navigate }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const { studyId } = response.data;
      alert("스터디 생성 완료했습니다!");
      navigate(`/study/${studyId}`);
      return response.data;
    } catch (err) {
      console.log(
        "-==============================================================================i;"
      );
      console.log(err);
      alert("오류입니다!");
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 스터디 정보 수정
export const updateStudy = createAsyncThunk(
  "UPDATE_STUDY",
  async ({ studyId, form, navigate }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // const newStudyId = response.data.studyId;
      alert("스터디 수정 완료했습니다!");
      navigate(`/study/${studyId}`);
      return response.data;
    } catch (err) {
      console.log(err);
      alert("오류입니다!");
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 스터디 상태 변경 FIXME: 내가 리더인지 확인 필요 detailHeader -> 수정으로 props 넘기기 / 종료하기만 처리하면 됨!
export const changeStudyStatus = createAsyncThunk(
  "CHANGE_STUDY_STATUS",
  async ({ studyId }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}`,
        { status: "TERMINATED" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("스터디가 종료되었습니다:)");
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
    console.log(localStorage.getItem("accessToken"));
    const response = await axios.post(
      `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/participants`,
      {}, // post 두번째 인자는 payload이므로 비워서 보낸다!
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("스터디 가입이 완료되었습니다!");
    return response.data;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

// 스터디 참가자 삭제 FIXME: 분기는 백에서 처리하고 있음!
export const leaveStudy = createAsyncThunk("LEAVE_STUDY", async (arr) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACK_BASE_URL}studies/${arr[0]}/participants/${arr[1]}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("스티디원을 퇴장시켰습니다!");

    return response.data;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

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
    [createStudy.fulfilled]: (state, { payload }) => {}, // FIXME: 삭제해도 된다. state를 직접 변경하는 경우에만 남겨놓으면 되는 코드
    // TODO
    // [updateStudy.fulfilled]:
    // [changeStudyStatus.fulfilled]:
    // [joinStudy.fulfilled]: // FIXME: redirect해서 study 상세를 갱신하는 것으로
    // [leaveStudy.fulfilled]: FIXME: redirect해서 study 상세를 갱신하는 것으로
  },
});

export default studySlice.reducer;
