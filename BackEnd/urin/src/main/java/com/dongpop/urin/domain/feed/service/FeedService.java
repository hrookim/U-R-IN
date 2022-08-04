package com.dongpop.urin.domain.feed.service;


import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.dto.response.FeedDetailDto;
import com.dongpop.urin.domain.feed.dto.response.FeedDto;
import com.dongpop.urin.domain.feed.dto.response.FeedListDto;
import com.dongpop.urin.domain.feed.repository.Feed;
import com.dongpop.urin.domain.feed.repository.FeedRepository;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.study.repository.Study;
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
import static com.dongpop.urin.global.error.errorcode.StudyErrorCode.STUDY_DOES_NOT_EXIST;

@RequiredArgsConstructor
@Service
public class FeedService {

    private static final String DELETE_MESSAGE = "삭제된 댓글입니다.";

    private final FeedRepository feedRepository;
    private final StudyRepository studyRepository;

    @Transactional
    public FeedListDto getStudyFeeds(int studyId, Pageable pageable) {
        Page<Feed> feedPage = feedRepository.findAllByStudyIdAndParentIsNull(studyId, pageable);

        int totalPages = feedPage.getTotalPages();
        List<FeedDto> feedList = new ArrayList<>();

        feedPage.toList().forEach(f -> {
            FeedDetailDto parent = FeedDetailDto.builder()
                    .feedId(f.getId())
                    .contents(f.isDeleted() ? DELETE_MESSAGE : f.getContents())
                    .writerId(f.getWriter().getId()) //TODO: 삭제된 댓글도 사용자 아이디는 보여주는지 다시 확인
                    .writer(f.getWriter().getNickname())
                    //TODO: 문자열 변환 TEST
                    .createdAt(f.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                    .isDeleted(f.isDeleted()).build();

            List<FeedDetailDto> children = f.getChildren().stream()
                    .map(c ->
                        FeedDetailDto.builder()
                                .feedId(c.getId())
                                .contents(c.isDeleted() ? DELETE_MESSAGE : c.getContents())
                                .writerId(c.getWriter().getId())
                                .writer(c.getWriter().getNickname())
                                .createdAt(c.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                                .isDeleted(c.isDeleted()).build()
                    ).collect(Collectors.toList());

            feedList.add(new FeedDto(parent, children));
        });

        return new FeedListDto(totalPages, feedList);
    }

    @Transactional
    public void writeFeed(Member writer, int studyId, FeedDataDto feedDataDto) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));
        Feed newFeed = Feed.builder()
                .contents(feedDataDto.getContents())
                .writer(writer)
                .study(study).build();

        Feed parent = feedRepository.findById(feedDataDto.getParent())
                .orElseGet(() -> null);
        newFeed.addParentFeed(parent);

        feedRepository.save(newFeed);
    }

    @Transactional
    public void updateFeed(Member member, int studyId, int feedId, String contents) {
        Feed feed = checkWriterAuthorizaion(member, feedId);
        feed.updateFeedData(contents);
    }

    @Transactional
    public void deleteFeed(Member member, int studyId, int feedId) {
        Feed feed = checkWriterAuthorizaion(member, studyId, feedId);
        feed.deleteFeed();
    }
    private Feed checkWriterAuthorizaion(Member member, int feedId) {
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));

        if (member.getId() != feed.getWriter().getId()) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        return feed;
    }

    private Feed checkWriterAuthorizaion(Member member, int studyId, int feedId) {
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new CustomException(NO_SUCH_ELEMENTS));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(STUDY_DOES_NOT_EXIST));

        if (!(member.getId() == feed.getWriter().getId() || member.getId() == study.getStudyLeader().getId())) {
            throw new CustomException(DO_NOT_HAVE_AUTHORIZATION);
        }
        return feed;
    }
}
