package com.b301.canvearth.domain.work.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.b301.canvearth.domain.admin.dto.WorkRequestPostDto;
import com.b301.canvearth.domain.admin.dto.WorkRequestPutDto;
import com.b301.canvearth.domain.calendar.entity.Calendar;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.domain.work.entity.Work;
import com.b301.canvearth.domain.work.repository.WorkRepository;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkService {

    private final WorkRepository workRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public Work insertWork(MultipartFile image, WorkRequestPostDto requestPostDto) {
        log.info("===== [WorkService] insertWork start =====");

        Map<String, String> paths = uploadS3AndGetPath(image);

        Work work = Work.builder().userId(requestPostDto.getUserId()).company(requestPostDto.getCompany())
                .title(requestPostDto.getTitle()).startDate(requestPostDto.getStartDate())
                .endDate(requestPostDto.getEndDate()).tags(requestPostDto.getTags())
                .originalPath(paths.get("originalPath"))
                .thumbnailPath(paths.get("thumbnailPath"))
                .watermarkPath(paths.get("watermarkPath"))
                .build();

        // DB에 저장
        Work insertWork = workRepository.save(work);
        log.info("success insertWork: {}", insertWork);
        return insertWork;
    }

    public List<Work> getWorkList() {
        return workRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Work modifyWork(Long workId, MultipartFile image, WorkRequestPutDto requestPutDto) {
        log.info("===== [WorkService] modifyWork start =====");

        // 이미지 변경
        // 이미지가 빈 경우 이미지는 수정하지 않음.
        // 이미지가 비지 않은 경우 받은 이미지로 S3에 이미지 변경 후 DB에도 반영
        boolean changeImage = false;
        Map<String, String> paths = new HashMap<>();
        if(image != null && !image.isEmpty()) {
            paths = uploadS3AndGetPath(image);
            changeImage = true;
        }

        Work changeWork = workRepository.findById(workId)
                .orElseThrow(() -> new IllegalArgumentException("Work not found with id: " + workId));

        changeWork.setCompany(requestPutDto.getCompany());
        changeWork.setTitle(requestPutDto.getTitle());
        changeWork.setStartDate(requestPutDto.getStartDate());
        changeWork.setEndDate(requestPutDto.getEndDate());
        changeWork.setTags(requestPutDto.getTags());

        if(changeImage) {
            changeWork.setOriginalPath(paths.get("originalPath"));
            changeWork.setThumbnailPath(paths.get("thumbnailPath"));
            changeWork.setWatermarkPath(paths.get("watermarkPath"));
        }

        return workRepository.save(changeWork);
    }

    public void deleteWork(Long workId) {
        log.info("===== [WorkService] deleteWork start =====");
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new IllegalArgumentException("Work not found with id: " + workId));

        workRepository.delete(work);
    }

    public Map<String, String> uploadS3AndGetPath(MultipartFile image) {
        log.info("===== [WorkService] uploadS3AndGetPath start =====");
        Map<String, String> paths = new HashMap<>();
        UUID uuid = UUID.randomUUID();
        // originalPath
        String originalPath = s3Service.uploadImage(image, uuid, "original");
        paths.put("originalPath", originalPath);

        // TODO: 썸네일, 워터마크 해줘야함.
        // thumbnailPath
        String thumbnailPath = s3Service.uploadImage(image, uuid, "thumbnail");
        paths.put("thumbnailPath", thumbnailPath);

        // watermarkPath
        String watermarkPath = s3Service.uploadImage(image, uuid, "watermark");
        paths.put("watermarkPath", watermarkPath);

        return paths;
    }
}