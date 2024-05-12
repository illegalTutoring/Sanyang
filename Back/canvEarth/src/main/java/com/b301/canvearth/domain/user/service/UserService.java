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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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


    public String signInProcess(SignInDto signinDto) throws CustomException {

        log.info("============================ START SIGNIN SERVICE ==============================");

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

        log.info("============================= END SIGNIN SERVICE ===============================");

        return "회원가입 성공";
    }

    public String reIssueProcess(HttpServletRequest request, HttpServletResponse response) throws CustomException {

        log.info("============================ START REISSUE SERVICE =============================");

        // 1. Refresh Token 유효성 검사
        String refreshToken = jwtValidationUtil.isValidRefreshToken(request);

        String username = jwtUtil.getUsername(refreshToken);
        String role = jwtUtil.getRole(refreshToken);

        // 2. access, refresh 토큰 재발급
        String newAccessToken = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // 3. white list 갱신
        accessService.deleteAccessToken(username);
        accessService.saveAccessToken(username, newAccessToken, 600000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefreshToken, 86400000L);

        // 4. JWT Token 전달
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        response.addCookie(responseUtil.createCookie("refreshToken", newRefreshToken));

        log.info("============================= END REISSUE SERVICE ==============================");

        return "refresh 토큰 재발행 성공";
    }

}
