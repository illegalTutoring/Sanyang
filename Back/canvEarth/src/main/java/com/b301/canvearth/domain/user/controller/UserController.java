package com.b301.canvearth.domain.user.controller;

import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final static String MESSAGE = "message";

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> signIn(SignInDto signinDto) {

        String result = userService.signInProcess(signinDto);
        HttpStatus status;

        if(result.equals("회원가입 성공")){
            status = HttpStatus.CREATED;
        }else{
            status = HttpStatus.BAD_REQUEST;
        }

        Map<String, Object> data = new HashMap<>();
        data.put(MESSAGE, result);

        return ResponseEntity.status(status).body(data);
    }

    @PostMapping("/reissue")
    public ResponseEntity<Object> reIssue(HttpServletRequest request, HttpServletResponse response) {

        String result = userService.reIssueProcess(request, response);
        HttpStatus status;

        if(result.equals("refresh 토큰 재발행 성공")){
            status = HttpStatus.CREATED;
        }else{
            status = HttpStatus.BAD_REQUEST;
        }

        Map<String, Object> data = new HashMap<>();
        data.put(MESSAGE, result);

        return ResponseEntity.status(status).body(data);
    }

}
