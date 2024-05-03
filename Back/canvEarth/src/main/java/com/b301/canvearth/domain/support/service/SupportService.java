package com.b301.canvearth.domain.support.service;

import com.b301.canvearth.domain.admin.dto.SupportRequestPostDto;
import com.b301.canvearth.domain.admin.dto.SupportRequestPutDto;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.domain.support.entity.Support;
import com.b301.canvearth.domain.support.repository.SupportRepository;
import com.b301.canvearth.domain.work.entity.Work;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupportService {

    private final SupportRepository supportRepository;
    private final S3Service s3Service;

    public List<Support> getSupportList() {
        return supportRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Support insertSupport(MultipartFile image, SupportRequestPostDto requestPostDto) {
        log.info("===== [SupportService] insertSupport start =====");

        UUID uuid = UUID.randomUUID();
        String supportThumbnailPath = s3Service.uploadImage(image, uuid, "support");

        Support support = Support.builder().supportThumbnail(supportThumbnailPath).title(requestPostDto.getTitle())
                .supportLink(requestPostDto.getSupportLink())
                .content(requestPostDto.getContent())
                .build();

        Support insertSupport = supportRepository.save(support);
        log.info("success insertSupport: {}", insertSupport);
        return insertSupport;
    }

    public Support modifySupport(Long supportId, MultipartFile image, SupportRequestPutDto requestPutDto) {
        log.info("===== [SupportService] modifySupport start =====");

        boolean changeImage = false;
        String path = "";
        if(image != null && !image.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            path = s3Service.uploadImage(image, uuid, "support");
            changeImage = true;
        }

        Support changeSupport = supportRepository.findById(supportId)
                .orElseThrow(()-> new IllegalArgumentException("해당 supportId로 데이터를 찾을 수 없습니다. supportId: " + supportId));

        changeSupport.setTitle(requestPutDto.getTitle());
        changeSupport.setContent(requestPutDto.getContent());
        changeSupport.setSupportLink(requestPutDto.getSupportLink());

        if(changeImage) {
            s3Service.deleteImage(changeSupport.getSupportThumbnail());
            changeSupport.setSupportThumbnail(path);
        }

        return supportRepository.save(changeSupport);
    }

    public void deleteSupport(Long supportId) {
        log.info("===== [SupportService] deleteSupport start =====");

        Support support = supportRepository.findById(supportId)
                .orElseThrow(()->new IllegalArgumentException("해당 supportId로 데이터를 찾을 수 없습니다. supportId: " + supportId));

        s3Service.deleteImage(support.getSupportThumbnail());
        supportRepository.delete(support);
    }
}
