package com.shinosaka.shukatsunomori.backend.config;

import com.shinosaka.shukatsunomori.backend.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
//JWT를 만들고, 검사하고, 안에 든 사용자 정보를 꺼내주는 전담 클래스
public class JwtTokenProvider {

    //application.properties에서 주입

    //비밀키
    private final String secret;

    //만료 기간
    private final long expiration;

    //실제 암호화 키(변환된 키 저장용)
    private SecretKey secretKey;

    public JwtTokenProvider(@Value("${jwt.secret}")  String secret, @Value("${jwt.expiration}") long expiration) {
        this.secret = secret;
        this.expiration = expiration;
    }

    //객체 생성 후 자동 실행(초기화)
    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    //실제 사용
    //로그인시 JWT 생성
    public String generateToken(User user) {
        Date now = new Date(); //토큰 발급 시간
        Date expriry = new Date(now.getTime() + expiration); //토큰 만료 시간

        //.builer() 객체 반환
        //.compact(); String 반환
        return Jwts.builder()
                .subject(user.getUserId().toString()) //식별
                .claim("email", user.getEmail()) //부가정보
//                .claim("role", user.getRole().name())
                .issuedAt(now) //발급 시간
                .expiration(expriry) //만료 시간
                .signWith(secretKey) //비밀키 서명
                .compact(); //문자열 반환

    }

    //JWT 토큰 유효성 검사(서명, 만료 시간)
    public boolean validateToken(String token) {
        try{
            Jwts.parser()
                    .verifyWith(secretKey) //서명 확인
                    .build()
                    .parseSignedClaims(token); //파싱, 데이터 추출
            return true;
        } catch(Exception e){
            //위조되거나 만료 토큰
            return false;
        }
    }

    //JWT에서 정보 추출
    //UserId
    public Long getUserId(String token) {
        String subject = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

        return Long.parseLong(subject);
    }

    //email
    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email", String.class);
    }

}

