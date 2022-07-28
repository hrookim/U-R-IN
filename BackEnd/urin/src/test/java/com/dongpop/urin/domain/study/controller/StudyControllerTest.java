package com.dongpop.urin.domain.study.controller;

import com.dongpop.urin.domain.study.dto.response.StudyListDto;
import com.dongpop.urin.domain.study.dto.response.StudySummaryDto;
import com.dongpop.urin.domain.study.service.StudyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * 스터디 요약 리스트(페이징, 검색)
 * 스터디 상세 페이지
 * 스터디 생성
 * 스터디 정보 수정
 * 스터디 가입
 * 스터디 참가자 삭제
 * 스터디 상태 변경
 */

@ExtendWith(SpringExtension.class)
@WebMvcTest(StudyController.class)
class StudyControllerTest {
    static final String ROOT = "/api/v1/studies";

    @Autowired
    MockMvc mvc;
    @MockBean
    StudyService studyService;

//    @BeforeEach
//    public void setUp() {
//        mvc =
//                MockMvcBuilders.standaloneSetup(new StudyController(studyService))
//                        .addFilters(new CharacterEncodingFilter("UTF-8", true)) // utf-8 필터 추가
//                        .build();
//    }

//    @Test
//    void 스터디_리스트_api() throws Exception {
//        List<StudySummaryDto> studyList = new ArrayList<>();
//        for (int i = 1; i <= 10; i++) {
//            studyList.add(StudySummaryDto.builder()
//                    .id(i)
//                    .title("제목" + i)
//                    .memberCapacity(6)
//                    .currentMember(2).build());
//        }
//        given(studyService.getStudyList(any(), any())).willReturn(new StudyListDto(10, studyList));
//
//        mvc.perform(get(ROOT))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.studyList[0].title", is()))
//
//    }

}