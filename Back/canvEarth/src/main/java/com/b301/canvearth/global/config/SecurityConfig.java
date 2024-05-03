package com.b301.canvearth.global.config;

import com.b301.canvearth.domain.authorization.service.AccessService;
import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.global.filter.JWTFilter;
import com.b301.canvearth.global.util.JWTUtil;
import com.b301.canvearth.global.filter.LogInFilter;
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

    private final AuthenticationConfiguration authenticationConfiguration;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    private final AccessService accessService;

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

                    configuration.setExposedHeaders(Arrays.asList("accessToken", "Set-Cookie", "set-cookie"));

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
                        // Swagger
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/swagger-resources/**"
                        ).permitAll()
                        // Spring Security
                        .requestMatchers("/",
                                /*
                                    로그인을 통한 토큰 발행 JWT(access, refresh)없이
                                    API test 진행하고자할 때 사용!!!
                                    1. 개발용 : ADMIN 권한 우회 URI 허용
                                */
                                //"/api/admin/**",

                                "/api/user/**",
                                "/api/calendar/**",
                                "/api/work",
                                "/api/gallery",
                                "/api/notice/**",
                                "/api/banner",
                                "/api/embed",
                                "/api/support"
                        ).permitAll()
                        // 2. 배포용 : ADMIN 권한 확인
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated());

        http
                .addFilterBefore(new JWTFilter(jwtUtil, accessService), LogInFilter.class);

        http
                .addFilterAt(new LogInFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshService, accessService),
                        UsernamePasswordAuthenticationFilter.class);

        http
                .addFilterBefore(new com.b301.canvearth.global.filter.LogoutFilter(jwtUtil, refreshService, accessService), LogoutFilter.class);

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}