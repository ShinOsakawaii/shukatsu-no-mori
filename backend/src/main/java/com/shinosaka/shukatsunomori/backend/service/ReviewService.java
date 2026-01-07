package com.shinosaka.shukatsunomori.backend.service;

import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.companyReview.ReviewResponse;


public interface ReviewService {

    // 게시글 목록 조회 + 검색 +페이징
    PageResponse<ReviewResponse> getReviews(Long companyId, int page, int size, String keyword);

    //게시글 상세 조회
    ReviewResponse getReview(Long companyId, Long reviewId, Long userId);

    //게시글 생성 (회원)
    ReviewResponse createReview(Long companyId, ReviewCreateRequest request, Long userId);

    // 게시글 수정 (회원)
    ReviewResponse updateReview(Long companyId, Long reviewId, ReviewUpdateRequest request, Long userId);

    // 게시글 삭제 (회원)
    void deleteReview(Long companyId, Long reviewId, Long userId);
}   