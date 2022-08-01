import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const getStudyList = createAsyncThunk("GET_STUDY_LIST", async () => {
  console.log("스터디 가져오는 중");
  const response = await axiosInstance.get(`studies/`);
  return response.data;
});

const studySlice = createSlice({
  name: "studies",
  initialState: {
    studyList: [
      {
        currentMember: 0,
        id: 0,
        memberCapacity: 0,
        status: "COMPLETED",
        title: "string",
      },
    ],
    totalPages: 0,
  },
  reducers: {},
  extraReducers: {
    [getStudyList.fulfilled]: (state, { payload }) => payload,
  },
});

export default studySlice.reducer;
