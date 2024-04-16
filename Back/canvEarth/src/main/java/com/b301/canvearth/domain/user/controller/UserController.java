package com.b301.canvearth.domain.user.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/test")
    public String testP(){
        return "test";
    }

    @PostMapping("/test")
    public String testP2(){
        return "test2";
    }
}
