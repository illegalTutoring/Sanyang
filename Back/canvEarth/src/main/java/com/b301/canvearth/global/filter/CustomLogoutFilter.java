package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.JWTValidationUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
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

    private final JWTValidationUtil jwtValidationUtil;

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

        log.info("============================ START LOGOUT FILTER ===============================");

        // 2. Refresh Token 유효성 검사
        String refreshToken = jwtValidationUtil.isValidRefreshToken(request);
        String username = jwtUtil.getUsername(refreshToken);

        // 3. Token 삭제
        accessService.deleteAccessToken(username);
        refreshService.deleteRefreshToken(username);

        response.addCookie(responseUtil.deleteCookie("refreshToken"));

        responseUtil.sendMessage(response, false,"", HttpStatus.OK, "로그아웃 성공");

        log.info("=============================== SUCCESS LOGOUT =================================");

    }

}

