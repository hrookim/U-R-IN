import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getReport = createAsyncThunk(
  "GET_REPORT",
  async ({ meetingId, navigate }) => {
    try {
      console.log("리포트 생성 중");
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_BASW_URL}meeting/${meetingId}/analysis`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      navigate("/notfound");
      console.log(err);
      return isRejectedWithValue(err.response.data);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    aiData: {
      interviewee: {
        emotion: {
          confidence: 100,
          calm: 100,
          nervous: 0,
        },
        pose: [
          {
            name: "기준자세",
            count: 0,
          },
        ],
      },
      passUser: {
        emotion: {
          confidence: 100,
          calm: 100,
          nervous: 0,
        },
        pose: [
          {
            name: "기준자세0",
            count: 0,
          },
        ],
      },
    },
    feedback: {
      personality: [
        {
          questionContent: "인성면접",
          answerContentList: [
            {
              interviewer: "인성면접질문",
              content: "인성면접답변",
            },
          ],
        },
      ],
      tech: [
        {
          questionContent: "적성면접",
          answerContentList: [
            {
              interviewer: "적성면접질문",
              content: "적성면접답변",
            },
          ],
        },
      ],
    },
  },
  reducers: {},
  extraReducers: {
    [getReport.fulfilled]: (state, { payload }) => payload,
  },
});

export default reportSlice.reducer;
