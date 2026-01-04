package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.Detail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DetailRepository extends JpaRepository<Detail, Long> {

    // 검색O
    Page<Detail> findByTitleContainingIgnoreCaseOrContentContaining(
            Long companyId, String title,
            Long companyId2, String content,
            Pageable pageable
    );

    // 검색X
    Page<Detail> findByCompanyId(Long companyId, Pageable pageable);

    Optional<Detail> findByDetailIdAndCompanyId(Long detailId, Long companyId);
}
