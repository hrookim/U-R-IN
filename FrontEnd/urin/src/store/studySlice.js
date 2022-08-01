import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const getStudy = createAsyncThunk("GET_STUDY", async (studyId) => {
  console.log("스터디 가져오는 중");
  const response = await axiosInstance.get(`studies/${studyId}`);
  return response.data;
});

const studySlice = createSlice({
  name: "study",
  initialState: {
    currentMember: 0,
    dday: 0,
    id: 0,
    memberCapacity: 0,
    notice: "string",
    onair: true,
    participants: [
      {
        id: 0,
        // TODO: leader vs isLeader?
        leader: true,
        nickname: "string",
      },
    ],
    status: "COMPLETED",
    title: "string",
  },
  reducers: {},
  extraReducers: {
    [getStudy.fulfilled]: (state, { payload }) => payload,
  },
});

export default studySlice.reducer;
