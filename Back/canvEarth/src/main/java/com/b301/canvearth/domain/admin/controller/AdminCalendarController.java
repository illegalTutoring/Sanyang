package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.request.CalendarRequestPostDto;
import com.b301.canvearth.domain.admin.dto.request.CalendarRequestPutDto;
import com.b301.canvearth.domain.calendar.entity.Calendar;
import com.b301.canvearth.domain.calendar.service.CalendarService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    private String errorMessage;

    @PostMapping
    public ResponseEntity<Object> registCalendar(@RequestBody CalendarRequestPostDto requestPostDto) {
        log.info("===== [AdminCalendarController] registCalendar start =====");
        log.info("[requestData]: {}", requestPostDto);

        Map<String, Object> responseBody = new HashMap<>();

        String isValidCalendarDto = requestPostDto.isValid();
        if(!isValidCalendarDto.equals("valid")) {
            errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidCalendarDto);
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        Calendar calendar = Calendar.builder().userId(requestPostDto.getUserId()).title(requestPostDto.getTitle())
                .startDate(requestPostDto.getStartDate()).endDate(requestPostDto.getEndDate()).build();

        Calendar insertCalendar = calendarService.insertCalendar(calendar);
        log.info("success insert: {}", insertCalendar);

        responseBody.put(MESSAGE, "일정 등록이 완료되었습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @PutMapping("/{calendarId}")
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
