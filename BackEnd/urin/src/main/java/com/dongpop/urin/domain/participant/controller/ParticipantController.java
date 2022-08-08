package com.dongpop.urin.domain.participant.controller;

import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.participant.dto.response.ParticipantIdDto;
import com.dongpop.urin.domain.participant.dto.response.ParticipantJoinDto;
import com.dongpop.urin.domain.participant.service.ParticipantService;
import com.dongpop.urin.oauth.model.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class ParticipantController {

    private static final String ROOTURI = "/api/v1/studies/";

    private final ParticipantService participantService;

    @PostMapping("/{studyId}/participants")
    public ResponseEntity<ParticipantJoinDto> joinStudy(@PathVariable int studyId,
                                                        @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        ParticipantJoinDto participantJoinDto = participantService.joinStudy(member, studyId);
        URI location = URI.create(ROOTURI + participantJoinDto.getParticipantId());

        return ResponseEntity.created(location)
                .body(participantJoinDto);
    }

    @GetMapping("/{studyId}/participants/me")
    public ResponseEntity<ParticipantIdDto> getParticipantId(@PathVariable int studyId, @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();

        ParticipantIdDto participantIdDto = participantService.getParticipantId(studyId, member);
        return ResponseEntity.ok().body(participantIdDto);
    }

    @DeleteMapping("/{studyId}/participants/{participantId}")
    public ResponseEntity<Void> removeStudyMember(@PathVariable int studyId, @PathVariable int participantId,
                                                  @AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        Member member = memberPrincipal.getMember();
        participantService.removeStudyMember(member, studyId, participantId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
