package com.b301.canvearth.domain.user.controller;

import com.b301.canvearth.domain.authorization.service.RefreshService;
import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.service.UserService;
import com.b301.canvearth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final JWTUtil jwtUtil;

    private final RefreshService refreshService;

    public UserController(UserService userService, JWTUtil jwtUtil, RefreshService refreshService) {

        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.refreshService = refreshService;
    }

    @PostMapping("/signin")
    public String signIn(SignInDto signinDto) {
        userService.signInProcess(signinDto);
        // return 처리 필요함
        return "ok";
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reIssue(HttpServletRequest request, HttpServletResponse response) {

        String refresh = null;

        Cookie[] cookies = request.getCookies();
        if(cookies != null) {

            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("refresh")) {

                    refresh = cookie.getValue();
                }
            }
        }

        if (refresh == null) {

            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        try {

            jwtUtil.isExpired(refresh);

        } catch (ExpiredJwtException e) {

            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            return new ResponseEntity<>("refresh token invalid", HttpStatus.BAD_REQUEST);
        }

        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        boolean isExist = refreshService.isRefreshTokenValid(username, refresh);

        if(!isExist){

            return new ResponseEntity<>("refresh token not exist", HttpStatus.BAD_REQUEST);
        }

        String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

        refreshService.deleteRefreshToken(username);
        refreshService.saveRefreshToken(username, newRefresh, 86400000L);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie(newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Cookie createCookie(String value) {

        Cookie cookie = new Cookie("refresh", value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

}
