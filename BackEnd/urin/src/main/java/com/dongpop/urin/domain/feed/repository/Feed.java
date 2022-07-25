package com.dongpop.urin.domain.feed.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import com.dongpop.urin.domain.member.repository.Member;
import com.dongpop.urin.domain.study.repository.Study;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "feeds")
public class Feed extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Feed parent;

    @OneToMany(mappedBy = "parent")
    private List<Feed> child = new ArrayList<>();

    private String contents;
    private boolean isDeleted;

    public void addChildFeed(Feed child) {
        this.child.add(child);
        child.setParent(this);
    }
}
