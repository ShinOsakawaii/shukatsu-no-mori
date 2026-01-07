package com.shinosaka.shukatsunomori.backend.service.implement;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Review;
import com.shinosaka.shukatsunomori.backend.domain.User;
import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyReview.ReviewUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.companyReview.ReviewResponse;
import com.shinosaka.shukatsunomori.backend.repository.CompanyRepository;
import com.shinosaka.shukatsunomori.backend.repository.ReviewRepository;
import com.shinosaka.shukatsunomori.backend.repository.UserRepository;
import com.shinosaka.shukatsunomori.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;


    // 공통 로그인 체크
    private void requiredLogin(Long userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
    }

    //  리뷰 작성 (Create)
    @Override
    public ReviewResponse createReview(Long userId, ReviewCreateRequest request) {
        // 로그인 체크
        requiredLogin(userId);

        // 유저 객체 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자를 찾을 수 없습니다."));

        // 회사 객체 조회 (request에서 받은 ID로 조회)
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "회사를 찾을 수 없습니다."));

        // DTO -> Entity 변환 (객체 두 개를 다 넘겨줍니다)
        Review review = request.toEntity(user, company);

        // 저장 및 결과 반환
        Review saved = reviewRepository.save(review);
        return ReviewResponse.from(saved, userId);
    }

    // 리뷰 목록 조회 + 페이징 + 검색
    public PageResponse<ReviewResponse> getReviews(int page, int size, String keyword, Long userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewId"));
        // 검색
        Page<Review> reviewPage = findReviewPage(keyword, pageable);

        // DTO로 반환
        // reviewPage 안에 있는 entity 목록을 ReviewListResponse DTO로 변환 -> PageResponse 형태로 반환
        return PageResponse.from(reviewPage, (review) -> ReviewResponse.from(review, userId));
    }

    private Page<Review> findReviewPage(String keyword, Pageable pageable) {
        // 검색어가 없으면 전체 조회
        if (keyword == null || keyword.isBlank()) {
            return reviewRepository.findAll(pageable);
        }

        // 검색어가 있으면 제목/내용에서 검색
        return reviewRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
                keyword,
                keyword,
                pageable
        );
    }

    // 리뷰 상세 조회
    @Override
    public ReviewResponse getReview(Long ReviewId, Long userId) {
        // id 조회, 없으면 예외 처리
        Review review = reviewRepository.findById(ReviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        // 상세정보를 DTO 변환 반환
        return ReviewResponse.from(review, userId);
    }

    // 리뷰 수정
    @Override
    public ReviewResponse updateReview(Long userId, Long ReviewId, ReviewUpdateRequest request) {

        requiredLogin(userId);

        Review review = reviewRepository.findById(ReviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        // 작성자 체크
        if (!review.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 수정 권한이 없습니다.");
        }

        // 엔티티 업데이트 메서드
        review.update(request.getTitle(), request.getPosition(), request.getContent(), request.getStage(), request.getResult());
        // response DTO 변환 후 반환
        return ReviewResponse.from(review, userId);
    }

    // 리뷰 삭제
    @Override
    public void deleteReview(Long userId, Long ReviewId) {

        requiredLogin(userId);

        // 아이디 조회
        Review review = reviewRepository.findById(ReviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        if (!review.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 삭제 권한이 없습니다.");
        }

        // 삭제
        reviewRepository.delete(review);
    }
}
