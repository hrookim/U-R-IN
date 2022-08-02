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
      {
        currentMember: 3,
        id: 1,
        memberCapacity: 4,
        status: "NOT YET",
        title: "string",
      },
      {
        currentMember: 2,
        id: 2,
        memberCapacity: 4,
        status: "COMPLETED",
        title: "string",
      },
    ],
    totalPages: 1,
  },
  reducers: {},
  extraReducers: {
    [getStudyList.fulfilled]: (state, { payload }) => payload,
  },
});

export default studySlice.reducer;
