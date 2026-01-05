package com.shinosaka.shukatsunomori.backend.dto.response;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Location;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyResponse {

    private Long companyId;
    private Location location;
    private String name;
    private String industry;
    private String website;
    private String description;
    private String companyImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CompanyResponse from(Company company) {
        return CompanyResponse.builder()
                .companyId(company.getCompanyId())
                .location(company.getLocation())
                .name(company.getName())
                .industry(company.getIndustry())
                .website(company.getWebsite())
                .description(company.getDescription())
                .companyImage(company.getCompanyImage())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                .build();
    }

}
