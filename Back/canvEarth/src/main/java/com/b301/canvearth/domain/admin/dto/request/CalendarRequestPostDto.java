package com.b301.canvearth.domain.admin.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CalendarRequestPostDto {

    private final String userId;
    private final String title;
    private final String startDate;
    private final String endDate;

    @Builder
    public CalendarRequestPostDto(String userId, String title, String startDate, String endDate) {
        this.userId = userId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String isValid() {
        String isValid = "valid";

        if(userId == null || userId.isEmpty()) {
            isValid = "userId";
        } else if(title == null || title.isEmpty()) {
            isValid = "title";
        } else if(startDate == null || startDate.isEmpty()) {
            isValid = "startDate";
        } else if(endDate == null || endDate.isEmpty()) {
            isValid = "endDate";
        }
        return isValid;
    }
}
