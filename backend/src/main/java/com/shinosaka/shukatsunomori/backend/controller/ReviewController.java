package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.review.ReviewDetailResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.review.ReviewListResponse;
import com.shinosaka.shukatsunomori.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies/{companyId}/review")
@RequiredArgsConstructor
public class ReviewController {


    private final ReviewService reviewService;

    // 기업 후기 목록 조회 + 검색 + 페이지
    @GetMapping
    public ResponseEntity<PageResponse<ReviewListResponse>> getReviewList(
            @PathVariable Long companyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {

        return ResponseEntity.ok(reviewService.getReviewList(page, size, keyword));
    }

    // 기업 후기 개별 조회
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDetailResponse> getReviewDetail(
            @PathVariable Long companyId,
            @PathVariable Long reviewId) {

        return ResponseEntity.ok(reviewService.getReviewDetail(reviewId));
    }

    // 기업 후기 등록
    @PostMapping
    public ResponseEntity<ReviewDetailResponse> createReview(
            @PathVariable Long companyId,
            @Valid @RequestBody ReviewCreateRequest request) {

        // DTO에 URL로 받은 companyId를 넣어줍니다.
        request.setCompanyId(companyId);

        // userId는 임시로 1L로 설정 (나중에 로그인 세션 적용 시 수정)
        Long userId = 1L;

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(userId, request));
    }

    // 기업 후기 수정
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewDetailResponse> updateReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewUpdateRequest request) {

        Long userId = 1L; // 임시 userId
        return ResponseEntity.ok(reviewService.updateReview(userId, reviewId, request));
    }

    // 기업 후기 삭제
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long companyId,
            @PathVariable Long reviewId) {

        Long userId = 1L; // 임시 userId
        reviewService.deleteReview(userId, reviewId);
        return ResponseEntity.noContent().build();
    }
}