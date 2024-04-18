package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class OutsourcingSearchResponseGetDto {

    private int outsourcingId;
    private String userId;
    private String client;
    private String title;
    private String startDate;
    private String endDate;

    @Builder
    public OutsourcingSearchResponseGetDto(int outsourcingId, String userId, String client, String title, String startDate, String endDate) {
        this.outsourcingId = outsourcingId;
        this.userId = userId;
        this.client = client;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
