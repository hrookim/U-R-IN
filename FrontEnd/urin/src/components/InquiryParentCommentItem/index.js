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

  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      onClickUpdate();
    }
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
            <div>
              <div>
                <input
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  value={form}
                  className="inquiry-parent-input"
                />
                {/* <Button
          onClick={onSubmit}
          sx={{
            backgroundColor: "#0037FA",
            height: "60px",
            marginLeft: "20px",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#0037FA" },
          }}
          variant="contained"
        >
          제출
        </Button> */}
              </div>
            </div>{" "}
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

export default InquiryParentCommentItem;
