package com.b301.canvearth.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // Membership Management
    PARAMETER_IS_EMPTY(HttpStatus.BAD_REQUEST, "파라미터가 비어있습니다"),
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED,"로그인 실패"),
    ID_DUPLICATE(HttpStatus.CONFLICT,"중복된 ID 입니다"),
    USERNAME_DUPLICATE(HttpStatus.CONFLICT,"중복된 이름 입니다"),

    // JWT(Access Token)
    ACCESS_TOKEN_HAS_EXPIRED(HttpStatus.UNAUTHORIZED,"만료된 access 토큰 입니다"),
    INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED,"잘못된 access 토큰 입니다"),
    UNUSED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED,"사용하지 않는 access 토큰입니다"),

    // JWT(Refresh Token)
    REFRESH_TOKEN_DOES_NOT_EXIST(HttpStatus.UNAUTHORIZED,"refresh 토큰이 존재하지 않습니다"),
    REFRESH_TOKEN_HAS_EXPIRED(HttpStatus.UNAUTHORIZED,"만료된 refresh 토큰 입니다"),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED,"잘못된 refresh 토큰 입니다"),
    UNUSED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED,"사용하지 않는 refresh 토큰입니다"),

    CHECK_THE_YEAR_OR_MONTH(HttpStatus.BAD_REQUEST, "년, 월을 확인해주세요."),
    NO_TITLE(HttpStatus.BAD_REQUEST, "제목이 없습니다."),
    NO_CONTENT(HttpStatus.BAD_REQUEST, "내용이 없습니다."),
    NO_YEAR(HttpStatus.BAD_REQUEST, "연도가 없습니다."),
    NO_IMAGE(HttpStatus.BAD_REQUEST, "이미지가 없습니다."),
    UNSUPPORTED_IMAGE_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "지원하지 않는 파일 형식입니다."),
    TOO_LARGE_CAPACITY(HttpStatus.PAYLOAD_TOO_LARGE, "이미지 용량이 너무 큽니다."),
    SIZE_IS_NOT_CORRECT(HttpStatus.BAD_REQUEST, "이미지 크기가 맞지 않습니다."),
    IMAGE_AND_INFO_SIZE_MISMATCH(HttpStatus.BAD_REQUEST, "배너이미지와 좌표 정보 길이가 일치하지 않습니다."),
    INVALID_LINK_FORMAT(HttpStatus.BAD_REQUEST, "옳지 않은 URL 형식 입니다."),
    INVALID_LINK_TYPE(HttpStatus.BAD_REQUEST, "옳지 않은 Link 타입입니다."),
    NO_POST(HttpStatus.NOT_FOUND, "게시물을 찾을 수 없습니다."),
    NO_S3_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "S3 접근 권한이 없습니다."),
    NO_REQUIRE_ARUGUMENT(HttpStatus.BAD_REQUEST);

    private final HttpStatus httpStatus;
    private String errorMessage;

    ErrorCode(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    ErrorCode(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public void updateErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
