package com.b301.canvearth.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInDto {
    private String id;
    private String username;
    private String password;
}
