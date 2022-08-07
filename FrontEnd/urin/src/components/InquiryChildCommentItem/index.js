import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getMemberId } from "../../store/memberSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { getInquiry, deleteInquiry } from "../../store/inquirySlice";

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
  const currentMemberId = useSelector((state) => state.member.id);
  const { studyId } = useParams();

  const onClickDelete = () => {
    const { inquiryId } = childListItem;
    dispatch(deleteInquiry({ studyId, inquiryId })).then(() => {
      setIsCommentDeleted(true);
      setInterval(() => setIsCommentDeleted(false), 100);
    });
  };

  return (
    <div>
      <Avatar>{childListItem.writer[0]}</Avatar>
      <p>{childListItem.writer}</p>
      <p>
        {childListItem.contents}
        {/* 로그인한 사용자와 작성자가 일치하면 삭제버튼 보이는 로직 추가 */}
        {isLeader ||
          (currentMemberId == childListItem.writerId && (
            <StyledXbutton onClick={onClickDelete}>
              <FontAwesomeIcon icon={faSquareXmark} />
            </StyledXbutton>
          ))}
      </p>
      <hr />
    </div>
  );
};

export default InquiryChildCommentItem;
