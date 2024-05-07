package com.b301.canvearth.domain.admin.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class BannerRequestPutDto {

    private double coordinateX;
    private double coordinateY;


    public BannerRequestPutDto(double coordinateX, double coordinateY) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }


}
