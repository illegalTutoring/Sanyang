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
import com.b301.canvearth.global.util.ResponseUtil;
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

    private final JWTValidationUtil jwtValidationUtil;

    private final AccessService accessService;

    private final RefreshService refreshService;

    private final ResponseUtil responseUtil;


    public String signInProcess(SignInDto signinDto) throws CustomException {

        // 1. 파라미터 검증
        String id = signinDto.getId();
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();

        if(id == null || username == null || password == null) {
            throw new CustomException(ErrorCode.PARAMETER_IS_EMPTY);
        }

        // 2. Id 중복검사
        boolean isExist = userRepository.existsById(id);

        if(isExist){
            throw new CustomException(ErrorCode.ID_DUPLICATE);
        }

        // 3. UserName 중복검사
        isExist = userRepository.existsByUserName(username);

        if(isExist){
            throw new CustomException(ErrorCode.USERNAME_DUPLICATE);
        }

        // 4. 회원 등록
        User data = new User();
        data.setId(id);
        data.setUserName(username);
        data.setUserPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_USER");

        userRepository.save(data);

        return "회원가입 성공";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response) throws CustomException {

        // 1. Refresh Token 유효성 검사
        String refreshToken = jwtValidationUtil.isValidRefreshToken(request);

        String username = jwtUtil.getUsername(refreshToken);
        String role = jwtUtil.getRole(refreshToken);

        // 2. access, refresh 토큰 재발급
        String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // 3. white list 갱신
        accessService.deleteAccessToken(username);
        accessService.saveAccessToken(username, newAccess, 600000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefresh, 86400000L);

        // 4. JWT Token 전달
        response.setHeader("accessToken", newAccess);
        response.addCookie(responseUtil.createCookie("refreshToken", newRefresh));

        return "refresh 토큰 재발행 성공";
    }

}
