package com.shinosaka.shukatsunomori.backend.service;

import com.shinosaka.shukatsunomori.backend.dto.request.auth.LoginRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.MyInfoUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.SignupRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.AuthResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.MyInfoResponse;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;

public interface AuthService {

    //회원가입
    public void signup(@Valid SignupRequest request);

    //로그인
    public AuthResponse login(LoginRequest request);

    //내 정보
    public MyInfoResponse getMyInfo(Long userId);

    //내 정보 수정
    public void patchMyInfo(Long userId, MyInfoUpdateRequest request);

}
