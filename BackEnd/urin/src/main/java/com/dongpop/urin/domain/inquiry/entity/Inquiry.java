package com.dongpop.urin.domain.inquiry.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.member.entity.Member;
import com.dongpop.urin.domain.study.entity.Study;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "inquiries")
public class Inquiry extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Inquiry parent;

    @OneToMany(mappedBy = "parent")
    private List<Inquiry> children = new ArrayList<>();

    private String contents;
    private boolean isDeleted;

    @Builder
    public Inquiry(Member writer, Study study, String contents) {
        this.writer = writer;
        this.study = study;
        this.contents = contents;
    }

    public void addParentInquiry(Inquiry parent) {
        if (parent != null) {
            parent.getChildren().add(this);
        }
        this.parent = parent;
    }

    public void updateInquiryData(String contents) {
        this.contents = contents;
    }

    public void deleteInquiry() {
        this.isDeleted = true;
    }
}
