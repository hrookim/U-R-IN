package com.dongpop.urin.domain.analysis.service;

import com.dongpop.urin.domain.analysis.dto.request.*;
import com.dongpop.urin.domain.analysis.entity.*;
import com.dongpop.urin.domain.analysis.repository.AnalysisRepository;
import com.dongpop.urin.domain.analysis.repository.EmotionRepository;
import com.dongpop.urin.domain.analysis.repository.PostureRepository;
import com.dongpop.urin.domain.meeting.entity.Meeting;
import com.dongpop.urin.domain.meeting.repository.MeetingRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.global.error.errorcode.CommonErrorCode;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.util.EnumUtils;

import javax.transaction.Transactional;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.*;
import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.DO_NOT_HAVE_AUTHORIZATION;
import static com.dongpop.urin.global.error.errorcode.MeetingErrorCode.MEETING_IS_NOT_EXIST;

@RequiredArgsConstructor
@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;
    private final EmotionRepository emotionRepository;
    private final PostureRepository postureRepository;
    private final MeetingRepository meetingRepository;
    private final MemberRepository memberRepository;

    private final Map<String, AnalysisCacheDto> passDataCache = new ConcurrentHashMap<>();

    private static final double EMOTION_COUNT_CRITERIA = 0.4;
    private static final double CONSTANT = 10000;

    @Transactional
    public void calculatePassData(int passMemberId) {
        Member passMember = memberRepository.findById(passMemberId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));
        List<AnalysisData> passAnalysisData = analysisRepository.findByInterviewee(passMember);

        for (AnalysisData data : passAnalysisData) {
            double divisor = data.getTime() / CONSTANT;

            data.getEmotionList().forEach((emotion -> {
                AnalysisCacheDto analysisCacheDto = passDataCache.get(emotion.getType().name());
                if (analysisCacheDto == null) {
                    analysisCacheDto = new AnalysisCacheDto();
                }

                analysisCacheDto.addValues(emotion.getCount() / CONSTANT, divisor);
                passDataCache.put(emotion.getType().name(), analysisCacheDto);
            }));

            data.getPostureList().forEach((posture -> {
                AnalysisCacheDto analysisCacheDto = passDataCache.get(posture.getType().name());
                if (analysisCacheDto == null) {
                    analysisCacheDto = new AnalysisCacheDto();
                }
                analysisCacheDto.addValues(posture.getCount() / CONSTANT, divisor);
                passDataCache.put(posture.getType().name(), analysisCacheDto);
            }));
        }

        passDataCache.forEach((k, v) -> {
            if (isEmotionType(k)) {
                v.calculatePercentageData();
            } else {
                v.calculatePerMinute();
            }
        });
    }

    private boolean isEmotionType(String typeName) {
        for (EmotionType type : EmotionType.values()) {
            if (type.name().equals(typeName)) {
                return true;
            }
        }
        return false;
    }

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

    private void saveAnalysisData(AnalysisData analysisData, AnalysisDataDto aiData) {
        analysisRepository.save(analysisData);

        savePoseData(analysisData, countFromPoseData(aiData.getPoseDataList()));
        saveEmotionData(analysisData, countFromEmotionData(aiData.getFaceDataList()), aiData.getFaceDataList().size());
    }

    private void savePoseData(AnalysisData analysisData, Map<PostureType, Integer> poseMap) {
        for(PostureType poseType : poseMap.keySet()) {
            Posture posture = postureRepository.findByAnalysisDataAndType(analysisData, poseType)
                    .orElseGet(() -> new Posture());

            posture.setAnalysisData(analysisData);
            posture.setPostureData(poseType, posture.getCount() + poseMap.get(poseType));
            postureRepository.save(posture);
        }
    }

    private void saveEmotionData(AnalysisData analysisData, Map<EmotionType, Integer> emotionMap, int realAnalyzedTime) {
        for(EmotionType emotionType : emotionMap.keySet()) {
            Emotion emotion = emotionRepository.findByAnalysisDataAndType(analysisData, emotionType)
                    .orElseGet(() -> new Emotion());

            emotion.setAnalysisData(analysisData);
            emotion.setEmotionData(emotionType, emotion.getCount() + emotionMap.get(emotionType)
                    , emotion.getRealAnalyzedTime() + realAnalyzedTime);
            emotionRepository.save(emotion);
        }
    }

    private Map<PostureType, Integer> countFromPoseData(List<PoseDataDto> postures) {
        Map<PostureType, Integer> poseMap = Stream.of(PostureType.values())
                .collect(Collectors.toMap(PostureType::getPostureType, i -> 0));

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

    private Meeting getMeetingFromId(int meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseThrow(() -> new CustomException(MEETING_IS_NOT_EXIST));
    }

}
