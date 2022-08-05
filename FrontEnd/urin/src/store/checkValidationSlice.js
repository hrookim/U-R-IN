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
      const BASE_URL = process.env.REACT_APP_BACK_BASE_URL;
      const accessToken = localStorage.getItem("accessToken");

      const axiosInstance = axios.create();
      axiosInstance.defaults.baseURL = BASE_URL;

      // accessToken가 있는 경우 header에 accessToken 추가
      if (accessToken) {
        axiosInstance.defaults.headers.common[
          // eslint-disable-next-line dot-notation
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;
      }

      const response = await axiosInstance.get(`member/${memberId}/validation`);

      return response.data;
    } catch (err) {
      window.location.href = "http://localhost:3000/intro";

      alert("잘못된 접근입니다. 제대로 로그인해주세요.");
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
