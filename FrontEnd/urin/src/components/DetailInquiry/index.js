import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination, Stack } from "@mui/material";

import DetailInquiryInput from "../DetailInquiryInput";
import DetailInquiryListItem from "../DetailInquiryListItem";
import { getInquiry } from "../../store/inquirySlice";
import "../../assets/DesignSystem.css";
import "./index.css";

const DetailInquiry = ({ study, isLeader, isParticipant }) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();

  const [page, setPage] = useState(1);

  const inquiry = useSelector((state) => state.inquiry);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);

  const pageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getInquiry([studyId, page - 1]));
  }, [isCommentDeleted, isInputSubmitted, page]);

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

      <Stack spacing={2}>
        <Pagination
          count={inquiry.totalPages}
          page={page}
          onChange={pageChange}
          className="pagination"
        />
      </Stack>
    </div>
  );
};

export default DetailInquiry;
