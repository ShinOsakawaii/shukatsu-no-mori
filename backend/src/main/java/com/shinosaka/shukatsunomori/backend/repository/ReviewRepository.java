package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String title, String content, Pageable pageable
    );

    Page<Review> findByUserUserIdAndTitleContainingIgnoreCaseOrUserUserIdAndContentContainingIgnoreCase(
            Long userId, String title,
            Long userId2, String content,
            Pageable pageable
    );

    Page<Review> findByUserUserId(Long userId, Pageable pageable);
}