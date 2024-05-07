package com.b301.canvearth.domain.admin.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class WorkRequestPutDto {

    private final String company;
    private final String title;
    private final String startDate;
    private final String endDate;
    private final List<String> tags;

    @Builder
    public WorkRequestPutDto(String company, String title, String startDate, String endDate, List<String> tags) {
        this.company = company;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tags = tags;
    }

    public String isValid() {
        String isValid = "valid";

        if(company == null || company.isEmpty()) {
            isValid = "company";
        } else if(title == null || title.isEmpty()) {
            isValid = "title";
        } else if(startDate == null || startDate.isEmpty()) {
            isValid = "startDate";
        } else if(endDate == null || endDate.isEmpty()) {
            isValid = "endDate";
        } else if(tags == null || tags.isEmpty()) {
            isValid = "tags";
        }
        return isValid;
    }
}
