package com.shinosaka.shukatsunomori.backend.dto.response;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewListResponse {

    private Long reviewId;
    private Long companyId;
    private Long userId;
    private String title;
    private String content;
    private String stage;
    private String result;
    private LocalDateTime createdAt;

    public static ReviewListResponse form(Review review) {
        return ReviewListResponse.builder()
                .reviewId(review.getReviewId())
                .companyId(review.getCompany().getCompanyId())
                .userId(review.getUser().getUserId())
                .title(review.getTitle())
                .content(review.getContent())
                .stage(review.getStage())
                .result(review.getResult())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
