package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.io.PrintWriter;

public class LogoutFilter extends GenericFilterBean {

    private JWTUtil jwtUtil;

    private RefreshService refreshService;

    private AccessService accessService;

    public LogoutFilter(JWTUtil jwtUtil, RefreshService refreshService, AccessService accessService) {
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
        this.accessService = accessService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        // 1. URI, RestAPI 검증
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^/api/user/logout$")) {

            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 2. 쿠키에서 refresh 토큰 검색
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refreshToken")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
            PrintWriter writer = response.getWriter();
            writer.print("refresh 토큰이 존재하지 않습니다");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 3. refresh 토큰 유효기간 검증
        try{
            jwtUtil.isExpired(refresh);
        } catch(ExpiredJwtException e){
            PrintWriter writer = response.getWriter();
            writer.print("만료된 refresh 토큰 입니다");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 4. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            PrintWriter writer = response.getWriter();
            writer.print("잘못된 refresh 토큰 입니다");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 5. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refresh);
        boolean isExist = refreshService.isRefreshTokenValid(username, refresh);
        if(!isExist){
            PrintWriter writer = response.getWriter();
            writer.print("존재하지 않는 refresh 토큰 입니다");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 6. Token 삭제
        refreshService.deleteRefreshToken(refresh);


        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
