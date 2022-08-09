package com.dongpop.urin.domain.participant.service;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.dto.response.ParticipantIdDto;
import com.dongpop.urin.domain.participant.dto.response.ParticipantJoinDto;
import com.dongpop.urin.domain.participant.entity.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.domain.study.entity.StudyStatus;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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

        if (study.getParticipants().size() >= study.getMemberCapacity()) {
            throw new CustomException(STUDY_IS_FULL);
        }
        checkAlreadyRegistered(member, study);
        checkStudyStatus(study);

        Integer participantId = participantRepository.save(Participant.builder()
                .study(study)
                .member(member)
                .isLeader(false)
                .build()).getId();
        return new ParticipantJoinDto(studyId, participantId);
    }

    @Transactional
    public ParticipantIdDto getParticipantId(int studyId, Member member) {
        Study study = getStudy(studyId);

        List<Participant> participants = study.getParticipants();
        for (Participant participant : participants) {
            if (member.getId() == participant.getMember().getId()) {
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
        study.getParticipants().forEach((participant) -> {
            if (participant.getMember().getId() == member.getId()) {
                throw new CustomException(ALREADY_REGISTERED_MEMBER);
            }
        });
    }

    private void checkStudyStatus(Study study) {
        if (study.getParticipants().size() + 1 == study.getMemberCapacity()) {
            study.updateStatus(StudyStatus.COMPLETED);
        }
    }

    private void deleteStudyParticipant(Study study, Participant deleteParticipant) {
        participantRepository.delete(deleteParticipant);
        if (study.getStatus().equals(StudyStatus.COMPLETED))
            study.updateStatus(StudyStatus.RECRUITING);
    }

    private boolean isPossible(Participant deleteParticipant, Member member, Study study) {
        if (deleteParticipant.isLeader()) {
            throw new CustomException(CAN_NOT_DELETE_LEADER_PARTICIPANT);
        }
        if (deleteParticipant.getStudy().getId() != study.getId()) {
            throw new CustomException(PARTICIPANT_DOES_NOT_BELONG_STUDY);
        }

        Participant leadersParticipant = participantRepository.findLeader(study.getId())
                .orElseThrow(() -> new CustomException(FAIL_TO_FIND_LEADER));
        int studyLeaderId = leadersParticipant.getMember().getId();

        if (member.getId() != deleteParticipant.getMember().getId()
                && member.getId() != studyLeaderId) {
            throw new CustomException(POSSIBLE_ONLY_LEADER);
        }
        return true;
    }
}
