import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getReport = createAsyncThunk("GET_REPORT", async (arr) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACK_BASW_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    feedBackList: [
      {
        id: 0,
      },
    ],
    aiAnalysisList: [
      {
        confidence: 1,
      },
    ],
  },
  reducers: {},
  extraReducers: {
    [getReport.fulfilled]: (state, { payload }) => payload,
  },
});

export default reportSlice.reducer;
