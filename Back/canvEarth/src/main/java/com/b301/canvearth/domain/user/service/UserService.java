package com.b301.canvearth.domain.user.service;

import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import com.b301.canvearth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    final private UserRepository userRepository;

    final private BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                       JWTUtil jwtUtil, RefreshService refreshService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
    }


    public String signInProcess(SignInDto signinDto) {

        // 1. 회원중복 조회
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();

        // 1-1. Username => ID
        boolean isExist = userRepository.existsById(username);

        if(isExist){
            return "User exists";
        }

        // 회원 등록
        User data = new User();
        data.setId(username);
        data.setUserName(username);
        data.setUserPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_ADMIN");

        userRepository.save(data);

        return "User save success";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response){

        // 1. 쿠키에서 refresh 토큰 검색
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refresh = cookie.getValue();
                }
            }
        }

        if (refresh == null) {
            return "refresh token null";
        }

        // 2. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            return "refresh token invalid";
        }

        // 3. refresh 토큰 유효기간 검증
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return "refresh token expired";
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);
        boolean isExist = refreshService.isRefreshTokenValid(username, refresh);
        if(!isExist){
            return "refresh token not exist";
        }

        // 5. access, refresh 토큰 재발급
        String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefresh, 86400000L);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie(newRefresh));

        return "Cookie creation success";
    }

    private Cookie createCookie(String value) {
        // 1. 쿠키 생성
        Cookie cookie = new Cookie("refresh", value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

}
