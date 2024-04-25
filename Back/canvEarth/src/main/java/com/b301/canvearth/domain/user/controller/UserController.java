package com.b301.canvearth.domain.user.controller;

import com.b301.canvearth.domain.user.dto.SignInDto;
import com.b301.canvearth.domain.user.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signin")
    public String join(SignInDto signinDto) {
        System.out.println(signinDto);
        userService.signInProcess(signinDto);
        return "ok";
    }

    @GetMapping("/test")
    public String testP(){
        return "test";
    }

    @PostMapping("/test")
    public String testP2(){
        return "test2";
    }


}
