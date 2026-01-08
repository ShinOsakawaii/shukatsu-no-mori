package com.shinosaka.shukatsunomori.backend.dto.request.auth;

import com.shinosaka.shukatsunomori.backend.domain.User;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyInfoUpdateRequest {

    @Size(min = 4, max = 20, message = "비밀번호 4~20글자 사이만 가능합니다.")
    private String password;
    private String rePassword;


    @Size(min = 2, max = 10, message = "닉네임은 2~10글자 사이만 가능합니다.")
    private String nickname;

    private String profileImage;

}