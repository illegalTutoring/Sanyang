package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.JWTValidationUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
    (Custom) JWTFilter
        1. extends OncePerRequestFilter : 요청이 들어올 때마다 한번 실행함
        2. @Override doFilterInternal 모든 요청에서 AccessToken 을 인식하여 SecurityContextHolder 를 통해 유저 정보를 관리한다.
        3. 토큰이 없는 경우 /api/admin 요청일 때는 예외를 발생시키고 다른 url 이라면 통과 시킨다.
 */
@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    private final JWTValidationUtil jwtValidationUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException, CustomException {

        // 1. Access Token 유효성 검사
        String accessToken = jwtValidationUtil.isValidAccessToken(request);

        if(accessToken == null ) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. role = ADMIN 인증
        String username = jwtUtil.getUsername(accessToken);
        String role = jwtUtil.getRole(accessToken);

        User userEntity = new User();
        userEntity.setUserName(username);
        userEntity.setRole(role);

        CustomUserDetails userDetails = new CustomUserDetails(userEntity);
        Authentication authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
    
}
