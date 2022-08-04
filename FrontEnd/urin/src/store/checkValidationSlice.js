import React from "react";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const checkValidation = createAsyncThunk(
  "CHECK_VALIDATION",
  async (memberId) => {
    try {
      const response = await axiosInstance.get(`member/${memberId}/validation`);
      return response.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

const checkValidationSlice = createSlice({
  // state에 들어가는 이름
  // 각 컴퍼넌트에서 state.study 이런 식으로 부를 때 사용
  name: "validation",
  // 초기 상태, 백으로부터 데이터를 불러오는데 혹시라도 실패한다면 이 데이터가 보이기 때문에
  // 빈 객체 보다는 적당히 형태를 잡아두는게 좋음
  initialState: {
    validation: false,
  },
  reducers: {},

  extraReducers: {
    [checkValidation.fulfilled]: (state, { payload }) => payload,
  },
});

export default checkValidationSlice.reducer;
