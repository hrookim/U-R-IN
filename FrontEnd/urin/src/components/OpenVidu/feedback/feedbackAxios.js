import axios from "axios";

const getFeedback = async ({ meetingId, intervieweeId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_BASE_URL}meeting/${meetingId}/feedback/${intervieweeId}`,
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
    return null;
  }
};

const updateFeedback = async ({ meetingId, intervieweeId, form }) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACK_BASE_URL}meeting/${meetingId}/feedback/${intervieweeId}`,
      form,
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
    return null;
  }
};

export { getFeedback, updateFeedback };
