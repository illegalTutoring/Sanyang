package com.b301.canvearth.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

/*
    회원가입 DTO
        1. id
        2. username
        3. password
 */
@Getter
@Setter
public class SignInDto {
    private String id;
    private String username;
    private String password;
}
