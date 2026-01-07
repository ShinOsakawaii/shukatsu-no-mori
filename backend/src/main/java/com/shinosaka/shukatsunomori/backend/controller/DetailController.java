package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.companyDetail.DetailResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;
import com.shinosaka.shukatsunomori.backend.service.DetailService;
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
public class DetailController {

    private final DetailService detailService;

    // 기업 분석 목록 조회 + 검색 + 페이징
    @GetMapping("/detail")
    public ResponseEntity<PageResponse<DetailResponse>> getDetailList(
            @PathVariable Long companyId,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Max(10) int size,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(detailService.getDetailList(page, size, keyword, companyId));
    }

    // 기업 분석 개별 조회
    @GetMapping("/detail/{detailId}")
    public ResponseEntity<DetailResponse> getDetail(
            @PathVariable Long companyId,
            @PathVariable Long detailId,
            @AuthenticationPrincipal Long userId
    ) {
        return ResponseEntity.ok(detailService.getDetail(companyId, detailId, userId));
    }

    // 기업 분석 등록
    @PostMapping("/detail")
    public ResponseEntity<DetailResponse> createDetail(
            @PathVariable Long companyId,
            @Valid @RequestBody DetailCreateRequest request,
            @AuthenticationPrincipal Long userId
            ) {
        DetailResponse response = detailService.createDetail(request, companyId, userId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    // 기업 분석 수정
    @PutMapping("/detail/{detailId}")
    public ResponseEntity<DetailResponse> updateDetail(
            @PathVariable Long companyId,
            @PathVariable Long detailId,
            @RequestBody DetailUpdateRequest request,
            @AuthenticationPrincipal Long userId
    ) {
        return ResponseEntity.ok(detailService.updateDetail(companyId, detailId, request, userId));
    }

    // 기업 분석 삭제
    @DeleteMapping("/detail/{detailId}")
    public ResponseEntity<Void> deleteDetail(
            @PathVariable Long companyId,
            @PathVariable Long detailId,
            @AuthenticationPrincipal Long userId
    ) {
        detailService.deleteDetail(companyId, detailId, userId);
        return ResponseEntity.noContent().build();
    }

}
