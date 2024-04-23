package com.b301.canvearth.domain.calendar.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@ToString
public class CalendarResponseGetDto {
    private final int calendarId;
    private final String userId;
    private final String title;
    private final String company;
    private final String startDate;
    private final String endDate;
    private final Date uploadDate;
    private final List<String> tag;
    private final String originalPath;
    private final String thumbnailPath;
    private final String watermarkPath;

    @Builder
    public CalendarResponseGetDto(int calendarId, String userId, String title,
                                  String company, String startDate, String endDate, Date uploadDate,
                                  List<String> tag, String originalPath, String thumbnailPath, String watermarkPath) {
        this.calendarId = calendarId;
        this.userId = userId;
        this.title = title;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
        this.uploadDate = uploadDate;
        this.tag = tag;
        this.originalPath = originalPath;
        this.thumbnailPath = thumbnailPath;
        this.watermarkPath = watermarkPath;
    }
}
