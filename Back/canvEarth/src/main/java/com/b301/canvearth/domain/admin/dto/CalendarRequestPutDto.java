package com.b301.canvearth.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CalendarRequestPutDto {

    private final String title;
    private final String startDate;
    private final String endDate;

    @Builder
    public CalendarRequestPutDto(String title, String startDate, String endDate) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
