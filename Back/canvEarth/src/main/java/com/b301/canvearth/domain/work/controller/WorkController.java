package com.b301.canvearth.domain.work.controller;

import com.amazonaws.services.s3.model.ObjectTagging;
import com.b301.canvearth.domain.work.dto.WorkResponseGetDto;
import com.b301.canvearth.domain.work.entity.Work;
import com.b301.canvearth.domain.work.service.WorkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/work")
@Tag(name = "work", description = "WORK API")
@Slf4j
public class WorkController {

    private static final String MESSAGE = "message";

    private final WorkService workService;

    @GetMapping
    public ResponseEntity<Object> getWorkList() {
        log.info("===== [WorkController] getWorkList start =====");

        Map<String, Object> responseBody = new HashMap<>();

        List<Work> workList = workService.getWorkList();
        List<WorkResponseGetDto> responseList = new ArrayList<>();
        for(Work w: workList) {
            WorkResponseGetDto getWork = WorkResponseGetDto.builder().workId(w.getId()).userId(w.getUserId()).title(w.getTitle())
                    .company(w.getCompany()).startDate(w.getStartDate()).endDate(w.getEndDate())
                    .uploadDate(w.getUploadDate()).tags(w.getTags()).original(w.getOriginalPath())
                    .thumbnail(w.getThumbnailPath()).watermark(w.getWatermarkPath()).build();
            responseList.add(getWork);
        }

        responseBody.put(MESSAGE, "외주 작업 목록 불러오기 성공");
        responseBody.put("data", responseList);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
