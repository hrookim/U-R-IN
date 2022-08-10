import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button } from "@mui/material";
import { deleteInquiry, updateInquiry } from "../../store/inquirySlice";

const StyledXbutton = styled.span`
  color: red;
  cursor: pointer;
`;

const InquiryChildCommentItem = ({
  childListItem,
  isLeader,
  setIsCommentDeleted,
}) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const currentMemberId = useSelector((state) => state.member.id);
  const [form, setForm] = useState(childListItem.contents);
  const [isEditing, setIsEditing] = useState(false);

  const isAuthor = currentMemberId === childListItem.writerId;

  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onClickUpdate = () => {
    const { inquiryId } = childListItem;
    dispatch(updateInquiry({ studyId, inquiryId, form })).then(() => {
      setIsEditing(false);
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  const onClickDelete = () => {
    const { inquiryId } = childListItem;
    dispatch(deleteInquiry({ studyId, inquiryId })).then(() => {
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  return (
    <div>
      <div className="writer-info">
        <Avatar sx={{ width: "35px", height: "35px" }}>
          {childListItem.writer[0]}
        </Avatar>
        <span className="font-sm font-50">{childListItem.writer}</span>
      </div>
      <div className="comment-content">
        {!isEditing && (
          <div>
            <span className="font-sm font-30">{childListItem.contents}</span>

            {!childListItem.isDeleted && isAuthor && (
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
            {!childListItem.isDeleted && (isLeader || isAuthor) && (
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
      </div>
      {isEditing && (
        <div>
          <input type="text" onChange={onChange} value={form} />
          <button type="submit" onClick={onClickUpdate}>
            수정
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            취소
          </button>
        </div>
      )}
      <hr />
    </div>
  );
};

export default InquiryChildCommentItem;
