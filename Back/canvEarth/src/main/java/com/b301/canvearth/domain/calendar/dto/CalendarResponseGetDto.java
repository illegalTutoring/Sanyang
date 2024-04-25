package com.b301.canvearth.domain.calendar.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CalendarResponseGetDto {
    private final long calendarId;
    private final String userId;
    private final String title;
    private final String startDate;
    private final String endDate;

    @Builder
    public CalendarResponseGetDto(long calendarId, String userId, String title,
                                  String startDate, String endDate) {
        this.calendarId = calendarId;
        this.userId = userId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
