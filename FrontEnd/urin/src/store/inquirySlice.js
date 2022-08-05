import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const getInquiry = createAsyncThunk("GET_INQUIRY", async (studyId) => {
  console.log("문의사항 가져오는 중");
  const response = await axiosInstance.get(`studies/${studyId}/inquiry`);
  return response.data;
});

// 인콰이어리 생성하기 FIXME: 생성 후 새로 store에 추가를 해야함, 댓글형성도 같이 이뤄짐
export const createInquiry = createAsyncThunk(
  "CREATE_INQUIRY",
  async (studyId, form) => {
    try {
      const response = await axiosInstance.post(
        `studies/${studyId}/inquiry`,
        form
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 인콰이어리 수정하기 FIXME: feedId를 잡아야 한다!
export const updateInquiry = createAsyncThunk(
  "UPDATE_INQUIRY",
  async ({ studyId, inquiryId, form }) => {
    try {
      const response = await axiosInstance.put(
        `studies/${studyId}/inquiry/${inquiryId}`,
        form
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

// 인콰이어리 삭제하기 FIXME:
export const deleteInquiry = createAsyncThunk(
  "DELETE_INQUIRY",
  async ({ studyId, inquiryId }) => {
    try {
      const response = await axiosInstance.delete(
        `studies/${studyId}/inquiry/${inquiryId}`
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
            deleted: true,
            inquiryId: 0,
            writer: "string",
            writerId: 0,
          },
        ],
        parent: {
          contents: "string",
          createdAt: "string",
          deleted: true,
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

// const data = {
//     totalPages: 1,
//     inquiryList: [
//       {
//         parent: {
//           inquiryId: 3,
//           contents: "스터디 방식이 어떻게 되나요?",
//           writerId: 2,
//           writer: "삼성가고싶당",
//           createdAt: "2022-07-27 10:00:00",
//           isDeleted: false,
//         },
//         children: [
//           {
//             inquiryId: 4,
//             contents: "주 1회 진행 예정입니다.",
//             writerId: 1,
//             writer: "삼성바라기",
//             createdAt: "2022-07-27 10:10:00",
//             isDeleted: false,
//           },
//           {
//             inquiryId: 5,
//             contents: "좋습니다. 고민해보겠습니다.",
//             writerId: 2,
//             writer: "삼성가고싶당",
//             createdAt: "2022-07-27 10:20:00",
//             isDeleted: false,
//           },
//         ],
//       },
//       {
//         parent: {
//           inquiryId: 1,
//           contents: "안녕하세요?",
//           writerId: 2,
//           writer: "삼성가고싶당",
//           createdAt: "2022-07-27 09:00:00",
//           isDeleted: false,
//         },
//         children: [
//           {
//             inquiryId: 2,
//             contents: "안녕하세요",
//             writerId: 1,
//             writer: "삼성바라기",
//             createdAt: "2022-07-27 09:10:00",
//             isDeleted: false,
//           },
//         ],
//       },
//     ],
//   };
