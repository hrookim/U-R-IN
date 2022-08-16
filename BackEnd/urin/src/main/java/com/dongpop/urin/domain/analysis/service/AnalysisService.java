package com.dongpop.urin.domain.analysis.service;

import com.dongpop.urin.domain.analysis.dto.request.*;
import com.dongpop.urin.domain.analysis.entity.AnalysisData;
import com.dongpop.urin.domain.analysis.entity.Emotion;
import com.dongpop.urin.domain.analysis.entity.EmotionType;
import com.dongpop.urin.domain.analysis.entity.Posture;
import com.dongpop.urin.domain.analysis.repository.AnalysisRepository;
import com.dongpop.urin.domain.analysis.repository.EmotionRepository;
import com.dongpop.urin.domain.analysis.repository.PostureRepository;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meeting.repository.MeetingRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.DO_NOT_HAVE_AUTHORIZATION;
import static com.dongpop.urin.global.error.errorcode.MeetingErrorCode.MEETING_IS_NOT_EXIST;

@RequiredArgsConstructor
@Service
@Slf4j
public class AnalysisService {

    private final AnalysisRepository analysisRepository;
    private final EmotionRepository emotionRepository;
    private final PostureRepository postureRepository;
    private final MeetingRepository meetingRepository;

    private final double EMOTION_COUNT_CRITERIA = 0.4;

    @Transactional
    public void setAnalysisData(int meetingId, Member interviewee, AnalysisDataDto aiData) {
        Meeting meeting = getMeetingFromId(meetingId);

        checkMemberExistenceInStudy(meeting, interviewee);

        AnalysisData analysisData = analysisRepository.findByMeetingAndInterviewee(meeting, interviewee)
                        .orElseGet(() ->AnalysisData.builder()
                                .meeting(meeting)
                                .interviewee(interviewee)
                                .time(0).build()
                        );

        analysisData.sumTime(aiData.getPoseDataList().size());
        saveAnalysisData(analysisData, aiData);
    }

    @Transactional
    private void saveAnalysisData(AnalysisData analysisData, AnalysisDataDto aiData) {
        analysisRepository.save(analysisData);

        savePoseData(analysisData, countFromPoseData(aiData.getPoseDataList()));
        saveEmotionData(analysisData, countFromEmotionData(aiData.getFaceDataList()));
    }

    @Transactional
    private void savePoseData(AnalysisData analysisData, Map<String, Integer> poseMap) {
        for(String poseName : poseMap.keySet()) {
            Posture posture = postureRepository.findByAnalysisDataAndName(analysisData, poseName)
                    .orElseGet(() -> new Posture());

            posture.setAnalysisData(analysisData);
            posture.setPostureData(poseName, posture.getCount() + poseMap.get(poseName));
            postureRepository.save(posture);
        }
    }

    @Transactional
    private void saveEmotionData(AnalysisData analysisData, Map<EmotionType, Integer> emotionMap) {
        int realAnalyzedTime = emotionMap.values().stream().mapToInt(Integer::intValue).sum();

        for(EmotionType emotionType : emotionMap.keySet()) {
            Emotion emotion = emotionRepository.findByAnalysisDataAndType(analysisData, emotionType)
                    .orElseGet(() -> new Emotion());

            emotion.setAnalysisData(analysisData);
            emotion.setEmotionData(emotionType, emotion.getCount() + emotionMap.get(emotionType)
                    , emotion.getRealAnalyzedTime() + realAnalyzedTime);
            emotionRepository.save(emotion);
        }
    }

    private Map<String, Integer> countFromPoseData(List<PoseDataDto> postures) {
        Map<String, Integer> poseMap = initMap(PostureName.values());

        for (PoseDataDto posture : postures) {
            poseMap.computeIfPresent(posture.getClassName(), (k, v) -> ++v);
        }

        return poseMap;
    }

    @SneakyThrows(IllegalAccessException.class)
    private Map<EmotionType, Integer> countFromEmotionData(List<FaceDataDto> emotions) {
        Field[] emotionTypes = Arrays.stream(FaceDataDto.class.getDeclaredFields())
                .toArray(Field[]::new);

        Map<String, Integer> emotionMap = Stream.of(emotionTypes)
                .collect(Collectors.toMap(Field::getName, i -> 0));

        for (FaceDataDto emotion : emotions) {
            for (Field type : emotionTypes) {
                type.setAccessible(true);
                boolean isUnderCriteria = (type.getDouble(emotion) < EMOTION_COUNT_CRITERIA);

                log.info("{} : {}",type.getName(), String.valueOf(isUnderCriteria));

                emotionMap.computeIfPresent(type.getName(), (k, v) -> isUnderCriteria ? v : ++v);
            }
        }

        return Map.ofEntries(
                Map.entry(EmotionType.CONFIDENCE, emotionMap.get(EmotionName.HAPPY.name().toLowerCase())),
                Map.entry(EmotionType.CALM, emotionMap.get(EmotionName.NEUTRAL.name().toLowerCase())),
                Map.entry(EmotionType.NERVOUS,
                        emotionMap.get(EmotionName.SAD.name().toLowerCase())
                                + emotionMap.get(EmotionName.SURPRISED.name().toLowerCase())
                                + emotionMap.get(EmotionName.FEARFUL.name().toLowerCase()))
        );
    }

    private void checkMemberExistenceInStudy(Meeting meeting, Member interviewee) {
        if (!meeting.getStudy().isRegistedMember(interviewee))
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
    }

    private Map<String, Integer> initMap(Enum[] enums) {
        Map<String, Integer> map = new HashMap<>();
        for(Enum type : enums) {
            map.put(type.name(), 0);
        }
        return map;
    }

    private Meeting getMeetingFromId(int meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));

        return meeting;
    }

}
