package com.shinosaka.shukatsunomori.backend.service;

import com.shinosaka.shukatsunomori.backend.dto.request.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.review.ReviewDetailResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.review.ReviewListResponse;

public interface ReviewService {

    //게시글 생성 (회원)
    ReviewDetailResponse createReview(Long UserId, ReviewCreateRequest request);

    // 게시글 목록 조회 + 검색 +페이징
    PageResponse<ReviewListResponse> getReviewList(int page, int size, String keyword);

    //게시글 상세 조회
    ReviewDetailResponse getReviewDetail(Long reviewId);

    // 게시글 수정 (회원)
    ReviewDetailResponse updateReview(Long UserId, Long ReviewId, ReviewUpdateRequest request);

    // 게시글 삭제 (회원)
    void deleteReview(Long UserId, Long ReviewId);
}
