package com.shinosaka.shukatsunomori.backend.dto.response.review;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailResponse {

    private Long reviewId;
    private Long companyId;
    private Long userId;
    private String title;
    private String position;
    private String content;
    private String stage;
    private String result;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

    public static ReviewDetailResponse form(Review review){
        return ReviewDetailResponse.builder()
                .reviewId(review.getReviewId())
                .companyId(review.getReviewId())
                .userId(review.getReviewId())
                .title(review.getTitle())
                .position(review.getPosition())
                .content(review.getContent())
                .stage(review.getStage())
                .result(review.getResult())
                .createdAt(review.getCreatedAt())
                .updateAt(review.getUpdateAt())
                .build();
    }
}

