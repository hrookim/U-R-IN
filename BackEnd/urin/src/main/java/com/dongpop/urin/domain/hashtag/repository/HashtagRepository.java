package com.dongpop.urin.domain.hashtag.repository;

import com.dongpop.urin.domain.hashtag.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
    Optional<Hashtag> findByCode(String code);

    List<Hashtag> findAllByCodeIn(List<String> hashtagCodeList);
}
