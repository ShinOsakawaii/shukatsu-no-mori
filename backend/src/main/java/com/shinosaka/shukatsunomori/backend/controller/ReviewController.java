package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.review.ReviewResponse;
import com.shinosaka.shukatsunomori.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies/{companyId}/review")
@RequiredArgsConstructor
public class ReviewController {


    private final ReviewService reviewService;

    // 기업 후기 목록 조회 + 검색 + 페이지
    @GetMapping
    public ResponseEntity<PageResponse<ReviewResponse>> getReviews(
            @PathVariable Long companyId, // URL 경로는 받지만 서비스 호출 시 사용 안 함 (서비스 사양에 맞춤)
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @AuthenticationPrincipal Long userId) {


        return ResponseEntity.ok(reviewService.getReviews(page, size, keyword, userId));
    }

    // 기업 후기 개별 조회
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @AuthenticationPrincipal Long userId) {


        return ResponseEntity.ok(reviewService.getReview(reviewId, userId));
    }

    // 기업 후기 등록
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long companyId,
            @Valid @RequestBody ReviewCreateRequest request,
            @AuthenticationPrincipal Long userId) {


        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(userId, request));
    }

    // 기업 후기 수정
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewUpdateRequest request,
            @AuthenticationPrincipal Long userId) {


        return ResponseEntity.ok(reviewService.updateReview(userId, reviewId, request));
    }

    // 기업 후기 삭제
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @AuthenticationPrincipal Long userId) {

        reviewService.deleteReview(userId, reviewId);
        return ResponseEntity.noContent().build();
    }
}