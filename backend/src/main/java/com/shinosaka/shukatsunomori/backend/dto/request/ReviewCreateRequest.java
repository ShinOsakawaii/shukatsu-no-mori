package com.shinosaka.shukatsunomori.backend.dto.request;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import com.shinosaka.shukatsunomori.backend.domain.Review;
import com.shinosaka.shukatsunomori.backend.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCreateRequest {

    @NotBlank(message = "제목 작성은 필수입니다.")
    @Size(max = 200, message = "200자 이하로 작성해주세요.")
    private String title;

    @NotBlank(message = "직군 작성은 필수입니다.")
    @Size(max = 50, message = "50자 이하로 작성해주세요.")
    private String position;

    @NotBlank(message = "선고 단계 선택은 필수입니다.")
    @Size(max = 20, message = "20자 이하로 작성해주세요.")
    private String stage;

    @NotBlank(message = "결과 선택은 필수입니다.")
    @Size(max = 20, message = "20자 이하로 작성해주세요.")
    private String result;

    @NotBlank(message = "내용 작성은 필수입니다.")
    @Size(max = 4000, message = "4000자 이하로 작성해주세요.")
    private String content;

    public Review toEntity(Company company, User user) {
        return Review.builder()
                .company(company)
                .user(user)
                .title(title)
                .position(position)
                .stage(stage)
                .result(result)
                .content(content)
                .build();
    }
}
