import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DetailHeader from "../../components/DetailHeader";
import DetailTabs from "../../components/DetailTabs";
import { getStudy } from "../../store/studySlice";
import { getMemberId } from "../../store/memberSlice";
import CheckValidation from "../../components/CheckValidation";

const StudyDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state) => state.member.id);
  // console.log("디테일 부르는중");
  const [isChanged, setIsChanged] = useState(false);
  const { studyId } = useParams();

  const study = useSelector((state) => state.study);
  const currentMemberId = useSelector((state) => state.member.id);
  useEffect(() => {
    dispatch(getStudy({ studyId, navigate }));
    dispatch(getMemberId());
  }, [isChanged]);

  const { participants } = study;

  const checkParticipants = participants.map(
    (participant) => participant.memberId === currentMemberId
  );
  const isParticipant = checkParticipants.includes(true);

  const checkLeader = participants.map(
    (participant) =>
      participant.memberId === currentMemberId && participant.isLeader
  );
  const isLeader = checkLeader.includes(true);
  return (
    <div className="main-page">
      <CheckValidation />
      <DetailHeader
        study={study}
        isLeader={isLeader}
        isParticipant={isParticipant}
        currentMemberId={currentMemberId}
        setIsChanged={setIsChanged}
      />
      <DetailTabs
        study={study}
        isLeader={isLeader}
        isParticipant={isParticipant}
        setIsChanged={setIsChanged}
      />
    </div>
  );
};

export default StudyDetail;
