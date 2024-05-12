package com.b301.canvearth.global.util;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
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


    public String isValidRefreshToken(HttpServletRequest request) throws CustomException {
        // 1. 쿠키에서 refresh 토큰 검색
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

        // 2. refresh 토큰 유효기간 검증
        try{
            jwtUtil.isExpired(refreshToken);
        }catch (ExpiredJwtException e){
            throw new CustomException(ErrorCode.REFRESH_TOKEN_HAS_EXPIRED);
        }catch (SignatureException e){
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 3. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);

        if (!category.equals("refresh")) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);

        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if(!isValid){
            throw new CustomException(ErrorCode.UNUSED_REFRESH_TOKEN);
        }

        return refreshToken;
    }

    public String isValidAccessToken(HttpServletRequest request) throws CustomException {

        log.info("========================START Valid CHECK(ACCESS TOKEN)========================");

        // 1. Header 에서 access 토큰 검색
        String accessToken = request.getHeader("Authorization");

        if (accessToken == null) {
            return null;
        }

        accessToken = accessToken.replace("Bearer ", "");

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

        return accessToken;
    }
}
