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
      <Avatar>{childListItem.writer[0]}</Avatar>
      <p>{childListItem.writer}</p>
      {!isEditing && (
        <div>
          {childListItem.contents}
          {!childListItem.isDeleted && (isLeader || isAuthor) && (
            <StyledXbutton onClick={onClickDelete}>
              <FontAwesomeIcon icon={faSquareXmark} />
            </StyledXbutton>
          )}
          {!childListItem.isDeleted && isAuthor && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정
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
      <hr />
    </div>
  );
};

export default FeedChildCommentItem;
