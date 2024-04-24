package com.b301.canvearth.domain.calendar.controller;

import com.b301.canvearth.domain.calendar.dto.CalendarResponseGetDto;
import com.b301.canvearth.domain.calendar.entity.Calendar;
import com.b301.canvearth.domain.calendar.service.CalendarService;
import com.b301.canvearth.domain.outsourcing.dto.OutsourcingResponseGetDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
@Tag(name = "calendar", description = "CALENDAR API")
@Slf4j
public class CalendarController {

    private static final String MESSAGE = "message";

    private final CalendarService calendarService;

    @Operation(summary = "REQ-CALENDAR-01", description = "월별 일정 목록 불러오기")
    @ApiResponse(responseCode = "200", description = "XXXX년 XX월 일정 목록입니다.")
    @ApiResponse(responseCode = "400", description = "BAD_REQUEST")
    @ApiResponse(responseCode = "500", description = "서버 에러!")
    @GetMapping("/{year}/{month}")
    public ResponseEntity<Object> getCalendar(@PathVariable("year") int year, @PathVariable("month") int month) {
        log.info("===== [CalendarController] getCalendar start =====");
        log.info("[requestData] year: {}, month: {}", year, month);

        Map<String, Object> responseBody = new HashMap<>();

        List<Calendar> list = calendarService.getCalendarList();
        List<CalendarResponseGetDto> responseList = new ArrayList<>();
        for(Calendar cal: list) {
            String[] calStartDate = cal.getStartDate().split("-"); // 2024-04-01
            String[] calEndDate = cal.getEndDate().split("-"); // 2024-12-30

            log.info("calStartDate: {}, calEndDate: {}", cal.getStartDate(), cal.getEndDate());
//            log.info("[year]calStartDate: {}, calEndDate: {}", Integer.parseInt(calStartDate[0]), Integer.parseInt(calEndDate[0]));
            if(Integer.parseInt(calStartDate[0]) <= year &&  year <= Integer.parseInt(calEndDate[0])) { // 년 비교
//                log.info("[month]calStartDate: {}, calEndDate: {}", Integer.parseInt(calStartDate[1]), Integer.parseInt(calEndDate[1]));
                if(Integer.parseInt(calStartDate[1]) <= month && month <= Integer.parseInt(calEndDate[1])) { // 월 비교
                    CalendarResponseGetDto dto = CalendarResponseGetDto.builder().calendarId(cal.getId())
                            .userId(cal.getUserId())
                            .title(cal.getTitle())
                            .startDate(cal.getStartDate())
                            .endDate(cal.getEndDate())
                            .build();
                    responseList.add(dto);
                }
            }
        }

        responseBody.put(MESSAGE, String.format("%s년 %s월 외주 목록입니다.", year, month));
        responseBody.put("data", responseList);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
