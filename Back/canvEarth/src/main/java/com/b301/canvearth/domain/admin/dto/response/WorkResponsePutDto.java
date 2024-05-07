package com.b301.canvearth.domain.admin.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkResponsePutDto {

    private final String original;
    private final String thumbnail;

    @Builder
    public WorkResponsePutDto(String original, String thumbnail) {
        this.original = original;
        this.thumbnail = thumbnail;
    }
}
