package com.dongpop.urin.domain.inquiry.service;


import com.dongpop.urin.domain.inquiry.dto.request.InquiryDataDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryDetailDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryDto;
import com.dongpop.urin.domain.inquiry.dto.response.InquiryListDto;
import com.dongpop.urin.domain.inquiry.entity.Inquiry;
import com.dongpop.urin.domain.inquiry.repository.InquiryRepository;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.DO_NOT_HAVE_AUTHORIZATION;
import static com.dongpop.urin.global.error.errorcode.CommonErrorCode.NO_SUCH_ELEMENTS;
import static com.dongpop.urin.global.error.errorcode.InquiryErrorCode.DIFFRENT_STUDY;
import static com.dongpop.urin.global.error.errorcode.InquiryErrorCode.PARENT_INQUIRY_IS_NOT_EXIST;
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.STUDY_DOES_NOT_EXIST;

@RequiredArgsConstructor
@Service
public class InquiryService {

    private static final String DELETE_MESSAGE = "삭제된 댓글입니다.";

    private final InquiryRepository inquiryRepository;
    private final StudyRepository studyRepository;

    @Transactional
    public InquiryListDto getStudyInquiries(int studyId, Pageable pageable) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        Page<Inquiry> inquiryPage = inquiryRepository.findAllByStudyAndParentIsNull(study, pageable);

        int totalPages = inquiryPage.getTotalPages();
        List<InquiryDto> inquiryList = new ArrayList<>();

        inquiryPage.toList().forEach(i -> {
            InquiryDetailDto parent = InquiryDetailDto.builder()
                    .inquiryId(i.getId())
                    .contents(i.isDeleted() ? DELETE_MESSAGE : i.getContents())
                    .writerId(i.getWriter().getId())
                    .writer(i.getWriter().getNickname())
                    .createdAt(i.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .isDeleted(i.isDeleted()).build();

            List<InquiryDetailDto> children = i.getChildren().stream()
                    .map(c ->
                            InquiryDetailDto.builder()
                                    .inquiryId(c.getId())
                                    .contents(c.isDeleted() ? DELETE_MESSAGE : c.getContents())
                                    .writerId(c.getWriter().getId())
                                    .writer(c.getWriter().getNickname())
                                    .createdAt(c.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                                    .isDeleted(c.isDeleted()).build()
                    ).collect(Collectors.toList());

            inquiryList.add(new InquiryDto(parent, children));
        });

        return new InquiryListDto(totalPages, inquiryList);
    }

    @Transactional
    public void writeInquiry(Member writer, int studyId, InquiryDataDto inquiryDataDto) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        Inquiry newInquiry = Inquiry.builder()
                .contents(inquiryDataDto.getContents())
                .writer(writer)
                .study(study).build();

        if (inquiryDataDto.getParent() != 0) {
            Inquiry parent = inquiryRepository.findById(inquiryDataDto.getParent())
                    .orElseThrow(() -> new CustomException(PARENT_INQUIRY_IS_NOT_EXIST));
            if (parent.getStudy().getId() != study.getId()) {
                throw new CustomException(DIFFRENT_STUDY);
            }
            newInquiry.addParentInquiry(parent);
        }
        inquiryRepository.save(newInquiry);
    }

    @Transactional
    public void updateFeed(Member member, int studyId, int inquiryId, String contents) {
        Inquiry inquiry = checkUpdateAuthorizaion(member, studyId, inquiryId);
        inquiry.updateInquiryData(contents);
    }

    @Transactional
    public void deleteInquiry(Member member, int studyId, int inquiryId) {
        Inquiry inquiry = checkDeleteAuthorizaion(member, studyId, inquiryId);
        inquiry.deleteInquiry();
    }
    private Inquiry checkUpdateAuthorizaion(Member member, int studyId, int inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        if (inquiry.getStudy().getId() != study.getId()) {
            throw new CustomException(DIFFRENT_STUDY);
        }

        if (member.getId() != inquiry.getWriter().getId()) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        return inquiry;
    }

    private Inquiry checkDeleteAuthorizaion(Member member, int studyId, int inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        if (inquiry.getStudy().getId() != studyId) {
            throw new CustomException(DIFFRENT_STUDY);
        }

        if (!(member.getId() == inquiry.getWriter().getId() || member.getId() == study.getStudyLeader().getId())) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        return inquiry;
    }
}
