package com.b301.canvearth.domain.user.controller;

import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.service.UserService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "user", description = "USER API")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final ResponseUtil responseUtil;

    @Operation(summary = "REQ-USER-03", description = "회원가입")
    @ApiResponse(responseCode = "201", description = "회원가입 성공")
    @ApiResponse(responseCode = "409", description = "중복된 ID 입니다")
    @ApiResponse(responseCode = "409", description = "중복된 닉네임 입니다")
    @PostMapping("/signin")
    public ResponseEntity<Object> signIn(SignInDto signinDto) throws CustomException {

        String message = userService.signInProcess(signinDto);

        return responseUtil.createResponseEntity(message, HttpStatus.CREATED);
    }

    @Operation(summary = "REQ-USER-06", description = "JWT 재발급")
    @ApiResponse(responseCode = "201", description = "refresh 토큰 재발행 성공")
    @ApiResponse(responseCode = "401", description = "refresh 토큰이 존재하지 않습니다")
    @ApiResponse(responseCode = "401", description = "만료된 refresh 토큰입니다")
    @ApiResponse(responseCode = "401", description = "잘못된 refresh 토큰입니다")
    @ApiResponse(responseCode = "401", description = "사용하지 않는 refresh 토큰입니다")
    @PostMapping("/reissue")
    public ResponseEntity<Object> reIssue(HttpServletRequest request, HttpServletResponse response) throws CustomException {

        String message = userService.reIssueProcess(request, response);

        return responseUtil.createResponseEntity(message, HttpStatus.CREATED);
    }

}

