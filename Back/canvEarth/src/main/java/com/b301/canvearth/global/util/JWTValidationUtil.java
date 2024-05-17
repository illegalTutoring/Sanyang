package com.b301.canvearth.global.util;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/*
    JWTValidationUtil
        1. isValidAccessToken : AccessToken 유효한지 검사
        2. isValidRefreshToken : RefreshToken 유효한지 검사
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JWTValidationUtil {

    private final JWTUtil jwtUtil;

    private final AccessService accessService;

    private final RefreshService refreshService;

    private final LogUtil logUtil;


    public String isValidAccessToken(HttpServletRequest request) throws CustomException {

        // 1. Header 에서 access 토큰 검색
        String accessToken = request.getHeader("Authorization");

        if (accessToken == null) {
            return null;
        }

        logUtil.serviceLogging("JWT(Access) token validation");

        accessToken = accessToken.replace("Bearer ", "");

        // 2. access 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            logUtil.exceptionLogging(ErrorCode.ACCESS_TOKEN_HAS_EXPIRED, "Access token invalid");
        } catch (Exception e) {
            logUtil.exceptionLogging(ErrorCode.INVALID_ACCESS_TOKEN, "Access token invalid");
        }

        // 3. 토큰 카테고리가 access 인지 대조
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            logUtil.exceptionLogging(ErrorCode.INVALID_ACCESS_TOKEN, "Access token invalid");
        }

        // 4. Redis 에서 access 토큰 2차 검증
        String username = jwtUtil.getUsername(accessToken);
        boolean isValid = accessService.isAccessTokenValid(username, accessToken);

        if (!isValid) {
            logUtil.exceptionLogging(ErrorCode.INVALID_ACCESS_TOKEN, "Access token invalid");
        }

        logUtil.resultLogging("Access token valid");

        return accessToken;
    }

    public String isValidRefreshToken(HttpServletRequest request) throws CustomException {
        // 1. 쿠키에서 refresh 토큰 검색
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        logUtil.serviceLogging("JWT(Refresh) token validation");

        if (refreshToken == null) {
            logUtil.exceptionLogging(ErrorCode.REFRESH_TOKEN_DOES_NOT_EXIST, "Refresh token invalid");
            return null;
        }


        // 2. refresh 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            logUtil.exceptionLogging(ErrorCode.REFRESH_TOKEN_HAS_EXPIRED, "Refresh token invalid");
        } catch (Exception e){
            logUtil.exceptionLogging(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token invalid");
        }

        // 3. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);

        if (!category.equals("refresh")) {
            logUtil.exceptionLogging(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token invalid");
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);

        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if (!isValid) {
            logUtil.exceptionLogging(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token invalid");
        }

        logUtil.resultLogging("Refresh token valid");

        return refreshToken;
    }
    
}
