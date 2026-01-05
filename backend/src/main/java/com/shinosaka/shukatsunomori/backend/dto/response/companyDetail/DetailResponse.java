package com.shinosaka.shukatsunomori.backend.dto.response.CompanyDetail;

import com.shinosaka.shukatsunomori.backend.domain.Detail;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailResponse {

    private Long detailId;
    private Long companyId;
    private Long userId;
    private String title;
    private String position;
    private String content;
    private boolean isOwner;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 목록 조회
    public static DetailResponse from(Detail detail) {
        return DetailResponse.builder()
                .detailId(detail.getDetailId())
                .title(detail.getTitle())
                .position(detail.getPosition())
                .content(detail.getContent())
                .isOwner(false) // 목록에서는 의미 없음
                .createdAt(detail.getCreatedAt())
                .updatedAt(detail.getUpdatedAt())
                .build();
    }

    // 상세 조회
    public static DetailResponse from(Detail detail, boolean isOwner) {
        return DetailResponse.builder()
                .detailId(detail.getDetailId())
                .companyId(detail.getCompany().getCompanyId())
                .userId(detail.getUser().getUserId())
                .title(detail.getTitle())
                .position(detail.getPosition())
                .content(detail.getContent())
                .isOwner(isOwner)
                .createdAt(detail.getCreatedAt())
                .updatedAt(detail.getUpdatedAt())
                .build();
    }
}
