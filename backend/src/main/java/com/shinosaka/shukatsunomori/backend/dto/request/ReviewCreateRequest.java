package com.shinosaka.shukatsunomori.backend.dto.request;

import com.shinosaka.shukatsunomori.backend.domain.Review;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCreateRequest {

    // 1. 이 필드를 가장 위에 추가하세요!
    @NotNull(message = "회사 선택은 필수입니다.")
    private Long companyId;

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

    public Review toEntity(User user, Company company) {
        return Review.builder()
                .user(user)
                .company(company)
                .title(title)
                .position(position)
                .stage(stage)
                .result(result)
                .content(content)
                .build();
    }
}
