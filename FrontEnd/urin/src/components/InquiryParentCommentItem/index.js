import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button } from "@mui/material";
import { deleteInquiry, updateInquiry } from "../../store/inquirySlice";
import "./index.css";

const StyledXbutton = styled.span`
  color: red;
  cursor: pointer;
`;

const InquiryParentCommentItem = ({
  parentItem,
  isLeader,
  setIsCommentDeleted,
}) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const currentMemberId = useSelector((state) => state.member.id);
  const [form, setForm] = useState(parentItem.contents);
  const [isEditing, setIsEditing] = useState(false);

  const isAuthor = currentMemberId === parentItem.writerId;

  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onClickUpdate = () => {
    const { inquiryId } = parentItem;
    dispatch(updateInquiry({ studyId, inquiryId, form })).then(() => {
      setIsEditing(false);
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  const onClickDelete = () => {
    const { inquiryId } = parentItem;
    dispatch(deleteInquiry({ studyId, inquiryId })).then(() => {
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  return (
    <div>
      <div className="writer-info">
        <Avatar sx={{ width: "35px", height: "35px" }}>
          {parentItem.writer[0]}
        </Avatar>
        <span className="font-sm font-50">{parentItem.writer}</span>
      </div>
      <div className="comment-content">
        {!isEditing && (
          <div>
            <span className="font-sm font-30">{parentItem.contents}</span>
            {!parentItem.isDeleted && isAuthor && (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setIsEditing(true);
                }}
                sx={{ color: "#707070" }}
              >
                수정
              </Button>
            )}
            {!parentItem.isDeleted && (isLeader || isAuthor) && (
              <Button
                size="small"
                variant="text"
                onClick={onClickDelete}
                sx={{ color: "#ff1900" }}
              >
                삭제
              </Button>
            )}
          </div>
        )}
        {isEditing && (
          <div className="inquiry-parent">
            <input
              onChange={onChange}
              value={form}
              className="inquiry-parent-input"
            />
            <div className="inquiry-input-btn">
              <Button
                variant="outlined"
                onClick={onClickUpdate}
                sx={{
                  borderColor: "#0037FA",
                  color: "#0037FA",
                  marginRight: "5px",
                  "&:hover": { backgroundColor: "#0037FA", color: "white" },
                }}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(0,0,0,0.7)",
                  color: "rgba(0,0,0,0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.4)",
                    color: "white",
                    border: "none",
                  },
                }}
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryParentCommentItem;
