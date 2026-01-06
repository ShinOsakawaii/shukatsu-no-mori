package com.shinosaka.shukatsunomori.backend.dto.request.companyDetail;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Detail;
import com.shinosaka.shukatsunomori.backend.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailCreateRequest {

    @NotBlank(message = "제목 작성 필수입니다.")
    @Size(max = 200, message = "200자 이하로 작성해 주세요.")
    private String title;

    @NotBlank(message = "직군 작성 필수입니다.")
    @Size(max = 100, message = "100자 이하로 작성해 주세요.")
    private String position;

    @NotBlank(message = "내용 작성 필수입니다.")
    @Size(max = 4000, message = "4000자 이하로 작성해 주세요.")
    private String content;

    public Detail toEntity(Company company, User user) {
        return Detail.builder()
                .user(user)
                .company(company)
                .title(title)
                .position(position)
                .content(content)
                .build();
    }

}
