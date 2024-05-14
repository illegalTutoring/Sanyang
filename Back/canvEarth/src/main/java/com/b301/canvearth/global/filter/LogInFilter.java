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

@Slf4j
public class LogInFilter extends UsernamePasswordAuthenticationFilter {

    private final static String MESSAGE = "message";

    private final static String USERNAME = "username";

    private final static String ROLE = "role";

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    private final ResponseUtil responseUtil;

    private final LogUtil logUtil;

    public LogInFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshService refreshService,
                       AccessService accessService, ResponseUtil responseUtil, LogUtil logUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
        this.accessService = accessService;
        this.responseUtil = responseUtil;
        this.logUtil = logUtil;
        super.setFilterProcessesUrl("/api/user/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        logUtil.serviceLogging("login");

        // 로그인 시도
        String id = obtainUsername(request);  // username => id
        String password = obtainPassword(request);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);

        // spring security 자동으로 검증
        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        logUtil.resultLogging("Login Success");

        // 로그인 성공
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String accessToken = jwtUtil.createJwt("access", username, role, 1800000L);
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        // white list 작성
        accessService.saveAccessToken(username, accessToken, 1800000L);
        refreshService.saveRefreshToken(username, refreshToken, 86400000L);

        // 토큰 발행
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.addCookie(responseUtil.createCookie("refreshToken", refreshToken));

        Map<String, String> data = new HashMap<>();
        data.put(MESSAGE, "로그인 성공");
        data.put(USERNAME, username);
        data.put(ROLE, role);

        responseUtil.sendMessage(response, data, HttpStatus.OK);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        logUtil.resultLogging("Login failed");

        throw new CustomException(ErrorCode.LOGIN_FAIL);
    }

}
