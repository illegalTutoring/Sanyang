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
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final S3Service s3Service;

    public List<Banner> findAllBanner(){
        log.info("===== [BannerService] findALlBanner START =====");
        return bannerRepository.findAll(Sort.by(Sort.Direction.DESC, "bannerId"));
    }


    @Transactional
    public String updateBanner(List<MultipartFile> images, BannerRequestPutDto infos) {
        log.info("===== [BannerService] updateBanner START =====");

        // null 검사
        if(images.isEmpty() || infos.getImageInfo() == null){
            bannerRepository.deleteAll();
            return "배너 변경 완료";
        }

        // 개수 불일치
        if(images.size() != infos.getImageInfo().size()){
            throw new CustomException(ErrorCode.IMAGE_AND_INFO_SIZE_MISMATCH);
        }

        //확장자 검사
        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = images.get(i);

            if(!(Objects.equals(StringUtils.getFilenameExtension(image.getOriginalFilename()),"png")
                    || Objects.equals(StringUtils.getFilenameExtension(image.getOriginalFilename()),"jpg")
                    || Objects.equals(StringUtils.getFilenameExtension(image.getOriginalFilename()),"jpeg"))){
                throw new CustomException(ErrorCode.UNSUPPORTED_IMAGE_TYPE);
            }
        }



        // 1. banner 테이블 내용 삭제
        bannerRepository.deleteAll();


        // 2. image 하나하나 삽입
        for (int i = 0; i < images.size(); i++) {

            // S3 업로드
            MultipartFile mf = images.get(i);
            UUID uuid = UUID.randomUUID();
            String path = s3Service.uploadImage(mf,uuid,"");

            // 좌표 얻기
            BannerCoordinate c = infos.getImageInfo().get(i);
            Banner banner = Banner.builder().path(path).coordinateX(c.getCoordinateX()).coordinateY(c.getCoordinateY()).build();

            //저장
            bannerRepository.save(banner);

        }

        return "배너 변경 완료";
    }


}
