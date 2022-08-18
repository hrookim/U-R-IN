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
  isInterviewing,
}) => {
  const [type, setType] = useState("PERSONALITY");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedbackChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...feedbackList];
    list[index][name] = value;
    setFeedbackList(list);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = {
      type,
      feedbackList,
    };
    updateFeedback({ meetingId, intervieweeId, form }).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    });
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
    if (!!intervieweeId) {
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
    } else {
      setFeedbackList([
        { question: "지원자의 면접태도는 어떠한가요?", answer: "" },
        { question: "지원자의 전달력은 어떠한가요?", answer: "" },
        { question: "기타", answer: "" },
      ]);
    }
  }, [intervieweeId]);

  return (
    <div style={styleFeedback} className="fb-container">
      <div className="font-md font-70">
        {intervieweeNickname}님을 위한 피드백
      </div>
      <form onSubmit={onSubmit}>
        {/* 타입 선택 */}
        <p className="font-sm font-50 fb-radio-p">면접 종류</p>

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
                    <span className="font-xs">
                      {index + 1}. {singleFeedback.question}
                    </span>
                    <textarea
                      value={singleFeedback.answer}
                      id="qna"
                      rows="2"
                      cols="30"
                      name="answer"
                      onChange={(e) => handleFeedbackChange(e, index)}
                      required
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* 저장 버튼 */}
        <div className="save-box">
          {!isLoading ? (
            <button type="submit" className="save-button font-sm font-40">
              저장
            </button>
          ) : (
            <div className="save-loading-box">
              <button className="save-loading"></button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Feedback;
