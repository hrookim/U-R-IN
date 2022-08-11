import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getInquiry = createAsyncThunk("GET_INQUIRY", async (arr) => {
  console.log("===axios INQUIERY 불러오기===");
  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}studies/${arr[0]}/inquiry?page=${arr[1]}&size=5&sort=id,desc`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
});

export const createInquiry = createAsyncThunk(
  "CREATE_INQUIRY",
  async ({ studyId, form, parentId }) => {
    try {
      console.log("===axios INQUIERY 생성===", parentId);
      if (parentId) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry`,
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
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry`,
        { parent: 0, contents: form },
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

export const updateInquiry = createAsyncThunk(
  "UPDATE_INQUIRY",
  async ({ studyId, inquiryId, form }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry/${inquiryId}`,
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

export const deleteInquiry = createAsyncThunk(
  "DELETE_INQUIRY",
  async ({ studyId, inquiryId }) => {
    try {
      console.log("===axios INQUIERY 삭제===");
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry/${inquiryId}`,
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

const inquirySlice = createSlice({
  name: "inquiry",
  initialState: {
    inquiryList: [
      {
        children: [
          {
            contents: "string",
            createdAt: "string",
            isDeleted: true,
            inquiryId: 0,
            writer: "string",
            writerId: 0,
          },
        ],
        parent: {
          contents: "string",
          createdAt: "string",
          isDeleted: true,
          inquiryId: 0,
          writer: "string",
          writerId: 0,
        },
      },
    ],
    totalPages: 1,
  },
  reducers: {},
  extraReducers: {
    [getInquiry.fulfilled]: (state, { payload }) => payload,
  },
});

export default inquirySlice.reducer;
