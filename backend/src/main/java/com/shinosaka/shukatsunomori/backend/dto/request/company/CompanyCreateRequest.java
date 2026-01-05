package com.shinosaka.shukatsunomori.backend.dto.request.company;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Location;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyCreateRequest {

    @NotBlank(message = "위치 작성 필수")
    @Size(max = 50, message = "50자 이하로 작성하세요.")
    private String city;

    @NotBlank(message = "회사명 작성 필수")
    @Size(max = 100, message = "100자 이하로 작성하세요.")
    private String name;

    @NotBlank(message = "업계 작성 필수")
    @Size(max = 50, message = "50자 이하로 작성하세요.")
    private String industry;

    @Size(max = 255, message = "255자 이하로 작성하세요.")
    private String website;

    private String description;

    @Size(max = 255, message = "255자 이하로 작성하세요.")
    private String companyImage;


    public Company toEntity(Location location) {
        return Company.builder()
                .location(location)
                .name(name)
                .industry(industry)
                .website(website)
                .description(description)
                .companyImage(companyImage)
                .build();
    }
}
