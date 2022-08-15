import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getStudyList = createAsyncThunk("GET_STUDY_LIST", async (arr) => {
  try {
    console.log(arr);
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_BASE_URL}studies?page=${arr[0]}&size=24&sort=id,desc&isRecruiting=${arr[1]}&keyword=${arr[2]}&hashtags=${arr[3]}`,
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
});

const studyListSlice = createSlice({
  name: "studies",
  initialState: {
    studyList: [
      {
        currentMember: 0,
        id: 0,
        memberCapacity: 0,
        status: "COMPLETED",
        title: "string",
      },
    ],
    totalPages: 1,
  },
  reducers: {},
  extraReducers: {
    [getStudyList.fulfilled]: (state, { payload }) => payload,
  },
});

export default studyListSlice.reducer;
