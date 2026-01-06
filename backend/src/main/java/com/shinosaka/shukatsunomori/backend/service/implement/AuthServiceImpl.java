package com.shinosaka.shukatsunomori.backend.service.implement;

import com.shinosaka.shukatsunomori.backend.config.JwtTokenProvider;
import com.shinosaka.shukatsunomori.backend.domain.User;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.LoginRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.MyInfoUpdateRequest;
import com.shinosaka.shukatsunomori.backend.dto.request.auth.SignupRequest;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.AuthResponse;
import com.shinosaka.shukatsunomori.backend.dto.response.auth.MyInfoResponse;
import com.shinosaka.shukatsunomori.backend.repository.UserRepository;
import com.shinosaka.shukatsunomori.backend.service.AuthService;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    //회원가입
    @Override
    public void signup(@Valid SignupRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다.");
        }

        if (request.getPassword() == null || request.getRePassword() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "비밀번호와 비밀번호 확인을 모두 입력해주세요."
            );
        }

        if (!request.getPassword().equals(request.getRePassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "비밀번호와 비밀번호 확인이 일치하지 않습니다."
            );
        }

        //비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        //User 저장
        User user = request.toEntity(encodedPassword);
        userRepository.save(user);
    }

    //로그인
    @Override
    public AuthResponse login(LoginRequest request){
        //회원조회
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 맞지 않습니다."));

        //비밀번호 검증
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 맞지 않습니다.");
        }

        //JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(user);

        return new AuthResponse(token, "Bearer");
    }

    //내 정보
    @Override
    public @Nullable MyInfoResponse getMyInfo(Long userId){

        if(userId == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."));

        return MyInfoResponse.from(user);
    }

    //내 정보 수정
    @Override
    public void patchMyInfo(Long userId, @Valid MyInfoUpdateRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."));

        //닉네임 변경
        if(request.getNickname() != null){
            user.updateNickname(request.getNickname());
        }
        //이미지 변경
        if (request.getProfileImage() != null){
            user.updateProfileImage(request.getProfileImage());
        }
        //비밀번호 변경
        if(request.getNewPassword() != null && request.getNewPassword().equals(request.getConfirmPassword())
        ){
            String encodedPassword = passwordEncoder.encode(request.getNewPassword());
            user.updatePassword(encodedPassword);
        }
    }



}
