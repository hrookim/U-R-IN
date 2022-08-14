/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Radio, Button } from "@mui/material";
import { getFeedback, updateFeedback } from "./feedbackAxios";
import "./index.css";

const Feedback = ({
  meetingId,
  intervieweeId,
  intervieweeNickname,
  localUser,
  feedbackDisplay,
}) => {
  const [type, setType] = useState("PERSONALITY");
  const [newQuestion, setNewQuestion] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedbackChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...feedbackList];
    list[index][name] = value;
    setFeedbackList(list);
    console.log(feedbackList);
  };

  // TODO: 질문삭제 버튼
  // const handleFeedbackRemove = (index) => {
  //   const list = [...feedbackList];
  //   list.splice(index, 1);
  //   setFeedbackList(list);
  // };

  const handleFeedbackAdd = () => {
    setFeedbackList([...feedbackList, { question: newQuestion, answer: "" }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = {
      type,
      feedbackList,
    };
    console.log(form);
    updateFeedback({ meetingId, intervieweeId, form });
  };

  const onChangePersonality = () => {
    getFeedback({ meetingId, intervieweeId }).then((res) => {
      const { personalityList } = res;
      if (personalityList.length >= 1) {
        setFeedbackList(personalityList);
      } else {
        setFeedbackList([
          { question: "지원자의 면접태도는 어떠한가요?", answer: "" },
          { question: "지원자의 전달력은 어떠한가요?", answer: "" },
          { question: "기타", answer: "" },
        ]);
      }
    });
  };

  const onChangeTech = () => {
    getFeedback({ meetingId, intervieweeId }).then((res) => {
      const { techList } = res;
      if (techList.length >= 1) {
        setFeedbackList(techList);
      } else {
        setFeedbackList([
          { question: "지원자는 이 직무에 적합해 보이나요?", answer: "" },
          { question: "지원자의 기술에 대한 이해도는 어떠한가요?", answer: "" },
          { question: "기타", answer: "" },
        ]);
      }
    });
  };

  const styleFeedback = { display: feedbackDisplay };

  useEffect(() => {
    // getFeedback({ meetingId, intervieweeId }).then((res) => {
    //   const { personalityList } = res;
    //   if (personalityList.length >= 1) {
    //     setFeedbackList(personalityList);
    //   } else {
    //     setFeedbackList([
    //       { question: "지원자의 면접태도는 어떠한가요?", answer: "" },
    //       { question: "지원자의 전달력은 어떠한가요?", answer: "" },
    //       { question: "기타", answer: "" },
    //     ]);
    //   }
    // });
  }, []);

  return (
    <div style={styleFeedback} className="fb-container">
      <div className="font-md font-60">
        {intervieweeNickname}님을 위한 피드백
      </div>
      <form onSubmit={onSubmit}>
        {/* 타입 선택 */}
        <div className="font-sm font-50">면접 종류</div>
        <div className="fb-radio-box">
          <div className="font-xs font-40 fb-radio">
            <label htmlFor="type-p">인성면접</label>
            <Radio
              checked={type === "PERSONALITY"}
              id="type-p"
              size="small"
              color="default"
              type="radio"
              name="type"
              value="PERSONALITY"
              onChange={() => {
                setType("PERSONALITY");
                onChangePersonality();
              }}
              required
            />
          </div>
          <div className="font-xs font-40 fb-radio">
            <label htmlFor="type-t">직무면접</label>
            <Radio
              checked={type === "TECH"}
              id="type-t"
              size="small"
              color="default"
              type="radio"
              name="type"
              value="TECH"
              onChange={() => {
                setType("TECH");
                onChangeTech();
              }}
              required
            />
          </div>
        </div>
        <div>
          {/* 작성된 질문 */}
          {feedbackList &&
            feedbackList.map((singleFeedback, index) => (
              <div key={index} className="font-xs font-40">
                {singleFeedback.question && (
                  <div className="fb-q-item">
                    <div>
                      {index + 1}. {singleFeedback.question}
                      {/* {feedbackList.length >= 1 && (
                          <button
                            className="delete-button"
                            type="button"
                            onClick={() => handleFeedbackRemove(index)}
                          >
                            <span>-</span>
                          </button> // TODO: 삭제 버튼
                        )} */}
                    </div>
                    {/* <label htmlFor="qna">평가란</label> */}
                    <input
                      value={singleFeedback.answer}
                      id="qna"
                      type="text"
                      name="answer"
                      onChange={(e) => handleFeedbackChange(e, index)}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        {/* <div className="font-40 font-sm">
            <button className="add-button font-40 font-xs">+ 항목추가</button>
            <div>
              <input
                name="question"
                type="text"
                id="add-question"
                value={newQuestion}
                onChange={(e) => {
                  setNewQuestion(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  handleFeedbackAdd();
                  setNewQuestion("");
                }}
              >
                <span>질문 추가</span>
              </button>
            </div>
          </div> */}
        {/* 저장 버튼 */}
        <button type="submit" className="save-button font-sm font-40">
          저장
        </button>
      </form>
    </div>
  );
};

export default Feedback;
