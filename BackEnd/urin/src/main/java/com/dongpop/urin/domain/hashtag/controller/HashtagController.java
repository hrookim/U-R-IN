package com.dongpop.urin.domain.hashtag.controller;

import com.dongpop.urin.domain.hashtag.dto.HashtagDataDto;
import com.dongpop.urin.domain.hashtag.dto.HashtagResponseDto;
import com.dongpop.urin.domain.hashtag.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class HashtagController {
    private final HashtagRepository hashtagRepository;

    @GetMapping("/hashtags")
    public ResponseEntity<HashtagResponseDto> getHashtags() {
        List<HashtagDataDto> hashtags = hashtagRepository.findAll().stream()
                .map(hashtag -> new HashtagDataDto(hashtag.getCode(), hashtag.getName()))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(new HashtagResponseDto(hashtags));
    }
}
