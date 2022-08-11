package com.dongpop.urin.domain.studyhashtag.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.hashtag.entity.Hashtag;
import com.dongpop.urin.domain.study.entity.Study;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "study_hashtag")
public class StudyHashtag extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;
}
