import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getInquiry = createAsyncThunk("GET_INQUIRY", async (studyId) => {
  console.log("===axios INQUIERY 불러오기===");
  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
});

// 인콰이어리 생성하기 FIXME: 생성 후 새로 store에 추가를 해야함, 댓글형성도 같이 이뤄짐
export const createInquiry = createAsyncThunk(
  "CREATE_INQUIRY",
  async ({ studyId, form, parentId }) => {
    try {
      console.log("===axios INQUIERY 생성===", parentId);
      if (parentId) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry`,
          { parent: parentId, contents: form }, // FIXME: API 수정 후 입력필요
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        getInquiry(studyId);
        return response.data;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_BASE_URL}studies/${studyId}/inquiry`,
        { parent: 0, contents: form }, // FIXME: API 수정 후 입력필요
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

// 인콰이어리 수정하기 FIXME: feedId를 잡아야 한다!
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

// 인콰이어리 삭제하기 FIXME:
export const deleteInquiry = createAsyncThunk(
  "DELETE_INQUIRY",
  async ({ studyId, inquiryId }) => {
    console.log("===axios INQUIERY 삭제===");
    try {
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
