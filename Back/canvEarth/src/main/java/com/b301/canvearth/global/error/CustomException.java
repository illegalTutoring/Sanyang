package com.b301.canvearth.global.error;


import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{


    private final ErrorCode errorCode;

    public CustomException( ErrorCode errorCode){
        super("Custom Exception 발생 " + errorCode + ".");
        this.errorCode = errorCode;
    }

    public CustomException(ErrorCode erroCode, String errorMessage) {
        super("Custom Exception 발생 " + erroCode + ".");
        this.errorCode = erroCode;
        this.errorCode.updateErrorMessage(errorMessage);
    }

}
