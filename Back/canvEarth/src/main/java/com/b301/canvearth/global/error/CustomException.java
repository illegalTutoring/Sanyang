package com.b301.canvearth.global.error;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class CustomException extends RuntimeException{


    private final ErrorCode errorCode;

    public CustomException( ErrorCode errorCode){
        super("Custom Exception 발생 " + errorCode + ".");
        this.errorCode = errorCode;
    }

}
