package com.b301.canvearth.domain.work.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.b301.canvearth.domain.admin.dto.WorkRequestPostDto;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.domain.work.entity.Work;
import com.b301.canvearth.domain.work.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkService {

    private final WorkRepository workRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public Work insertWork(MultipartFile image, WorkRequestPostDto requestPostDto) {
        log.info("===== [WorkService] s3Insert start =====");

        UUID uuid = UUID.randomUUID();
        // originalPath
        String originalPath = s3Service.uploadImage(image, uuid, "original");

        // thumbnailPath
        String thumbnailPath = s3Service.uploadImage(image, uuid, "thumbnail");

        // watermarkPath
        String watermarkPath = s3Service.uploadImage(image, uuid, "watermark");

        if(originalPath == null) {
            log.error("originalPath가 비어있습니다.");
            return null;
            // exception 던지기
        }

        // TODO: 썸네일, 워터마크 해줘야함.
        Work work = Work.builder().userId(requestPostDto.getUserId()).company(requestPostDto.getCompany())
                .title(requestPostDto.getTitle()).startDate(requestPostDto.getStartDate())
                .endDate(requestPostDto.getEndDate()).tags(requestPostDto.getTags())
                .originalPath(originalPath).thumbnailPath(thumbnailPath).watermarkPath(watermarkPath)
                .build();

        // DB에 저장
        Work insertWork = workRepository.save(work);
        log.info("success insertWork: {}", insertWork);
        return insertWork;
    }

    public List<Work> getWorkList() {
        return workRepository.findAll();
    }
}
