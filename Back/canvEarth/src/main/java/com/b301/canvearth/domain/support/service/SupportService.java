package com.b301.canvearth.domain.support.service;

import com.b301.canvearth.domain.admin.dto.SupportRequestPostDto;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.domain.support.entity.Support;
import com.b301.canvearth.domain.support.repository.SupportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupportService {

    private final SupportRepository supportRepository;
    private final S3Service s3Service;

    public Support insertSupport(MultipartFile image, SupportRequestPostDto requestPostDto) {
        log.info("===== [SupportService] insertSupport start =====");

        UUID uuid = UUID.randomUUID();
        String supportThumbnailPath = s3Service.uploadImage(image, uuid, "support");

//        SupportLinkList supportLink = requestPostDto.getSupportLink();

        Support support = Support.builder().supportThumbnail(supportThumbnailPath).title(requestPostDto.getTitle())
                .supportLink(requestPostDto.getSupportLink())
                .content(requestPostDto.getContent())
                .build();

        Support insertSupport = supportRepository.save(support);
        log.info("success insertSupport: {}", insertSupport);
        return insertSupport;
    }
}
