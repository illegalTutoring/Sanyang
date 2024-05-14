package com.b301.canvearth.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class LogUtil {

    public void serviceLogging(String msg) {
        log.debug("===== Start {} =====", msg);
    }

    public void resultLogging(String msg) {
        log.debug(" result : {}", msg);
    }
}
