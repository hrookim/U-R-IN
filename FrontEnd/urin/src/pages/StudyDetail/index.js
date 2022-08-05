import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailHeader from "../../components/DetailHeader";
import DetailTabs from "../../components/DetailTabs";
import { getStudy } from "../../store/studySlice";

const StudyDetail = () => {
  const { studyId } = useParams();
  const dispatch = useDispatch();
  const study = useSelector((state) => state.study);
  useEffect(() => {
    dispatch(getStudy(studyId));
  }, []);
  return (
    <>
      <DetailHeader study={study} />
      <DetailTabs study={study} />
    </>
  );
};

export default StudyDetail;
