package com.b301.canvearth.domain.gallery.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ImageDetailResponseGetDto {
    int imageId;
    String userId;
    String imageName;
    String imagePath;
    String uploadDate;
    String createDate;
    List<String> tag;
    String thumbnailPath;
    String watermarkPath;


    @Builder
    public ImageDetailResponseGetDto(int imageId, String userId, String imageName, String imagePath, String uploadDate, String createDate, List<String> tag, String thumbnailPath, String watermarkPath) {
        this.imageId = imageId;
        this.userId = userId;
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.uploadDate = uploadDate;
        this.createDate = createDate;
        this.tag = tag;
        this.thumbnailPath = thumbnailPath;
        this.watermarkPath = watermarkPath;
    }
}
