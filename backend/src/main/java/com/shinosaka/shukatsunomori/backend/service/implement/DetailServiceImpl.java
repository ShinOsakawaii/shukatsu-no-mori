package com.shinosaka.shukatsunomori.backend.service.implement;


import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Detail;
import com.shinosaka.shukatsunomori.backend.domain.User;
import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.companyDetail.DetailResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.repository.CompanyRepository;
import com.shinosaka.shukatsunomori.backend.repository.DetailRepository;
import com.shinosaka.shukatsunomori.backend.repository.UserRepository;
import com.shinosaka.shukatsunomori.backend.service.DetailService;
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
public class DetailServiceImpl implements DetailService {

    private final DetailRepository detailRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    // 공통 로그인 체크
    private void requiredLogin(Long userId) {
        if(userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
    }

    // 기업 분석 목록 조회
    @Override
    @Transactional(readOnly = true)
    public PageResponse<DetailResponse> getDetailList(int page, int size, String keyword, Long companyId) {

        // 기업 존재 여부 확인
        companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업을 찾을 수 없습니다."));

        // 페이징
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "detailId"));

        // 기업 분석 목록 조회
        Page<Detail> detailPage;

        if (keyword == null || keyword.isBlank()) {
            detailPage = detailRepository.findByCompanyCompanyId(companyId, pageable);
        } else {
            detailPage = detailRepository.findByCompanyCompanyIdAndTitleContainingIgnoreCaseOrCompanyCompanyIdAndContentContainingIgnoreCase (
                    companyId, keyword,
                    companyId, keyword,
                    pageable
            );
        }
        return PageResponse.from(detailPage, DetailResponse::from);
    }

    // 기업 분석 개별 조회
    @Override
    @Transactional(readOnly = true)
    public DetailResponse getDetail(Long companyId, Long detailId, Long userId) {
        // 기업 및 글 id 조회, 없으면 예외 처리
        Detail detail = detailRepository.findByDetailIdAndCompanyCompanyId(detailId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업의 분석 글을 찾을 수 없습니다."));

        // 작성자 여부 판단
        boolean isOwner = false;
        if(userId != null) {
            isOwner = detail.getUser().getUserId().equals(userId);
        }
        // entity -> DTO 변환해서 반환
        return DetailResponse.from(detail, isOwner);
    }

    // 기업 분석 작성
    @Override
    public DetailResponse createDetail(DetailCreateRequest request, Long companyId, Long userId) {
        // 로그인 여부
        requiredLogin(userId);

        // 기업 확인
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업 분석을 찾을 수 없습니다."));

        // 게시글 작성 권한 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));

        // DTO -> Entity 변환
        Detail detail = request.toEntity(company, user);
        // 저장
        Detail saved = detailRepository.save(detail);
        // DTO 변환해서 반환
        return DetailResponse.from(saved);
    }

    // 기업 분석 수정
    @Override
    public DetailResponse updateDetail(Long companyId, Long detailId, DetailUpdateRequest request, Long userId) {
        // 로그인 여부
        requiredLogin(userId);

        // 기업 및 글 id 조회, 없으면 예외 처리
        Detail detail = detailRepository.findByDetailIdAndCompanyCompanyId(detailId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업의 분석 글을 찾을 수 없습니다."));

        // 게시글 수정 권한 확인
        if(!detail.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 수정 권한이 없습니다.");
        }

        // 엔티티 업데이트 메서드
        detail.update(request.getTitle(), request.getPosition(), request.getContent());

        // DTO 변환 후 반환
        return DetailResponse.from(detail);
    }

    // 기업 분석 삭제
    @Override
    public void deleteDetail(Long companyId, Long detailId, Long userId) {
        // 로그인 여부
        requiredLogin(userId);

        // 기업 및 글 id 조회, 없으면 예외 처리
        Detail detail = detailRepository.findByDetailIdAndCompanyCompanyId(detailId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업의 분석 글을 찾을 수 없습니다."));

        //게시글 삭제 권한 확인
        if(!detail.getUser().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 삭제 권한이 없습니다.");
        }

        // 삭제
        detailRepository.delete(detail);
    }


    // 마이페이지 기업 분석 조회
    @Transactional(readOnly = true)
    public PageResponse<DetailResponse> getMyDetailList(
            int page, int size, String keyword,Long companyId, Long userId
    ) {
        // 로그인 체크
        requiredLogin(userId);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "detailId"));

        Page<Detail> detailPage;
        if (keyword != null && !keyword.isBlank()) {
            detailPage = detailRepository
                    .findByUserUserIdAndTitleContainingIgnoreCaseOrUserUserIdAndContentContainingIgnoreCase(
                            userId, keyword,
                            userId, keyword,
                            pageable
                    );
        } else {
            detailPage = detailRepository.findByUserUserId(userId, pageable);
        }

        // 어차피 전부 본인 글이라 isOwner는 전부 true
        return PageResponse.from(detailPage, detail -> DetailResponse.from(detail, true));
    }
}
