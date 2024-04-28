package com.b301.canvearth.domain.user.service;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import com.b301.canvearth.global.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

//    private final

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                       JWTUtil jwtUtil, RefreshService refreshService, AccessService accessService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
        this.accessService = accessService;
    }


    public String signInProcess(SignInDto signinDto) {

        // 1. 회원중복 조회
        String id = signinDto.getId();
        String userName = signinDto.getUserName();
        String userPassword = signinDto.getUserPassword();

        // 1-1. Id 중복검사
        boolean isExist = userRepository.existsById(id);

        if(isExist){
            return "회원가입 실패";
        }

        // 회원 등록
        User data = new User();
        data.setId(id);
        data.setUserName(userName);
        data.setUserPassword(bCryptPasswordEncoder.encode(userPassword));
        data.setRole("ROLE_USER");

        userRepository.save(data);

        return "회원가입 성공";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response){

        // 1. 쿠키에서 refresh 토큰 검색
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refresh = cookie.getValue();
                }
            }
        }

        if (refresh == null) {
            return "refresh 토큰이 존재하지 않습니다";
        }

        // 2. 토큰 카테고리가 refresh 인지 대조
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            return "잘못된 refresh 토큰 입니다";
        }

        // 3. refresh 토큰 유효기간 검증
        boolean isExpired = jwtUtil.isExpired(refresh);
        if (isExpired) {
            return "만료된 refresh 토큰 입니다";
        }

        // 4. Redis 에서 refresh 토큰 2차 검증
        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);
        boolean isExist = refreshService.isRefreshTokenValid(username, refresh);
        if(!isExist){
            return "존재하지 않는 refresh 토큰 입니다";
        }

        // 5. access, refresh 토큰 재발급
        String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // white list 갱신
        accessService.deleteAccessToken(username);
        accessService.saveAccessToken(username, newAccess, 600000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefresh, 86400000L);

        response.setHeader("accessToken", newAccess);
        response.addCookie(createCookie(newRefresh));

        return "refresh 토큰 재발행 성공";
    }

    private Cookie createCookie(String value) {
        // 1. 쿠키 생성
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

}
