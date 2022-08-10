package com.dongpop.urin.domain.participant.service;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.dto.response.ParticipantIdDto;
import com.dongpop.urin.domain.participant.dto.response.ParticipantJoinDto;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.dongpop.urin.domain.study.entity.StudyStatus.*;
import static com.dongpop.urin.global.error.errorcode.ParticipantErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public ParticipantJoinDto joinStudy(Member member, int studyId) {
        Study study = getStudy(studyId);

        if (study.getCurrentParticipantCount() >= study.getMemberCapacity()) {
            throw new CustomException(STUDY_IS_FULL);
        }
        checkAlreadyRegistered(member, study);
        checkStudyStatus(study);

        Participant joinParticipant = participantRepository.findByMemberAndStudy(member, study)
                .orElseGet(() -> Participant.makeParticipant(member, study, false));

        joinParticipant.joinStudy();
        Integer participantId = participantRepository.save(joinParticipant).getId();
        return new ParticipantJoinDto(studyId, participantId);
    }

    @Transactional
    public ParticipantIdDto getParticipantId(int studyId, Member member) {
        Study study = getStudy(studyId);

        List<Participant> participants = study.getParticipants();
        for (Participant participant : participants) {
            if (isRegisted(participant, member)) {
                return new ParticipantIdDto(participant.getId());
            }
        }
        throw new CustomException(PARTICIPANT_IS_NOT_EXIST);
    }

    @Transactional
    public void removeStudyMember(Member member, int studyId, int participantsId) {
        Study study = getStudy(studyId);
        Participant deleteParticipant = participantRepository.findById(participantsId)
                .orElseThrow(() -> new CustomException(PARTICIPANT_IS_NOT_EXIST));

        if (isPossible(deleteParticipant, member, study)) {
            deleteStudyParticipant(study, deleteParticipant);
        }
    }

    private Study getStudy(int studyId) {
        return studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
    }

    private void checkAlreadyRegistered(Member member, Study study) {
        for (Participant participant : study.getParticipants()) {
            if (isRegisted(participant, member)) {
                throw new CustomException(ALREADY_REGISTERED_MEMBER);
            }
        }
    }

    private boolean isRegisted(Participant participant, Member member) {
        return !participant.getWithdrawal() && participant.getMember().getId() == member.getId();
    }

    private void checkStudyStatus(Study study) {
        if (study.getCurrentParticipantCount() + 1 == study.getMemberCapacity()) {
            study.updateStatus(COMPLETED);
        }
    }

    private void deleteStudyParticipant(Study study, Participant deleteParticipant) {
        deleteParticipant.withdrawStudy();
        if (study.getStatus().equals(COMPLETED))
            study.updateStatus(RECRUITING);
    }

    private boolean isPossible(Participant deleteParticipant, Member member, Study study) {
        if (deleteParticipant.isLeader()) {
            throw new CustomException(CAN_NOT_DELETE_LEADER_PARTICIPANT);
        }
        if (deleteParticipant.getStudy().getId() != study.getId()) {
            throw new CustomException(PARTICIPANT_DOES_NOT_BELONG_STUDY);
        }
        if (deleteParticipant.getWithdrawal()) {
            throw new CustomException(ALREADY_WITHDRAW_PARTICIPANT);
        }

        int studyLeaderId = study.getStudyLeader().getId();
        if (member.getId() != deleteParticipant.getMember().getId() && member.getId() != studyLeaderId) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        return true;
    }
}
