package com.shinosaka.shukatsunomori.backend.dto.response.review;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /*
     * Entity -> DTO 변환 메서드
     */
    public static ReviewResponse from(Review review) {
        return ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .companyId(review.getCompany().getCompanyId())
                .userId(review.getUser().getUserId())
                .title(review.getTitle())
                .position(review.getPosition())
                .content(review.getContent())
                .stage(review.getStage())
                .result(review.getResult())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdateAt())
                .build();
    }
}