package com.b301.canvearth.domain.user.service;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    private final ResponseUtil responseUtil;


    public String signInProcess(SignInDto signinDto) throws CustomException {

        // 1. 회원중복 조회
        String id = signinDto.getId();
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();

        // 1-1. Id 중복검사
        boolean isExist = userRepository.existsById(id);

        if(isExist){
            throw new CustomException(ErrorCode.ID_DUPLICATE);
        }

        // 1-2. UserName 중복검사
        isExist = userRepository.existsByUserName(username);

        if(isExist){
            throw new CustomException(ErrorCode.USERNAME_DUPLICATE);
        }

        // 회원 등록
        User data = new User();
        data.setId(id);
        data.setUserName(username);
        data.setUserPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_USER");

        userRepository.save(data);

        return "회원가입 성공";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response) throws CustomException {

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
        String role = jwtUtil.getRole(refreshToken);
        boolean isVaild = refreshService.isRefreshTokenValid(username, refreshToken);
        if(!isVaild){
            throw new CustomException(ErrorCode.UNUSED_REFRESH_TOKEN);
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
        response.addCookie(responseUtil.createCookie("refreshToken", newRefresh));

        return "refresh 토큰 재발행 성공";
    }

}
