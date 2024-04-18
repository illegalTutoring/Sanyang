package com.b301.canvearth.domain.gallery.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ImageListResponseGetDto {
    int imageId;
    String uploadDate;
    String createDate;
    String imagePath;

    @Builder
    public ImageListResponseGetDto(int imageId, String uploadDate, String createDate, String imagePath) {
        this.imageId = imageId;
        this.uploadDate = uploadDate;
        this.createDate = createDate;
        this.imagePath = imagePath;
    }

}
