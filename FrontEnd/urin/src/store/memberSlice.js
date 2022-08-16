import axios from "axios";

import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getMemberId = createAsyncThunk(
  "GET_MEMBERID",
  async (navigate) => {
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
      localStorage.clear();
      navigate("/intro");
      window.location.reload();
      return isRejectedWithValue(err.response.data);
    }
  }
);

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
