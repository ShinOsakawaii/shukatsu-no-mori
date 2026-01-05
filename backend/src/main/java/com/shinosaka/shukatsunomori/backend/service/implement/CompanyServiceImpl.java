package com.shinosaka.shukatsunomori.backend.service.implement;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Location;
import com.shinosaka.shukatsunomori.backend.dto.request.CompanyCreateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.CompanyUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.CompanyResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.PageResponse;
import com.shinosaka.shukatsunomori.backend.repository.CompanyRepository;
import com.shinosaka.shukatsunomori.backend.repository.LocationRepository;
import com.shinosaka.shukatsunomori.backend.service.CompanyService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final LocationRepository locationRepository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<CompanyResponse> getCompanyList(@Min(0) int page, @Max(10) int size) {
        Pageable pageable = PageRequest.of(page, size,  Sort.by(Sort.Direction.DESC, "companyId"));
        Page<Company> companies = companyRepository.findAll(pageable);
        return PageResponse.from(companies, CompanyResponse::from);
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyResponse getCompanyDetail(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업을 찾을 수 없습니다."));
        return CompanyResponse.from(company);
    }

    @Override
    public CompanyResponse createCompany(@Valid CompanyCreateRequest companyCreateRequest) {
        Location location = locationRepository.findByCity(companyCreateRequest.getCity())
                .orElseGet(() -> locationRepository.save(Location.builder().city(companyCreateRequest.getCity()).build()));
        Company company = companyCreateRequest.toEntity(location);
        return CompanyResponse.from(companyRepository.save(company));
    }

    @Override
    public CompanyResponse updateCompany(Long companyId, CompanyUpdateRequest companyUpdateRequest) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 기업을 찾을 수 없습니다."));
        Location location = locationRepository.findByCity(companyUpdateRequest.getCity())
                .orElseGet(() -> locationRepository.save(Location.builder().city(companyUpdateRequest.getCity()).build()));
        company.update(
                location,
                companyUpdateRequest.getName(),
                companyUpdateRequest.getIndustry(),
                companyUpdateRequest.getWebsite(),
                companyUpdateRequest.getDescription(),
                companyUpdateRequest.getCompanyImage());
        return CompanyResponse.from(company);
    }
}
