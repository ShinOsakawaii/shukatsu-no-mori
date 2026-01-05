package com.shinosaka.shukatsunomori.backend.dto.response.auth;

import com.shinosaka.shukatsunomori.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MyInfoResponse {
    private Long userId;
    private String email;
    private String nickname;
    private String profileImage;

    public static MyInfoResponse from(User user) {
        return MyInfoResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();
    }

}
