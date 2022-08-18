import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

// 미팅 id들 받아오기

export const getMeeting = createAsyncThunk(
  "GET_MEETING",
  async ({ studyId, navigate }) => {
    try {
      console.log("미팅 가져오는 중");
      const response = await axios.get(
        // 나중에 수정
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/meeting/Id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response, "ssssss");
      // if (response.data === []) {
      //   navigate("/notfound");
      // }
      return response.data;
    } catch (err) {
      console.log(err);
      navigate("/notfound");
      return isRejectedWithValue(err.reponse.data);
    }
  }
);

const meetingSlice = createSlice({
  name: "meeting",
  initialState: { meetingIdList: [{ meetingId: 0 }] },
  reducers: {},
  extraReducers: {
    [getMeeting.fulfilled]: (state, { payload }) => payload,
  },
});

export default meetingSlice.reducer;
