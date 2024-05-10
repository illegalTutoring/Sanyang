package com.b301.canvearth.global.config;

import com.b301.canvearth.global.handler.CustomAccessDeniedHandler;
import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.filter.CustomLogoutFilter;
import com.b301.canvearth.global.filter.ExceptionHandlerFilter;
import com.b301.canvearth.global.filter.JWTFilter;
import com.b301.canvearth.global.filter.LogInFilter;
import com.b301.canvearth.global.handler.JWTAuthenticationEntryPoint;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.util.JWTValidationUtil;
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

    @Value("${cors.allowedOrigins}")
    private String[] allowedOrigins;

    @Value("${security.permitTestList}")
    private String[] permitTestList;

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

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

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

                    configuration.setExposedHeaders(Arrays.asList("accessToken", "Set-Cookie"));

                    return configuration;
                })));

        // CSRF Disable
        http
                .csrf(AbstractHttpConfigurer::disable);

        // FormLogin Disable
        http
                .formLogin(AbstractHttpConfigurer::disable);

        // HttpBasic Disable
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

        http
                .addFilterAt(new LogInFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshService, accessService),
                        UsernamePasswordAuthenticationFilter.class);
        http
                .addFilterBefore(new JWTFilter(jwtUtil, jwtValidationUtil, accessService),
                        LogInFilter.class);

        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, jwtValidationUtil, refreshService, accessService, responseUtil),
                        LogoutFilter.class);

        http
                .addFilterBefore(new ExceptionHandlerFilter(responseUtil),
                        CustomLogoutFilter.class);

        http
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                                .accessDeniedHandler(customAccessDeniedHandler));

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}