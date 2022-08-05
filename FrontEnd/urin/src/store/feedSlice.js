import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

// 피드 리스트 불러오기
export const getFeed = createAsyncThunk("GET_FEED", async (studyId) => {
  console.log("피드 가져오는 중");
  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
});

// 피드 생성하기 FIXME: 생성 후 새로 store에 추가를 해야함, 댓글형성도 같이 이뤄짐
export const createFeed = createAsyncThunk(
  "CREATE_FEED",
  async (studyId, form) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds`,
        form,
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

// 피드 수정하기 FIXME: feedId를 잡아야 한다!
export const updateFeed = createAsyncThunk(
  "UPDATE_FEED",
  async ({ studyId, feedId, form }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/feeds/${feedId}`,
        form,
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

// 피드 삭제하기 FIXME: 작성자와 방장만 삭제 가능한가?
export const deleteFeed = createAsyncThunk(
  "DELETE_FEED",
  async ({ studyId, feedId }) => {
    try {
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
            deleted: true,
            feedId: 0,
            writer: "string",
            writerId: 0,
          },
        ],
        parent: {
          contents: "string",
          createdAt: "string",
          deleted: true,
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
    // [createFeed.fulfilled]: (state, { payload }) => payload,
    // [updateFeed.fulfilled]: (state, { payload }) => payload,
    // [deleteFeed.fulfilled]: (state, { payload }) => payload,
  },
});

export default feedSlice.reducer;
