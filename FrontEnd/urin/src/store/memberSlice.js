import React from "react";
import axios from "axios";

import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getMemberId = createAsyncThunk("GET_MEMBERID", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_BASE_URL}member/me`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    window.location.href = "http://localhost:3000/intro";
    console.log("잘못된 접근입니다. 제대로 로그인해주세요.");
    return isRejectedWithValue(err.response.data);
  }
});

const memberSlice = createSlice({
  name: "member",

  initialState: {
    id: 0,
    memberName: "Unknown",
    nickname: "Unknown",
  },
  reducers: {},

  extraReducers: {
    [getMemberId.fulfilled]: (state, { payload }) => payload,
  },
});

export default memberSlice.reducer;
