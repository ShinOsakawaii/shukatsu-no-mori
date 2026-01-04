package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByCompanyIdAndTitleContainingIgnoreCaseOrCompanyIdAndContentContainingIgnoreCase(
            Long companyId, String title, Long companyIdAgain, String content, Pageable pageable
    );
}