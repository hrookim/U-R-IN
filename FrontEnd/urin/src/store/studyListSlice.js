import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const getStudyList = createAsyncThunk("GET_STUDY_LIST", async () => {
  console.log("hello");
  const response = await axiosInstance.get(`studies/`);
  console.log("hello");

  return response.data;
});

const studyListSlice = createSlice({
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
    totalPages: 1,
  },
  reducers: {},
  extraReducers: {
    [getStudyList.fulfilled]: (state, { payload }) => payload,
  },
});

export default studyListSlice.reducer;
