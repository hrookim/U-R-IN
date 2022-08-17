import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getFeed = createAsyncThunk(
  "GET_FEED",
  async ({ studyId, pageValue }) => {
    console.log("슬라이스 액시오스 안에", studyId, pageValue);
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds?page=${pageValue}&size=5&sort=id,desc`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  }
);

export const createFeed = createAsyncThunk(
  "CREATE_FEED",
  async ({ studyId, form, parentId }) => {
    try {
      console.log("===axios FEED 생성===", parentId, form);
      if (parentId) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds`,
          { parent: parentId, contents: form },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        return response.data;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds`,
        { parent: parentId, contents: form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      alert("오류입니다!");
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const updateFeed = createAsyncThunk(
  "UPDATE_FEED",
  async ({ studyId, feedId, form }) => {
    console.log("===axios FEED 수정===", feedId, form);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds/${feedId}`,
        { contents: form },
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

export const deleteFeed = createAsyncThunk(
  "DELETE_FEED",
  async ({ studyId, feedId }) => {
    try {
      console.log("===axios FEED 삭제===");
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds/${feedId}`,
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

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedList: [
      {
        children: [
          {
            contents: "string",
            createdAt: "string",
            isDeleted: true,
            feedId: 0,
            writer: "string",
            writerId: 0,
          },
        ],
        parent: {
          contents: "string",
          createdAt: "string",
          isDeleted: true,
          feedId: 0,
          writer: "string",
          writerId: 0,
        },
      },
    ],
    totalPages: 1,
  },
  reducers: {},
  extraReducers: {
    [getFeed.fulfilled]: (state, { payload }) => payload,
  },
});

export default feedSlice.reducer;
