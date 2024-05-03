package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class LogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        Map<String, String> data = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=utf-8");

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
            data.put("message", "refresh 토큰이 존재하지 않습니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 3. refresh 토큰 유효기간 검증
        try{
            jwtUtil.isExpired(refreshToken);
        } catch(ExpiredJwtException e){
            data.put("message", "만료된 refresh 토큰 입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 4. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            data.put("message", "잘못된 refresh 토큰 입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 5. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refreshToken);
        boolean isValid = refreshService.isRefreshTokenValid(username, refreshToken);
        if(!isValid){
            data.put("message", "사용하지 않는 refresh 토큰입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 6. Token 삭제
        accessService.deleteAccessToken(username);
        refreshService.deleteRefreshToken(username);


        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
