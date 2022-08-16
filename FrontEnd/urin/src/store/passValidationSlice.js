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
      console.log(memberId, `Bearer ${localStorage.getItem("accessToken")}`);
      const response = await axios.patch(
        `${process.env.REACT_APP_BACK_BASE_URL}member/${memberId}/pass`,
        { isPassed: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("합격자 인증 후 리스폰스", response);
      return response.data;
    } catch (err) {
      console.log(err);
      // localStorage.clear();
      // navigate("/intro");
      // window.location.reload();
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
