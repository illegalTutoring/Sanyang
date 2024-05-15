package com.b301.canvearth.domain.gallery.service;


import com.b301.canvearth.domain.admin.dto.request.GalleryRequestPostDto;
import com.b301.canvearth.domain.admin.dto.request.GalleryRequestPutDto;
import com.b301.canvearth.domain.gallery.dto.GalleryListResponseGetDto;
import com.b301.canvearth.domain.gallery.entity.Gallery;
import com.b301.canvearth.domain.gallery.repository.GalleryRepository;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.global.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final S3Service s3Service;
    private final JWTUtil jwtUtil;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<Gallery> getGalleryList(){
        log.info("======== Start galleryService.getGalleryList ==============");
        return galleryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public List<Gallery> getGalleryListByTags(String tagString) {
        log.info("===== [GalleryService] getGalleryListByTags start =====");

        log.info("tagString: {}", tagString);
        String[] tags = tagString.split(",");
        List<Gallery> galleries = galleryRepository.findByTagsContaining(tags);
        log.info("gallerys: {}", galleries);
        return galleries;
    }

    public List<GalleryListResponseGetDto> changeResponseGet(List<Gallery> galleryList) {
        log.info("===== [GalleryService] changeResponseGet start =====");

        List<GalleryListResponseGetDto> responseList = new ArrayList<>();
        for(Gallery g: galleryList) {
            GalleryListResponseGetDto getGallery = GalleryListResponseGetDto.builder()
                    .galleryId(g.getId()).userId(g.getUserId()).title(g.getTitle()).uploadDate(g.getUploadDate())
                    .createDate(g.getCreateDate()).tags(g.getTags()).original(g.getOriginalPath())
                    .thumbnail(g.getThumbnailPath())
                    .build();
            responseList.add(getGallery);
        }

        return responseList;
    }

    public Gallery insertGallery(MultipartFile image, GalleryRequestPostDto requestPostDto, HttpServletRequest request) {
        log.info("===== [GalleryService] insertGallery start =====");

        Map<String, String> paths = s3Service.uploadS3AndGetPath(image);

        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        String username = jwtUtil.getUsername(accessToken);
        Gallery gallery = Gallery.builder().userId(username).title(requestPostDto.getTitle())
                .createDate(requestPostDto.getCreateDate())
                .tags(requestPostDto.getTags())
                .originalPath(paths.get("originalPath"))
                .thumbnailPath(paths.get("thumbnailPath"))
                .build();

        Gallery insertGallery = galleryRepository.save(gallery);
        log.info("success insertGallery: {}", insertGallery);
        return insertGallery;
    }


    public Gallery modifyGallery(Long galleryId, MultipartFile image, GalleryRequestPutDto requestPutDto) {
        log.info("===== [GalleryService] modifyGallery start =====");

        // 이미지 변경
        // 이미지가 빈 경우 이미지는 수정하지 않음.
        // 이미지가 비지 않은 경우 받은 이미지로 S3에 이미지 변경 후 DB에도 반영
        boolean changeImage = false;
        Map<String, String> paths = new HashMap<>();
        if(image != null && !image.isEmpty()) {
            paths = s3Service.uploadS3AndGetPath(image);
            changeImage = true;
        }

        Gallery changeGallery = galleryRepository.findById(galleryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 galleryId로 데이터를 조회할 수 없습니다. galleryId: " + galleryId));

        changeGallery.setTitle(requestPutDto.getTitle());
        changeGallery.setCreateDate(requestPutDto.getCreateDate());
        changeGallery.setTags(requestPutDto.getTags());

        if(changeImage) {
            // 기존 S3 이미지는 삭제
            s3Service.deleteImage(changeGallery.getOriginalPath());
            s3Service.deleteImage(changeGallery.getThumbnailPath());

            changeGallery.setOriginalPath(paths.get("originalPath"));
            changeGallery.setThumbnailPath(paths.get("thumbnailPath"));
        }

        return galleryRepository.save(changeGallery);
    }

    public void deleteGallery(Long galleryId) {
        log.info("===== [GalleryService] deleteGallery start =====");
        Gallery gallery = galleryRepository.findById(galleryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 galleryId로 데이터를 조회할 수 없습니다. galleryId: " + galleryId));

        // S3 이미지들 삭제
        s3Service.deleteImage(gallery.getOriginalPath());
        s3Service.deleteImage(gallery.getThumbnailPath());

        // DB에서 삭제
        galleryRepository.delete(gallery);
    }


}
