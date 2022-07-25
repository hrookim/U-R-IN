package com.dongpop.urin.domain.member.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "members")
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String nickname;
    private String password;
    private String role;
}
