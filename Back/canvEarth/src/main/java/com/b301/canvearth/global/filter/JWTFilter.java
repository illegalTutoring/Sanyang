package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.global.util.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;

    private final AccessService accessService;

    public JWTFilter(JWTUtil jwtUtil, AccessService accessService) {

        this.jwtUtil = jwtUtil;
        this.accessService = accessService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Map<String, String> data = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=utf-8");

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
            data.put("message", "만료된 access 토큰입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }catch(SignatureException e){
            throw new CustomException(ErrorCode.INVALID_ACCESS_TOKEN);
        }

        // 3. 토큰 카테고리가 access 인지 대조
        String category = jwtUtil.getCategory(accessToken);

        if(!category.equals("access")){

            data.put("message", "잘못된 access 토큰입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus((HttpServletResponse.SC_UNAUTHORIZED));
            return;
        }

        // 4. Redis 에서 access 토큰 2차 검증
        String username = jwtUtil.getUsername(accessToken);
        boolean isValid = accessService.isAccessTokenValid(username, accessToken);

        if(!isValid){

            data.put("message", "사용하지 않는 access 토큰입니다");
            String jsonData = objectMapper.writeValueAsString(data);

            response.getWriter().write(jsonData);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
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
