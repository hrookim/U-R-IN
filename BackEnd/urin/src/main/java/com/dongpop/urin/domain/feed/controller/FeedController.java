package com.dongpop.urin.domain.feed.controller;

import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.dto.request.FeedModificationDataDto;
import com.dongpop.urin.domain.feed.dto.response.FeedListDto;
import com.dongpop.urin.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> writeFeed(@PathVariable int studyId, @RequestBody FeedDataDto feedDataDto) {
        int memberId = 1;
        feedService.writeFeed(memberId, studyId, feedDataDto);

        //TODO: Created로 변경
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> updateFeed(@PathVariable int studyId, @PathVariable int feedId, @RequestBody String contents) {
        int memberId = 1;
        feedService.updateFeed(memberId, studyId, feedId, contents);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable int studyId, @PathVariable int feedId) {
        int memberId = 1;
        feedService.deleteFeed(memberId, studyId, feedId);

        return ResponseEntity.noContent().build();
    }
}
