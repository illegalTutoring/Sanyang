package com.b301.canvearth.global.filter;

import com.b301.canvearth.global.error.CustomException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{
            filterChain.doFilter(request, response);
        }catch(CustomException e){
            handleExceptionInternal(e, e.getErrorCode().getHttpStatus(), e.getErrorCode().getErrorMessage(), request, response);
        }catch(IllegalArgumentException e){
            handleExceptionInternal(e, HttpStatus.BAD_REQUEST, e.getMessage(), request, response);
        }catch(Exception e){
            handleExceptionInternal(e, HttpStatus.INTERNAL_SERVER_ERROR,"서버에러", request, response);
        }
    }

    protected void handleExceptionInternal(Exception ex, HttpStatus httpStatus, String message, HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.info("=========================== START EXCEPTION INFO ===============================");


        if (response != null && response.isCommitted()) {
            if (log.isWarnEnabled()) {
                log.warn("Response already committed. Ignoring: " + ex);
            }

            return;
        }

        if (httpStatus.equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
            request.setAttribute("jakarta.servlet.error.exception", ex);
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

        log.info("================================================================================");

        if(response != null){
            Map<String, String> data = new HashMap<>();
            data.put("message", message);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=utf-8");

            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(data));
            response.setStatus(httpStatus.value());

        }

    }

}

