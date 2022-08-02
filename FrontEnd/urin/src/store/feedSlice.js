import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const getFeed = createAsyncThunk("GET_FEED", async (studyId) => {
  console.log("피드 가져오는 중");
  const response = await axiosInstance.get(`studies/${studyId}/feeds`);
  return response.data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedList: [
      {
        children: [
          {
            contents: "string",
            createdAt: "string",
            deleted: true,
            feedId: 0,
            writer: "string",
            writerId: 0,
          },
        ],
        parent: {
          contents: "string",
          createdAt: "string",
          deleted: true,
          feedId: 0,
          writer: "string",
          writerId: 0,
        },
      },
    ],
    totalPages: 0,
  },
  reducers: {},
  extraReducers: {
    [getFeed.fulfilled]: (state, { payload }) => payload,
  },
});

export default feedSlice.reducer;
