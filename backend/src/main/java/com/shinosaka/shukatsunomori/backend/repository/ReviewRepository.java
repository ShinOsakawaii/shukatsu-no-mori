package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.Detail;
import com.shinosaka.shukatsunomori.backend.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByCompanyCompanyIdAndTitleContainingIgnoreCaseOrCompanyCompanyIdAndContentContainingIgnoreCase(
            Long companyId, String title,
            Long companyId2, String content,
            Pageable pageable
    );

    Page<Review> findByCompanyCompanyId(Long companyId, Pageable pageable);

    Optional<Review> findByReviewIdAndCompanyCompanyId(Long reviewId, Long companyId);

    Page<Review> findByUserUserId(Long userId, Pageable pageable);

    Page<Review> findByUserUserIdAndTitleContainingIgnoreCaseOrUserUserIdAndContentContainingIgnoreCase(Long userId, String keyword, Long userId1, String keyword1, Pageable pageable);
}