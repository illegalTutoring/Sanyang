package com.b301.canvearth.domain.banner.service;

import com.b301.canvearth.domain.admin.dto.BannerRequestPutDto;
import com.b301.canvearth.domain.banner.dto.BannerCoordinate;
import com.b301.canvearth.domain.banner.entity.Banner;
import com.b301.canvearth.domain.banner.repository.BannerRepository;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final S3Service s3Service;

    public List<Banner> findAllBanner(){
        log.info("======== START galleryService.findALlGallery ==============");
        return bannerRepository.findAll(Sort.by(Sort.Direction.DESC, "bannerId"));
    }


    @Transactional
    public String updateBanner(List<MultipartFile> image, BannerRequestPutDto info) {

        if(image.size() != info.getImageInfo().size()){
            throw new CustomException(ErrorCode.IMAGE_AND_INFO_SIZE_MISMATCH);
        }


        // 1. banner 테이블 내용 삭제
        bannerRepository.deleteAll();
        // 2. image 하나하나 삽입


        for (int i = 0; i < image.size(); i++) {

            // S3 업로드
            MultipartFile mf = image.get(i);
            UUID uuid = UUID.randomUUID();
            String path = s3Service.uploadImage(mf,uuid,"");

            // 좌표 얻기
            BannerCoordinate c = info.getImageInfo().get(i);
            Banner banner = Banner.builder().path(path).coordinateX(c.getX()).coordinateY(c.getY()).build();

            //저장
            bannerRepository.save(banner);

        }


        return "배너 변경 완료";
    }


}
