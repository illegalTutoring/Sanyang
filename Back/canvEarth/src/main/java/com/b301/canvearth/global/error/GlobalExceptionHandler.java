package com.b301.canvearth.global.error;

import com.amazonaws.AmazonServiceException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(CustomException e, WebRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        ErrorResponse errorResponse = ErrorResponse.builder().message(errorCode.getErrorMessage()).build();
        return handleExceptionInternal(e, errorResponse, errorCode.getHttpStatus(), request);
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ResponseEntity<Object> handleArgumentException(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.builder().message(ex.getMessage()).build();
        return handleExceptionInternal(ex, errorResponse, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {AmazonServiceException.class})
    public ResponseEntity<Object> handleAmazonException(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.builder().message(ex.getMessage()).build();
        return handleExceptionInternal(ex, errorResponse, HttpStatus.UNAUTHORIZED, request);
    }


    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleOtherException(Exception ex, WebRequest request) {

        ErrorResponse errorResponse = ErrorResponse.builder().message("서버에러").build();
        return handleExceptionInternal(ex, errorResponse, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }


    @Nullable
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable Object body, HttpStatus httpStatus, WebRequest request) {
        log.info("=========================== START EXCEPTION INFO ===============================");

        if (request instanceof ServletWebRequest servletWebRequest) {
            HttpServletResponse response = servletWebRequest.getResponse();
            if (response != null && response.isCommitted()) {
                if (log.isWarnEnabled()) {
                    log.warn("Response already committed. Ignoring: " + ex);
                }

                return null;
            }
        }

        if (httpStatus.equals(HttpStatus.INTERNAL_SERVER_ERROR) && body == null) {
            request.setAttribute("jakarta.servlet.error.exception", ex, 0);
        }

        log.error("Exception name: [{}]", ex.toString());

        if (ex instanceof CustomException e) {
            log.error("Exception cause:  {}", e.getErrorCode().getErrorMessage());
            log.error("Exception status: {}", e.getErrorCode().getHttpStatus());

        } else {
            log.error("Exception cause:  {}", ex.getMessage());
            log.error("Exception status: {}", HttpStatus.INTERNAL_SERVER_ERROR);

        }
        log.error("Exception uri [{}]", request.getDescription(false));

        log.info("================================================================================");

        return this.createResponseEntity(body, httpStatus);
    }

    protected ResponseEntity<Object> createResponseEntity(@Nullable Object body, HttpStatus httpStatus) {
        return ResponseEntity.status(httpStatus).body(body);
    }

}
