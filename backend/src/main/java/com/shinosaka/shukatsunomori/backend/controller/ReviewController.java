package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.companyReview.ReviewResponse;
import com.shinosaka.shukatsunomori.backend.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies/{companyId}")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 기업 후기 목록 조회 + 검색 + 페이지
    @GetMapping("/review")
    public ResponseEntity<PageResponse<ReviewResponse>> getReviews(
            @PathVariable Long companyId,
            @RequestParam(defaultValue = "0")  @Min(0) int page,
            @RequestParam(defaultValue = "10") @Max(10) int size,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(reviewService.getReviews(companyId, page, size, keyword));
    }

    // 기업 후기 개별 조회
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<ReviewResponse> getReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @AuthenticationPrincipal Long userId
    ) {
        return ResponseEntity.ok(reviewService.getReview(companyId, reviewId, userId));
    }

    // 기업 후기 등록
    @PostMapping("/review")
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long companyId,
            @Valid @RequestBody ReviewCreateRequest request,
            @AuthenticationPrincipal Long userId
    ) {
        ReviewResponse response = reviewService.createReview(companyId, request, userId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    // 기업 후기 수정
    @PutMapping("/review/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewUpdateRequest request,
            @AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(reviewService.updateReview(companyId, reviewId, request, userId));
    }

    // 기업 후기 삭제
    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @AuthenticationPrincipal Long userId) {

        reviewService.deleteReview(companyId, reviewId, userId);
        return ResponseEntity.noContent().build();
    }

    // 마이페이지 기업 후기 조회
    @GetMapping("/review/me")
    public PageResponse<ReviewResponse> getMyReviewList(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Max(10) int size,
            @RequestParam(required = false) String keyword,
            @PathVariable Long companyId,
            @AuthenticationPrincipal Long userId
    ) {
        return reviewService.getMyReviewList(page, size, keyword, companyId, userId);
    }
}