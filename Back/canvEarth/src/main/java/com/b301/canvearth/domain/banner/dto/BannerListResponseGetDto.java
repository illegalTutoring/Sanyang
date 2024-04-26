package com.b301.canvearth.domain.banner.dto;

import com.b301.canvearth.domain.banner.entity.Banner;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter @ToString
public class BannerListResponseGetDto {

    private Long bannerId;
    private String path;
    private double coordinateX;
    private double coordinateY;

    @Builder
    public BannerListResponseGetDto(Long bannerId, String path, double coordinateX, double coordinateY) {
        this.bannerId = bannerId;
        this.path = path;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }
}
