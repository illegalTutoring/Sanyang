package com.b301.canvearth.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInDto {
    private String id;
    private String userName;
    private String userPassword;
    private String role;
}
