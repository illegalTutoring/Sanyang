package com.b301.canvearth.global.config;

import com.b301.canvearth.global.handler.CustomAccessDeniedHandler;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.filter.CustomLogoutFilter;
import com.b301.canvearth.global.filter.ExceptionHandlerFilter;
import com.b301.canvearth.global.filter.JWTFilter;
import com.b301.canvearth.global.filter.LoginFilter;
import com.b301.canvearth.global.handler.JWTAuthenticationEntryPoint;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.JWTValidationUtil;
import com.b301.canvearth.global.util.LogUtil;
import com.b301.canvearth.global.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    // cors url
    @Value("${cors.allowedOrigins}")
    private String[] allowedOrigins;

    // ROLE_ADMIN 없이 API 테스트 용
    @Value("${security.permitTestList}")
    private String[] permitTestList;

    // ROLE_ADMIN 을 포함한 배포 용
    @Value("${security.permitAccessList}")
    private String[] permitAccessList;

    private final AuthenticationConfiguration authenticationConfiguration;

    private final JWTUtil jwtUtil;

    private final JWTValidationUtil jwtValidationUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

    private final ResponseUtil responseUtil;

    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    private final JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final LogUtil logUtil;

    // AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    // 비밀번호 인코더
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain 커스텀
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Spring security CORS 정책
        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(request -> {

                    CorsConfiguration configuration = new CorsConfiguration();

                    configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
                    configuration.setAllowedMethods(Collections.singletonList("*"));
                    configuration.setAllowCredentials(true);
                    configuration.setAllowedHeaders(Collections.singletonList("*"));
                    configuration.setMaxAge(3600L);

                    // ExposedHeaders
                    configuration.setExposedHeaders(Arrays.asList("Authorization", "Set-Cookie"));

                    return configuration;
                })));

        // CSRF 보호 비활성화
        http
                .csrf(AbstractHttpConfigurer::disable);

        // FormLogin 비활성화
        http
                .formLogin(AbstractHttpConfigurer::disable);

        // HttpBasic 비활성화
        http
                .httpBasic(AbstractHttpConfigurer::disable);

        http
                .authorizeHttpRequests((auth) -> auth

                        /*
                            로그인을 통한 토큰 발행 JWT(access, refresh)없이
                            API test 진행하고자할 때 사용!!!
                        */

                        // 1. 개발용 : ADMIN 권한 우회 URI 허용
//                        .requestMatchers(permitTestList).permitAll()

                        // 2. 배포용 : ADMIN 권한 확인
                        .requestMatchers(permitAccessList).permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .anyRequest().authenticated());

        // (Custom)LogInFilter at UsernamePasswordAuthenticationFilter : 커스텀 로그인 필터
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshService, accessService, responseUtil, logUtil),
                        UsernamePasswordAuthenticationFilter.class);

        // (Custom)JWTFilter Before (Custom)LogInFilter : 커스텀 JWT 검증 필터
        http
                .addFilterBefore(new JWTFilter(jwtUtil, jwtValidationUtil),
                        LoginFilter.class);

        // (Custom)CustomLogoutFilter At LogoutFilter : 커스텀 로그아웃 필터
        http
                .addFilterAt(new CustomLogoutFilter(jwtUtil, jwtValidationUtil, refreshService, accessService, responseUtil, logUtil),
                        LogoutFilter.class);

        // (Custom)ExceptionHandlerFilter Before (Custom)CustomLogoutFilter : 커스텀 예외 헨들러 필터
        http
                .addFilterBefore(new ExceptionHandlerFilter(responseUtil),
                        CustomLogoutFilter.class);

        // ExceptionHandler[AuthenticationEntryPoint, AccessDeniedHandler] : 예외 헨들러 커스텀
        http
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                                .accessDeniedHandler(customAccessDeniedHandler));

        // 세션 관리 정책 StateLess 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}