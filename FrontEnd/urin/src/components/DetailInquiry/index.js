import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination } from "@mui/material";

import DetailInquiryInput from "../DetailInquiryInput";
import DetailInquiryListItem from "../DetailInquiryListItem";
import { getInquiry } from "../../store/inquirySlice";

const DetailInquiry = () => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const inquiry = useSelector((state) => state.inquiry);
  console.log(inquiry);
  // useEffect(() => {
  //   dispatch(getInquiry(studyId));
  // }, []);

  return (
    <div>
      <p>궁금한 점을 방장에게 질문해보세요!</p>
      <DetailInquiryInput />
      {inquiry.inquiryList.map((inquiryListItem) => (
        <DetailInquiryListItem
          key={inquiryListItem.parent.inquiryId}
          inquiryListItem={inquiryListItem}
        />
      ))}
      <Pagination count={inquiry.totalPages + 1} />
    </div>
  );
};

export default DetailInquiry;
