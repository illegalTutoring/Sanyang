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


    public String isValidAccessToken(HttpServletRequest request) throws CustomException {

        // 1. Header 에서 access 토큰 검색
        String accessToken = request.getHeader("Authorization");

        if (accessToken == null) {
            return null;
        }

        accessToken = accessToken.replace("Bearer ", "");

        log.info("======================== START JWT (ACCESS) TOKEN FILTER =======================");
        log.info("[JWT(ACCESS) INFO]]");
        log.info("  accessToken: {}", accessToken);

        // 2. access 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            unValidRefreshToken(ErrorCode.ACCESS_TOKEN_HAS_EXPIRED);
        } catch (Exception e) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // 3. 토큰 카테고리가 access 인지 대조
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // 4. Redis 에서 access 토큰 2차 검증
        String username = jwtUtil.getUsername(accessToken);
        boolean isValid = accessService.isAccessTokenValid(username, accessToken);

        if (!isValid) {
            unValidRefreshToken(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        log.info("  result : Valid");

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
            unValidRefreshToken(ErrorCode.REFRESH_TOKEN_DOES_NOT_EXIST);
        }

        log.info("[JWT(REFRESH) INFO]]");
        log.info("  refreshToken: {}", refreshToken);

        // 2. refresh 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            unValidRefreshToken(ErrorCode.REFRESH_TOKEN_HAS_EXPIRED);
        } catch (Exception e){
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 3. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);

        if (!category.equals("refresh")) {
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);

        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if (!isValid) {
            unValidRefreshToken(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        return refreshToken;
    }

    private void unValidRefreshToken(ErrorCode errorCode) throws CustomException {
        log.info("  result : UnValid");
        throw new CustomException(errorCode);
    }
}
