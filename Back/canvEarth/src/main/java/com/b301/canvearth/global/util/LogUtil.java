package com.b301.canvearth.global.util;

import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/*
    LogUtil
        1. serviceLogging : 서비스의 시작을 알리는 로그
        2. resultLogging : 서비스의 결과를 알리는 로그
        3. exceptionLogging : 예외가 발생하면 로그와 예외를 던짐
 */
@Slf4j
@Component
public class LogUtil {

    public void serviceLogging(String msg) {
        log.info("===== Start {} =====", msg);
    }

    public void resultLogging(String msg) {
        log.info(" result : {}", msg);
    }

    public void exceptionLogging(ErrorCode errorCode, String msg) throws CustomException {
        resultLogging(msg);
        throw new CustomException(errorCode);
    }
}
