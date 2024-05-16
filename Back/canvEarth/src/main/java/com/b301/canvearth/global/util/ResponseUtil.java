package com.b301.canvearth.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class ResponseUtil {

    private final static String MESSAGE = "message";

    private final static String USERNAME = "username";

    private final static String ROLE = "role";

    public ResponseEntity<Object> createResponseEntity(String message, HttpStatus httpStatus){
        Map<String, Object> data = new HashMap<>();
        data.put(MESSAGE, message);

        return ResponseEntity.status(httpStatus).body(data);
    }

    public void sendMessage(HttpServletResponse response, Map<String, String>data, HttpStatus httpStatus) {
        data.put(MESSAGE, data.get(MESSAGE));

        if(data.containsKey(USERNAME)){
            data.put(USERNAME, data.get(USERNAME));
            data.put(ROLE, data.get(ROLE));
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=utf-8");

        ObjectMapper objectMapper = new ObjectMapper();
        try{
            response.getWriter().write(objectMapper.writeValueAsString(data));
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        response.setStatus(httpStatus.value());
    }

    public Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath("/");
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

        return cookie;
    }

    public Cookie deleteCookie(String key) {
        Cookie cookie = new Cookie(key, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        return cookie;
    }
}
