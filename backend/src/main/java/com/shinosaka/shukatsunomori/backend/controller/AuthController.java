package com.shinosaka.shukatsunomori.backend.controller;

import com.shinosaka.shukatsunomori.backend.dto.request.auth.LoginRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.MyInfoUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.SignupRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.AuthResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.MyInfoResponse;
import com.shinosaka.shukatsunomori.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    //회원가입 - 비회원 사용
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest request){
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    //myinfo
    @GetMapping("/myinfo")
    public ResponseEntity<MyInfoResponse> getMyInfo(@AuthenticationPrincipal Long userId){
        return ResponseEntity.ok(authService.getMyInfo(userId));
    }

    //myinfo 수정
    @PatchMapping("/myinfo")
    public ResponseEntity<Void> patchMyInfo(@AuthenticationPrincipal Long userId, @Valid @RequestBody MyInfoUpdateRequest request){
        authService.patchMyInfo(userId, request);
        return ResponseEntity.noContent().build();
    }
}