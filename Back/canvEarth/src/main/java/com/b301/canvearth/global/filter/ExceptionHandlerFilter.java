package com.b301.canvearth.global.filter;

import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.util.ResponseUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private final static String MESSAGE = "message";

    private final ResponseUtil responseUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) {

        try {
            filterChain.doFilter(request, response);
        } catch (CustomException e) {
            handleExceptionInternal(e, e.getErrorCode().getHttpStatus(), e.getErrorCode().getErrorMessage(), request, response);
        } catch (IllegalArgumentException e) {
            handleExceptionInternal(e, HttpStatus.BAD_REQUEST, e.getMessage(), request, response);
        } catch (AuthenticationException e) {
            handleExceptionInternal(e, HttpStatus.UNAUTHORIZED, "토큰 인증 실패", request, response);
        } catch (AccessDeniedException e) {
            handleExceptionInternal(e, HttpStatus.FORBIDDEN, "접근 거부", request, response);
        } catch (Exception e) {
            handleExceptionInternal(e, HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러", request, response);
        }
    }

    protected void handleExceptionInternal(Exception ex, HttpStatus httpStatus, String message, HttpServletRequest request, HttpServletResponse response) {
        log.info("======================= START SECURITY EXCEPTION INFO ==========================");

        if (response != null && response.isCommitted()) {
            if (log.isWarnEnabled()) {
                log.warn("Response already committed. Ignoring: " + ex);
            }

            return;
        }

        log.error("Exception name: [{}]", ex.toString());

        if (ex instanceof CustomException e) {
            log.error("Exception cause:  {}", e.getErrorCode().getErrorMessage());
            log.error("Exception status: {}", e.getErrorCode().getHttpStatus());
        } else {
            log.error("Exception cause:  {}", ex.getMessage());
            log.error("Exception status: {}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        log.error("Exception uri [{}]", request.getRequestURI());

        log.info("======================== END SECURITY EXCEPTION INFO ===========================");

        if (response != null) {

            Map<String, String> data = new HashMap<>();
            data.put(MESSAGE, message);

            responseUtil.sendMessage(response, data, httpStatus);
        }

    }

}

