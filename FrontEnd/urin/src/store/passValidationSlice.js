import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const passValidation = createAsyncThunk(
  "PASS_VALIDATION",
  async ({ memberId, navigate }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACK_BASE_URL}member/${memberId}/pass`,
        { isPassed: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);

      return isRejectedWithValue(err.response.data);
    }
  }
);

const passValidationSlice = createSlice({
  name: "passValidation",

  initialState: {
    passValidation: false,
  },
  reducers: {},

  extraReducers: {
    [passValidation.fulfilled]: (state, { payload }) => payload,
  },
});

export default passValidationSlice.reducer;
