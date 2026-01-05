package com.shinosaka.shukatsunomori.backend.service;

import com.shinosaka.shukatsunomori.backend.dto.request.CompanyCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.CompanyUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.CompanyResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.PageResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public interface CompanyService {
    PageResponse<CompanyResponse> getCompanyList(@Min(0) int page, @Max(10) int size);

    CompanyResponse getCompanyDetail(Long companyId);

    CompanyResponse createCompany(@Valid CompanyCreateRequest companyCreateRequest);

    CompanyResponse updateCompany(Long companyId, CompanyUpdateRequest companyUpdateRequest);
}
