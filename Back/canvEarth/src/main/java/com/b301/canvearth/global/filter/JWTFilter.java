package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
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

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    private final AccessService accessService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException, CustomException {

        // 1. Header 에서 access 토큰 검색
        String accessToken = request.getHeader("accessToken");

        if(accessToken == null ) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. access 토큰 유효기간 검증
        try{
            jwtUtil.isExpired(accessToken);
        }catch (ExpiredJwtException e){
            throw new CustomException(ErrorCode.ACCESS_TOKEN_HAS_EXPIRED);
        }catch(SignatureException e){
            throw new CustomException(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // 3. 토큰 카테고리가 access 인지 대조
        String category = jwtUtil.getCategory(accessToken);

        if(!category.equals("access")){
            throw new CustomException(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // 4. Redis 에서 access 토큰 2차 검증
        String username = jwtUtil.getUsername(accessToken);
        boolean isValid = accessService.isAccessTokenValid(username, accessToken);

        if(!isValid){
            throw new CustomException(ErrorCode.UNUSED_ACCESS_TOKEN);
        }

        // 5. role = ADMIN 인증
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
