package com.b301.canvearth.global.util;

import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

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
