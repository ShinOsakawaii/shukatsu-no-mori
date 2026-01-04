package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.CompanyUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.CompanyResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.PageResponse;
import com.shinosaka.shukatsunomori.backend.service.CompanyService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    // 기업 목록 조회
    @GetMapping
    public ResponseEntity<PageResponse<CompanyResponse>> list(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Max(10) int size
    ) {
        return ResponseEntity.ok(companyService.getCompanyList(page, size));
    }


    // 기업 상세 조회
    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyResponse> companyDetail(@PathVariable Long companyId) {
        return ResponseEntity.ok(companyService.getCompanyDetail(companyId));
    }

    // 기업 등록
//    @PostMapping("/new")

    // 기업 수정
//    @PutMapping("/{companyId}/edit")


    // 기업 삭제 (없음)
}
