package com.b301.canvearth.domain.banner.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class BannerListResponseGetDto {

    private String imagePath;
    private double coordinateX;
    private double coordinateY;
    private int order;

    @Builder
    public BannerListResponseGetDto(String imagePath, double coordinateX, double coordinateY, int order) {
        this.imagePath = imagePath;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.order = order;
    }
}
