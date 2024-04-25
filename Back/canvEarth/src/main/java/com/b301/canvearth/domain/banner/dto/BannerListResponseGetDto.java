package com.b301.canvearth.domain.banner.dto;

import com.b301.canvearth.domain.banner.entity.Banner;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter @ToString
public class BannerListResponseGetDto {
    List<Banner> bannerList;

    @Builder
    public BannerListResponseGetDto(List<Banner> bannerList) {
        this.bannerList = bannerList;
    }
}
