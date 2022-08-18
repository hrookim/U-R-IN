import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button } from "@mui/material";
import { deleteFeed, updateFeed } from "../../store/feedSlice";

const StyledXbutton = styled.span`
  color: red;
  cursor: pointer;
`;

const FeedChildCommentItem = ({
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
    const { feedId } = childListItem;
    dispatch(updateFeed({ studyId, feedId, form })).then(() => {
      setIsEditing(false);
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  const onClickDelete = () => {
    const { feedId } = childListItem;
    dispatch(deleteFeed({ studyId, feedId })).then(() => {
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
        <div className="inquiry-parent">
          <input
            onChange={onChange}
            value={form}
            className="inquiry-parent-input"
            style={{ marginLeft: "5%", width: "95%" }}
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
      <hr />
    </div>
  );
};

export default FeedChildCommentItem;
