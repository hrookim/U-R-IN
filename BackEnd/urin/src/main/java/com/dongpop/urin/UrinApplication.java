package com.dongpop.urin;

import com.dongpop.urin.domain.feed.dto.request.FeedDataDto;
import com.dongpop.urin.domain.feed.service.FeedService;
import com.dongpop.urin.domain.inquiry.service.InquiryService;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.member.repository.MemberRepository;
import com.dongpop.urin.domain.member.service.MemberService;
import com.dongpop.urin.domain.participant.repository.Participant;
import com.dongpop.urin.domain.participant.repository.ParticipantRepository;
import com.dongpop.urin.domain.study.dto.request.StudyDataDto;
import com.dongpop.urin.domain.study.repository.Study;
import com.dongpop.urin.domain.study.repository.StudyRepository;
import com.dongpop.urin.domain.study.service.StudyService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@EnableJpaAuditing
@SpringBootApplication
public class UrinApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrinApplication.class, args);
	}

	@Bean
	CommandLineRunner run(StudyService studyService,
						  MemberService memberService,
						  FeedService feedService,
						  InquiryService inquiryService) {
		return args -> {
			for (int i = 0; i < 100; i++) {
				Member curMember = Member.builder()
						.nickname("이름" + i)
						.password("pass" + i)
						.role("user")
						.build();
				memberService.signUp(curMember);
			}

			for (int i = 0; i < 100; i++) {
				StudyDataDto studyDataDto = new
						StudyDataDto("제목" + i, "공지" + i,
						LocalDate.parse("2022-12-31", DateTimeFormatter.ISO_DATE), 6);
				studyService.generateStudy(studyDataDto, i % 10 + 1);
			}

			for (int i = 11; i <= 100; i++) {
				studyService.joinStudy(i, i % 20 + 1);
			}

			for (int i = 1; i <= 100; i++) {
				int parent = 0;
				if (i > 10) {
					parent = i % 10;
				}
				feedService.writeFeed(i, i % 10 + 1, new FeedDataDto(parent, "댓글달기"+i));
			}
		};
	}
}
