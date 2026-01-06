package com.shinosaka.shukatsunomori.backend.service;

import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.companyDetail.DetailUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.companyDetail.DetailResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.common.PageResponse;

public interface DetailService {

    PageResponse<DetailResponse> getDetailList(int page, int size, String keyword, Long companyId);

    DetailResponse getDetail(Long companyId, Long detailId, Long userId);

    DetailResponse createDetail(DetailCreateRequest request, Long companyId, Long userId);

    DetailResponse updateDetail(Long companyId, Long detailId, DetailUpdateRequest request, Long userId);

    void deleteDetail(Long companyId, Long detailId, Long userId);
}
