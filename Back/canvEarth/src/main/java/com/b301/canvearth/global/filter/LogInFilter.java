package com.b301.canvearth.global.filter;

import com.b301.canvearth.domain.authorization.dto.CustomUserDetails;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
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

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

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

    public LogInFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshService refreshService, AccessService accessService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
        this.accessService = accessService;
        this.responseUtil = new ResponseUtil();
        super.setFilterProcessesUrl("/api/user/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        log.info("============================== START LOGIN FILTER ==============================");

        // 로그인 시도
        String username = obtainUsername(request);  // username => id
        String password = obtainPassword(request);

        log.info("[LOGIN INFO]");
        log.info("  id: " + username);
        log.info("  pw: " + password);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

        // spring security 자동으로 검증
        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        log.info("================================= SUCCESS LOGIN ================================");

        // 로그인 성공
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String accessToken = jwtUtil.createJwt("access", username, role, 1800000L);
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        log.info("[USER INFO]");
        log.info("  username : {}", username);
        log.info("  role : {}", role);
        log.info("[ISSUED JWT(ACCESS, REFRESH) INFO]");
        log.info("  accessToken: {}", accessToken);
        log.info("  refreshToken: {}", refreshToken);

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

        finishLogin();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        log.info("================================== FAIL LOGIN ===================================");
        finishLogin();

        throw new CustomException(ErrorCode.LOGIN_FAIL);
    }

    private void finishLogin() {
        log.info("================================= FINISH LOGIN ==================================");
    }
}
