package com.b301.canvearth.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GalleryResponsePutDto {

    private final String original;
    private final String thumbnail;
    private final String watermark;

    @Builder
    public GalleryResponsePutDto(String original, String thumbnail, String watermark) {
        this.original = original;
        this.thumbnail = thumbnail;
        this.watermark = watermark;
    }
}
