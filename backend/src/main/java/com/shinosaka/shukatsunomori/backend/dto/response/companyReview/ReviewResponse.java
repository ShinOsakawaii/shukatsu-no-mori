package com.shinosaka.shukatsunomori.backend.dto.response.companyReview;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {

    private Long reviewId;
    private Long companyId;
    private Long userId;
    private String title;
    private String position;
    private String content;
    private String stage;
    private String result;
    private String nickname;
    private boolean isOwner;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /*
     * Entity -> DTO 변환 메서드
     */

    // 목록 조회 변환
    public static ReviewResponse from(Review review) {
        return ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .nickname(review.getUser().getNickname())
                .title(review.getTitle())
                .position(review.getPosition())
                .stage(review.getStage())
                .result(review.getResult())
                .content(review.getContent())
                .isOwner(false)
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }

    // 상세 조회 변환
    public static ReviewResponse from(Review review, boolean isOwner) {
        return ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .companyId(review.getCompany().getCompanyId())
                .userId(review.getUser().getUserId())
                .nickname(review.getUser().getNickname())
                .title(review.getTitle())
                .position(review.getPosition())
                .stage(review.getStage())
                .result(review.getResult())
                .content(review.getContent())
                .isOwner(isOwner)
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}