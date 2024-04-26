package com.b301.canvearth.global.error;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.net.URI;

@Getter
@ToString
public class ErrorResponse {

    private String message;


    @Builder
    public ErrorResponse(String message) {

        this.message = message;

    }
}
