package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.LogUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.*;

/*
    (Custom) LoginFilter
        1. extends UserPasswordAuthenticationFilter : 유저이름, 패스워드를 통해 사용자를 인증하는 필터
        2. @Override attemptAuthentication : form-data 로 들어온 username, password 를 파싱하는 로직을 통해 정보를 제공
           UsernamePasswordAuthenticationToken 과 authenticationManager 을 통해 로그인 로직을 실행
        3. @Override successfulAuthentication 로그인 성공 : JWT(ATK,RTK)발급
        4. @Override unsuccessfulAuthentication 로그인 실패 : 예외 발생
 */
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final static String MESSAGE = "message";

    private final static String USERNAME = "username";

    private final static String ROLE = "role";

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    private final ResponseUtil responseUtil;

    private final LogUtil logUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshService refreshService,
                       AccessService accessService, ResponseUtil responseUtil, LogUtil logUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
        this.accessService = accessService;
        this.responseUtil = responseUtil;
        this.logUtil = logUtil;
        super.setFilterProcessesUrl("/api/user/login");
    }

    // 로그인
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        logUtil.serviceLogging("login");

        // 로그인 시도
        String id = obtainUsername(request);  // username => id
        String password = obtainPassword(request);

        // 로그인을 위한 인증 토큰 생성
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);

        // spring security 자동으로 검증
        return authenticationManager.authenticate(authToken);
    }

    // 로그인 성공
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        logUtil.resultLogging("Login Success");

        // 로그인 성공 후 정보 조회를 위한 CustomUserDetails
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        // Username 가져오기
        String username = customUserDetails.getUsername();

        // Role 가져오기
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // ATK,RTK 토큰 생성
        String accessToken = jwtUtil.createJwt("access", username, role, 3600000L);
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // white list 작성
        accessService.saveAccessToken(username, accessToken, 3600000L);
        refreshService.saveRefreshToken(username, refreshToken, 86400000L);

        // 토큰 발행
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.addCookie(responseUtil.createCookie("refreshToken", refreshToken));

        // response data
        Map<String, String> data = new HashMap<>();
        data.put(MESSAGE, "로그인 성공");
        data.put(USERNAME, username);
        data.put(ROLE, role);

        responseUtil.sendMessage(response, data, HttpStatus.OK);
    }

    // 로그인 실패
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        logUtil.resultLogging("Login failed");

        // 로그인 실패 예외 발생
        throw new CustomException(ErrorCode.CHECK_YOUR_ID_AND_PASSWORD);
    }

}
