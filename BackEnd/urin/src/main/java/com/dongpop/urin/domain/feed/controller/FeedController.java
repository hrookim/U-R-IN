package com.dongpop.urin.domain.feed.controller;

import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.dto.request.FeedUpdateDto;
import com.dongpop.urin.domain.feed.dto.response.FeedListDto;
import com.dongpop.urin.domain.feed.service.FeedService;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/{studyId}/feeds")
    public ResponseEntity<FeedListDto> getStudyFeeds(@PathVariable int studyId, Pageable pageable) {
        return ResponseEntity.ok()
                .body(feedService.getStudyFeeds(studyId, pageable));
    }

    @PostMapping("/{studyId}/feeds")
    public ResponseEntity<?> writeFeed(@PathVariable int studyId,
                                       @Validated @RequestBody FeedDataDto feedDataDto,
                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        feedService.writeFeed(member, studyId, feedDataDto);

        //TODO: Created로 변경
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> updateFeed(@PathVariable int studyId, @PathVariable int feedId,
                                        @Validated @RequestBody FeedUpdateDto feedUpdateDto,
                                        @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        feedService.updateFeed(member, studyId, feedId, feedUpdateDto.getContents());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable int studyId, @PathVariable int feedId,
                                        @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        feedService.deleteFeed(member, studyId, feedId);

        return ResponseEntity.noContent().build();
    }
}
