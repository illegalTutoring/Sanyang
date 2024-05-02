package com.b301.canvearth.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    CHECK_THE_ID_OR_PASS(HttpStatus.BAD_REQUEST,"ID나 비밀번호를 확인해주세요."),
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
    INVALID_LINK_TYPE(HttpStatus.BAD_REQUEST, "옳지 않은 Link 타입입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    ErrorCode(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }
}
