package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class OutsourcingResponseGetDto {

    private final int outsourcingId;
    private final String userId;
    private final String client;
    private final String title;
    private final String startDate;
    private final String endDate;

    @Builder
    public OutsourcingResponseGetDto(int outsourcingId, String userId, String client, String title, String startDate, String endDate) {
        this.outsourcingId = outsourcingId;
        this.userId = userId;
        this.client = client;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
