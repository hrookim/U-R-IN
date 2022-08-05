import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api";

// 피드 리스트 불러오기
export const getFeed = createAsyncThunk("GET_FEED", async (studyId) => {
  console.log("피드 가져오는 중");
  const response = await axiosInstance.get(`studies/${studyId}/feeds`);
  return response.data;
});

// 피드 생성하기 FIXME: 생성 후 새로 store에 추가를 해야함, 댓글형성도 같이 이뤄짐
export const createFeed = createAsyncThunk(
  "CREATE_FEED",
  async (studyId, form) => {
    try {
      const response = await axiosInstance.post(
        `studies/${studyId}/feeds`,
        form
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
      const response = await axiosInstance.put(
        `studies/${studyId}/feeds/${feedId}`,
        form
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
      const response = await axiosInstance.delete(
        `studies/${studyId}/feeds/${feedId}`
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
