package com.b301.canvearth.domain.work.service;

import com.b301.canvearth.domain.admin.dto.request.WorkRequestPostDto;
import com.b301.canvearth.domain.admin.dto.request.WorkRequestPutDto;
import com.b301.canvearth.domain.s3.service.S3Service;
import com.b301.canvearth.domain.work.entity.Work;
import com.b301.canvearth.domain.work.repository.WorkRepository;
import com.b301.canvearth.global.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkService {

    private final WorkRepository workRepository;
    private final S3Service s3Service;
    private final JWTUtil jwtUtil;

    public Work insertWork(MultipartFile image, WorkRequestPostDto requestPostDto, HttpServletRequest request) {
        log.info("===== [WorkService] insertWork start =====");

        Map<String, String> paths = s3Service.uploadS3AndGetPath(image);

        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        String username = jwtUtil.getUsername(accessToken);
        Work work = Work.builder().userId(username).company(requestPostDto.getCompany())
                .title(requestPostDto.getTitle()).startDate(requestPostDto.getStartDate())
                .endDate(requestPostDto.getEndDate()).tags(requestPostDto.getTags())
                .originalPath(paths.get("originalPath"))
                .thumbnailPath(paths.get("thumbnailPath"))
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
            paths = s3Service.uploadS3AndGetPath(image);
            changeImage = true;
        }

        Work changeWork = workRepository.findById(workId)
                .orElseThrow(() -> new IllegalArgumentException("해당 workId로 데이터를 찾을 수 없습니다. workId: " + workId));

        changeWork.setCompany(requestPutDto.getCompany());
        changeWork.setTitle(requestPutDto.getTitle());
        changeWork.setStartDate(requestPutDto.getStartDate());
        changeWork.setEndDate(requestPutDto.getEndDate());
        changeWork.setTags(requestPutDto.getTags());

        if(changeImage) {
            // 기존 S3 이미지는 삭제
            s3Service.deleteImage(changeWork.getOriginalPath());
            s3Service.deleteImage(changeWork.getThumbnailPath());

            changeWork.setOriginalPath(paths.get("originalPath"));
            changeWork.setThumbnailPath(paths.get("thumbnailPath"));
        }

        return workRepository.save(changeWork);
    }

    public void deleteWork(Long workId) {
        log.info("===== [WorkService] deleteWork start =====");
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new IllegalArgumentException("해당 workId로 데이터를 찾을 수 없습니다. workId: " + workId));

        // S3 이미지들 삭제
        s3Service.deleteImage(work.getOriginalPath());
        s3Service.deleteImage(work.getThumbnailPath());
        
        // DB에서 삭제
        workRepository.delete(work);
    }
}
