package com.b301.canvearth.domain.gallery.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@ToString
public class GalleryListResponseGetDto {
    private final Long galleryId;
    private final String userId;
    private final String title;
    private final Date uploadDate;
    private final String createDate;
    private final List<String> tags;
    private final String original;
    private final String thumbnail;


    @Builder

    public GalleryListResponseGetDto(Long galleryId, String userId, String title, Date uploadDate, String createDate,
                                     List<String> tags, String original, String thumbnail) {
        this.galleryId = galleryId;
        this.userId = userId;
        this.title = title;
        this.uploadDate = uploadDate;
        this.createDate = createDate;
        this.tags = tags;
        this.original = original;
        this.thumbnail = thumbnail;
    }
}
