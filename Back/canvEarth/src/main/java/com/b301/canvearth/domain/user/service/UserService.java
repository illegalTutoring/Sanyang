package com.b301.canvearth.domain.user.service;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.JWTValidationUtil;
import com.b301.canvearth.global.util.LogUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


/*
    UserService
        1. 회원가입 Service
        2. AccessToken 재발급(RefreshToken) Service
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JWTUtil jwtUtil;

    private final JWTValidationUtil jwtValidationUtil;

    private final AccessService accessService;

    private final RefreshService refreshService;

    private final ResponseUtil responseUtil;

    private final LogUtil logUtil;


    public String signInProcess(SignInDto signinDto) throws CustomException {

        logUtil.serviceLogging("sign in");

        // 1. 파라미터 검증
        String id = signinDto.getId();
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();

        if(id == null || username == null || password == null) {
            logUtil.exceptionLogging(ErrorCode.PARAMETER_IS_EMPTY, "Sign in failed");
        }

        // 2. Id 중복검사
        boolean isExist = false;

        if(id != null) {
            isExist = userRepository.existsById(id);
        }

        if(isExist){
            logUtil.exceptionLogging(ErrorCode.ID_DUPLICATE, "Sign in failed");
        }

        // 3. UserName 중복검사
        isExist = userRepository.existsByUserName(username);

        if(isExist){
            logUtil.exceptionLogging(ErrorCode.USERNAME_DUPLICATE, "Sign in failed");
        }

        // 4. 회원 등록
        User data = new User();
        data.setId(id);
        data.setUserName(username);
        data.setUserPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_USER");

        userRepository.save(data);

        logUtil.resultLogging("Sign in success");

        return "회원가입 성공";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response) throws CustomException {

        // 1. Refresh Token 유효성 검사
        String refreshToken = jwtValidationUtil.isValidRefreshToken(request);

        logUtil.serviceLogging("reIssue");

        String username = jwtUtil.getUsername(refreshToken);
        String role = jwtUtil.getRole(refreshToken);

        // 2. access, refresh 토큰 재발급
        String newAccessToken = jwtUtil.createJwt("access", username, role, 3600000L);
        String newRefreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // 3. white list 갱신
        accessService.deleteAccessToken(username);
        accessService.saveAccessToken(username, newAccessToken, 3600000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefreshToken, 86400000L);

        // 4. JWT Token 전달
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        response.addCookie(responseUtil.createCookie("refreshToken", newRefreshToken));

        logUtil.resultLogging("ReIssue success");

        return "refresh 토큰 재발행 성공";
    }

}
