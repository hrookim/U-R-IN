package com.dongpop.urin.domain.feed.controller;

import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.dto.request.FeedModificationDataDto;
import com.dongpop.urin.domain.feed.dto.response.FeedListDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/studies")
public class FeedController {

    @GetMapping("/{studyId}/feeds")
    public ResponseEntity<FeedListDto> getStudyFeeds(Pageable pageable, @PathVariable int studyId) {
        ResponseEntity<FeedListDto> response = ResponseEntity
                .ok()
                .body(new FeedListDto());

        return response;
    }

    @PostMapping("/{studyId}/feeds")
    public ResponseEntity<?> writeFeed(@PathVariable int studyId, FeedDataDto feedDataDto) {

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> updateFeed(@PathVariable int studyId, @PathVariable int feedId, FeedDataDto feedDataDto) {
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/feeds/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable int studyId, @PathVariable int feedId) {
        return ResponseEntity.noContent().build();
    }
}
