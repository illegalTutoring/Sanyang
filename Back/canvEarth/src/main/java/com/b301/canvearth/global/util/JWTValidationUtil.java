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
            unValidRefreshToken(ErrorCode.ACCESS_TOKEN_HAS_EXPIRED, "Access token");
        } catch (Exception e) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN, "Access token");
        }

        // 3. 토큰 카테고리가 access 인지 대조
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN, "Access token");
        }

        // 4. Redis 에서 access 토큰 2차 검증
        String username = jwtUtil.getUsername(accessToken);
        boolean isValid = accessService.isAccessTokenValid(username, accessToken);

        if (!isValid) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN, "Access token");
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

        if (refreshToken == null) {
            unValidRefreshToken(ErrorCode.REFRESH_TOKEN_DOES_NOT_EXIST, "Refresh token");
            return "";
        }

        logUtil.serviceLogging("JWT(Refresh) token validation");

        // 2. refresh 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            unValidRefreshToken(ErrorCode.REFRESH_TOKEN_HAS_EXPIRED, "Refresh token");
        } catch (Exception e){
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token");
        }

        // 3. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);

        if (!category.equals("refresh")) {
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token");
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);

        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if (!isValid) {
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN, "Refresh token");
        }

        logUtil.resultLogging("Refresh token valid");

        return refreshToken;
    }

    private void unValidRefreshToken(ErrorCode errorCode, String token) throws CustomException {

        logUtil.resultLogging(token + "invalid");

        throw new CustomException(errorCode);
    }
}
