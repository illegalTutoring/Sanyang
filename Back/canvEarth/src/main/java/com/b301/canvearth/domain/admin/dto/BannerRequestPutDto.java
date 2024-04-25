package com.b301.canvearth.domain.admin.dto;

import com.b301.canvearth.domain.banner.dto.BannerCoordinate;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter @ToString
public class BannerRequestPutDto {

    List<BannerCoordinate> imageInfo;


}
