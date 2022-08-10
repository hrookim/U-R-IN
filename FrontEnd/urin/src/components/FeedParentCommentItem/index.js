import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Avatar, Button } from "@mui/material";
import { deleteFeed, updateFeed } from "../../store/feedSlice";
import "../../assets/DesignSystem.css";
import "./index.css";

const StyledXbutton = styled.span`
  color: red;
  cursor: pointer;
`;

const FeedParentCommentItem = ({
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
    const { feedId } = parentItem;
    dispatch(updateFeed({ studyId, feedId, form })).then(() => {
      setIsEditing(false);
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  const onClickDelete = () => {
    const { feedId } = parentItem;
    dispatch(deleteFeed({ studyId, feedId })).then(() => {
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
      </div>
    </div>
  );
};

export default FeedParentCommentItem;
