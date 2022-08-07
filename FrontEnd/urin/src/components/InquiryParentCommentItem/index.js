import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getMemberId } from "../../store/memberSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { deleteInquiry } from "../../store/inquirySlice";

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
  const currentMemberId = useSelector((state) => state.member.id);
  const { studyId } = useParams();

  const onClickDelete = () => {
    const { inquiryId } = parentItem;
    dispatch(deleteInquiry({ studyId, inquiryId })).then(() => {
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  return (
    <div>
      <Avatar>{parentItem.writer[0]}</Avatar>
      <p>{parentItem.writer}</p>
      <div>
        {parentItem.contents}
        {!parentItem.isDeleted &&
          (isLeader || currentMemberId === parentItem.writerId) && (
            <StyledXbutton onClick={onClickDelete}>
              <FontAwesomeIcon icon={faSquareXmark} />
            </StyledXbutton>
          )}
      </div>
    </div>
  );
};

export default InquiryParentCommentItem;
