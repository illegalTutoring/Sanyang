package com.b301.canvearth.domain.admin.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GalleryResponsePutDto {

    private final String original;
    private final String thumbnail;

    @Builder
    public GalleryResponsePutDto(String original, String thumbnail) {
        this.original = original;
        this.thumbnail = thumbnail;
    }
}
