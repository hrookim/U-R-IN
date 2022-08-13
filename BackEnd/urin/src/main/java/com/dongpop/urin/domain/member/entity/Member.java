package com.dongpop.urin.domain.member.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "members")
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String identifier;
    private String memberName;
    private String nickname;
    private String password;
    private String role;

    private String refreshToken;

    private Boolean isPassed;
    @Builder
    public Member(String identifier, String memberName, String nickname, String password, String role, String email, String profileImage) {
        this.identifier = identifier;
        this.memberName = memberName;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
    }

    @PrePersist
    public void prePersist() {
        if (getIsPassed() == null)
            isPassed = false;
    }

    public void saveRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void removeRefreshToken() {
        refreshToken = null;
    }

    public void changeMemberPassState(boolean isPassed) {
        this.isPassed = isPassed;
    }
}
