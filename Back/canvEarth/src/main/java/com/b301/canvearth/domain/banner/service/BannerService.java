package com.b301.canvearth.domain.banner.service;

import com.b301.canvearth.domain.banner.entity.Banner;
import com.b301.canvearth.domain.banner.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public List<Banner> findAllBanner(){
        log.info("======== START galleryService.findALlGallery ==============");
        return bannerRepository.findAll(Sort.by(Sort.Direction.DESC, "bannerId"));
    }


}
