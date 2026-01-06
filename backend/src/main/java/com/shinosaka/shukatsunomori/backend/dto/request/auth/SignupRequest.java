package com.shinosaka.shukatsunomori.backend.dto.request.auth;

import com.shinosaka.shukatsunomori.backend.domain.Role;
import com.shinosaka.shukatsunomori.backend.domain.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignupRequest {


    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일은 필수입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 4, max = 20, message = "비밀번호 4~20글자 사이만 가능합니다.")
    private String password;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 4, max = 20, message = "비밀번호 4~20글자 사이만 가능합니다.")
    private String rePassword;

    @NotBlank(message = "닉네임은 필수입니다.")
    @Size(min = 2, max = 10, message = "닉네임은 2~10글자 사이만 가능합니다.")
    private String nickname;

    private String profileImage;

    private Role role;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .email(this.email)
                .password(encodedPassword)
                .nickname(this.nickname)
                .role(role.USER)
                .profileImage(this.profileImage)
                .build();
    }

}
