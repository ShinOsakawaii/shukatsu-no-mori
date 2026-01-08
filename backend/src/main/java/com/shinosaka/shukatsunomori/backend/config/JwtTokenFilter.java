package com.shinosaka.shukatsunomori.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    //요청 -> 필터 -> 컨트롤러
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )
        throws SecurityException, IOException, ServletException{

        //요청 헤드에서 토큰 추출 Authorization : Bearer
        String token = resolveToken(request);

        //토큰이 있고 유효하면
        if(token != null && jwtTokenProvider.validateToken(token)){
            //토큰에서 정보 추출
            Long userId = jwtTokenProvider.getUserId(token);

            //권한 없이 인증 객체 생성
            //spring security 객체로 로그인 대상 정보
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userId, //principle 사용자 정보
                    null, //비밀번호, 로그인 할 때만 사용하나 JWT로 인증이 끝났으므로 null
                    null);

            //SecurityContext에 저장
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request, response);
    }

    //토큰 추출
    private  String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){//"Bearer " 띄어쓰기 주의
            return bearerToken.substring(7); //"Bearer " 제거
        }
        return null;
    }

}
