package com.b301.canvearth.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SupportResponsePutDto {

    private final String thumbnail;

    @Builder
    public SupportResponsePutDto(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
