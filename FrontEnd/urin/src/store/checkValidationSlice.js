import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const checkValidation = createAsyncThunk(
  "CHECK_VALIDATION",
  async (memberId, navigate) => {
    try {
      if (memberId === undefined) {
        localStorage.clear();
        navigate("/intro");
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_BASE_URL}member/${memberId}/validation`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        return response.data;
      }
      return { message: "잘못된 요청입니다." };
    } catch (err) {
      localStorage.clear();
      navigate("/intro");
      // window.location.reload();
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
