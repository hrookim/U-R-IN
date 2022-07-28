package com.dongpop.urin.domain.questionAndAnswer.controller;

import com.dongpop.urin.domain.questionAndAnswer.dto.request.QuestionAndAnswerDataDto;
import com.dongpop.urin.domain.questionAndAnswer.dto.response.QuestionAndAnswerListDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/studies")
public class QuestionAndAnswerController {

    @GetMapping("/{studyId}/qna")
    public ResponseEntity<QuestionAndAnswerListDto> getStudyQNAs(Pageable pageable, @PathVariable int studyId) {
        ResponseEntity<QuestionAndAnswerListDto> response = ResponseEntity
                .ok()
                .body(new QuestionAndAnswerListDto());

        return response;
    }

    @PostMapping("/{studyId}/qna")
    public ResponseEntity<?> writeQNA(@PathVariable int studyId, QuestionAndAnswerDataDto qnaDataDto) {

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{studyId}/qna/{qnaId}")
    public ResponseEntity<?> updateQNA(@PathVariable int studyId, @PathVariable int qnaId, QuestionAndAnswerDataDto qnaDataDto) {
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{studyId}/qna/{qnaId}")
    public ResponseEntity<?> deleteQNA(@PathVariable int studyId, @PathVariable int qnaId) {
        return ResponseEntity.noContent().build();
    }
}
