package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
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
import java.io.PrintWriter;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = request.getHeader("access");

        if(accessToken == null ) {
            filterChain.doFilter(request, response);
            return;
        }

        try{
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e){

            PrintWriter writer = response.getWriter();
            writer.print("access token expired");

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;

        }

        String category = jwtUtil.getCategory(accessToken);

        if(!category.equals("access")){

            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");

            response.setStatus((HttpServletResponse.SC_UNAUTHORIZED));
            return;
        }

        String username = jwtUtil.getUsername(accessToken);
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
