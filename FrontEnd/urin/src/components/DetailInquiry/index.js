import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination } from "@mui/material";

import DetailInquiryInput from "../DetailInquiryInput";
import DetailInquiryListItem from "../DetailInquiryListItem";
import { getInquiry } from "../../store/inquirySlice";
import "../../assets/DesignSystem.css";
import "./index.css";

const DetailInquiry = ({ study, isLeader, isParticipant }) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const inquiry = useSelector((state) => state.inquiry);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getInquiry(studyId));
  }, [isCommentDeleted, isInputSubmitted]);

  return (
    <div>
      <p className="font-60 font-md">궁금한 점을 방장에게 질문해보세요!</p>
      <DetailInquiryInput
        studyId={studyId}
        setIsInputSubmitted={setIsInputSubmitted}
      />
      {inquiry.inquiryList.map((inquiryListItem) => (
        <DetailInquiryListItem
          key={inquiryListItem.parent.inquiryId}
          inquiryListItem={inquiryListItem}
          isLeader={isLeader}
          setIsCommentDeleted={setIsCommentDeleted}
          setIsInputSubmitted={setIsInputSubmitted}
        />
      ))}
      <Pagination count={inquiry.totalPages + 1} className="pagination" />
    </div>
  );
};

export default DetailInquiry;
