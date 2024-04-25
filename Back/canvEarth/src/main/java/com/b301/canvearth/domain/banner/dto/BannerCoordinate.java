package com.b301.canvearth.domain.banner.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter @ToString
public class BannerCoordinate {
    private double x;
    private double y;


    public BannerCoordinate(double x, double y) {
        this.x = x;
        this.y = y;
    }
}
