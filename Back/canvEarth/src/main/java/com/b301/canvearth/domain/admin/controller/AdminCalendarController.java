package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.request.CalendarRequestPostDto;
import com.b301.canvearth.domain.admin.dto.request.CalendarRequestPutDto;
import com.b301.canvearth.domain.calendar.entity.Calendar;
import com.b301.canvearth.domain.calendar.service.CalendarService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/calendar")
@Tag(name = "admin calendar", description = "ADMIN CALENDAR API")
@Slf4j
public class AdminCalendarController {

    private final CalendarService calendarService;
    private static final String MESSAGE = "message";
    private final JWTUtil jwtUtil;

    @PostMapping
    @Operation(summary = "REQ-ADMIN-07", description = "일정 등록")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> registCalendar(@RequestBody CalendarRequestPostDto requestPostDto, HttpServletRequest request) {
        log.info("===== [AdminCalendarController] registCalendar start =====");
        log.info("[requestData]: {}", requestPostDto);

        Map<String, Object> responseBody = new HashMap<>();

        String isValidCalendarDto = requestPostDto.isValid();
        if(!isValidCalendarDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidCalendarDto);
            log.error(errorMessage);
            throw new CustomException(ErrorCode.NO_REQUIRE_ARUGUMENT, errorMessage);
        }

        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        String username = jwtUtil.getUsername(accessToken);
        Calendar calendar = Calendar.builder().userId(username).title(requestPostDto.getTitle())
                .startDate(requestPostDto.getStartDate()).endDate(requestPostDto.getEndDate()).build();

        Calendar insertCalendar = calendarService.insertCalendar(calendar);
        log.info("success insert: {}", insertCalendar);

        responseBody.put(MESSAGE, "일정 등록이 완료되었습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @PutMapping("/{calendarId}")
    @Operation(summary = "REQ-ADMIN-07", description = "일정 수정")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> modifyCalendar(@PathVariable("calendarId") Long calendarId,
                                                 @RequestBody CalendarRequestPutDto requestPutDto) {
        log.info("===== [AdminCalendarController] modifyCalendar start =====");
        log.info("[path variable]: {}", calendarId);
        log.info("[requestData]: {}", requestPutDto);

        Map<String, Object> responseBody = new HashMap<>();

        calendarService.modifyCalendar(calendarId, requestPutDto);

        responseBody.put(MESSAGE, "일정 수정이 완료되었습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @DeleteMapping("/{calendarId}")
    @Operation(summary = "REQ-ADMIN-07", description = "일정 삭제")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> deleteCalendar(@PathVariable("calendarId") Long calendarId) {
        log.info("===== [AdminCalendarController] deleteCalendar start =====");
        log.info("[path variable]: {}", calendarId);

        Map<String, Object> responseBody = new HashMap<>();

        calendarService.deleteCalendar(calendarId);

        responseBody.put(MESSAGE, "일정 삭제가 완료되었습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }
}
