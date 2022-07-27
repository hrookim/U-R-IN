package com.dongpop.urin.domain.feed.service;


import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.dto.response.FeedDetailDto;
import com.dongpop.urin.domain.feed.dto.response.FeedDto;
import com.dongpop.urin.domain.feed.dto.response.FeedListDto;
import com.dongpop.urin.domain.feed.repository.Feed;
import com.dongpop.urin.domain.feed.repository.FeedRepository;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FeedService {

    private static final String DELETE_MESSAGE = "삭제된 댓글입니다.";

    private final FeedRepository feedRepository;
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;

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
    public void writeFeed(int writerId, int studyId, FeedDataDto feedDataDto) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new NoSuchElementException("해당 스터디가 존재하지 않습니다."));
        Member writer = memberRepository.findById(writerId)
                .orElseThrow(() -> new NoSuchElementException("해당 회원이 존재하지 않습니다."));

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
    public void updateFeed( int memberId, int studyId, int feedId, String contents) {
        //회원 번호로 권한만 확인 후 바로 업데이트
        Feed feed = checkWriterAuthorizaion(memberId, feedId);
        feed.updateFeedData(contents);
    }

    @Transactional
    public void deleteFeed(int memberId, int studyId, int feedId) {
        Feed feed = checkWriterAuthorizaion(memberId, feedId);
        feed.deleteFeed();
    }
    private Feed checkWriterAuthorizaion(int memberId, int feedId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("해당 회원이 존재하지 않습니다."));
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new NoSuchElementException("해당 피드가 존재하지 않습니다."));
        if (member.getId() != feed.getWriter().getId()) {
            //TODO: 401에러 던지기
            throw new RuntimeException("권한이 없습니다.");
        }
        return feed;
    }
}
