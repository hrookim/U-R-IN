import React from "react";
import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const checkValidation = createAsyncThunk(
  "CHECK_VALIDATION",
  async (memberId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_BASE_URL}member/${memberId}/validation`,
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
  }
);

const checkValidationSlice = createSlice({
  name: "validation",

  initialState: {
    validation: false,
  },
  reducers: {},

  extraReducers: {
    [checkValidation.fulfilled]: (state, { payload }) => payload,
  },
});

export default checkValidationSlice.reducer;
