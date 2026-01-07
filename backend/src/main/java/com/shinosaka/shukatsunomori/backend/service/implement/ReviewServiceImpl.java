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
    public ReviewResponse createReview(Long companyId, ReviewCreateRequest request, Long userId) {
        // 로그인 체크
        requiredLogin(userId);

        // 유저 객체 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));

        // 회사 객체 조회 (request에서 받은 ID로 조회)
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "회사를 찾을 수 없습니다."));

        // DTO -> Entity 변환 (객체 두 개를 다 넘겨줍니다)
        Review review = request.toEntity(user, company);

        // 저장 및 결과 반환
        Review saved = reviewRepository.save(review);
        return ReviewResponse.from(saved);
    }

    // 리뷰 목록 조회 + 페이징 + 검색
    @Override
    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getReviews(Long companyId, int page, int size, String keyword) {

        // 기업 존재 여부 확인
        companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업을 찾을 수 없습니다."));

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewId"));

        // 기업 후기 목록 조회
        Page<Review> reviewPage;

        if (keyword == null || keyword.isBlank()) {
            reviewPage = reviewRepository.findByCompanyCompanyId(companyId, pageable);
        } else {
            reviewPage = reviewRepository.findByCompanyCompanyIdAndTitleContainingIgnoreCaseOrCompanyCompanyIdAndContentContainingIgnoreCase(
                    companyId, keyword,
                    companyId, keyword,
                    pageable
            );
        }
        return PageResponse.from(reviewPage, ReviewResponse::from);
    }

    // 리뷰 상세 조회
    @Override
    @Transactional(readOnly = true)
    public ReviewResponse getReview(Long companyId, Long reviewId, Long userId) {
        // id 조회, 없으면 예외 처리
        Review review = reviewRepository.findByReviewIdAndCompanyCompanyId(reviewId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        // 작성자 여부 판단
        boolean isOwner = false;
        if(userId != null) {
            isOwner = review.getUser().getUserId().equals(userId);
        }

        // 상세정보를 DTO 변환 반환
        return ReviewResponse.from(review, isOwner);
    }

    // 리뷰 수정
    @Override
    public ReviewResponse updateReview(Long companyId, Long reviewId, ReviewUpdateRequest request, Long userId) {

        requiredLogin(userId);

        Review review = reviewRepository.findByReviewIdAndCompanyCompanyId(reviewId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        // 작성자 체크
        if (!review.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 수정 권한이 없습니다.");
        }

        // 엔티티 업데이트 메서드
        review.update(request);

        System.out.println("REQ stage=" + request.getStage() + ", result=" + request.getResult());
        System.out.println("ENTITY stage=" + review.getStage() + ", result=" + review.getResult());

        // response DTO 변환 후 반환
        return ReviewResponse.from(review);
    }

    // 리뷰 삭제
    @Override
    public void deleteReview(Long companyId, Long reviewId, Long userId) {

        requiredLogin(userId);

        // 아이디 조회
        Review review = reviewRepository.findByReviewIdAndCompanyCompanyId(reviewId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 글을 찾을 수 없습니다."));

        if (!review.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 삭제 권한이 없습니다.");
        }

        // 삭제
        reviewRepository.delete(review);
    }
}
