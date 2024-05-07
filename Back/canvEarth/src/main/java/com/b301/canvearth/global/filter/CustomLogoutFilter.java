package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    private final ResponseUtil responseUtil;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException,CustomException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException,CustomException {

        // 1. URI, RestAPI 검증
        String requestUri = request.getRequestURI();
        String requestMethod = request.getMethod();
        if (!requestUri.matches("^/api/user/logout$") || !requestMethod.equals("POST")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 2. 쿠키에서 refresh 토큰 검색
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_DOES_NOT_EXIST);
        }

        // 3. refresh 토큰 유효기간 검증
        try{
            jwtUtil.isExpired(refreshToken);
        } catch(ExpiredJwtException e){
            throw new CustomException(ErrorCode.REFRESH_TOKEN_HAS_EXPIRED);
        } catch(SignatureException e){
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 4. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 5. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);
        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if(!isValid){
            throw new CustomException(ErrorCode.UNUSED_REFRESH_TOKEN);
        }

        // 6. Token 삭제
        accessService.deleteAccessToken(username);
        refreshService.deleteRefreshToken(username);

        response.addCookie(responseUtil.deleteCookie("refreshToken"));

        responseUtil.sendMessage(response, false,"", HttpStatus.OK, "로그아웃 성공");
    }

}

