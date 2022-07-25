package com.dongpop.urin.domain.study.repository;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "studies")
public class Study extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String notice;
    private StudyState status;
    private int memberCapacity;
    private boolean isOnair;
}
