package com.b301.canvearth.domain.support.controller;

import com.b301.canvearth.domain.support.dto.SupportResponseGetDto;
import com.b301.canvearth.domain.support.entity.Support;
import com.b301.canvearth.domain.support.service.SupportService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/api/support")
@Tag(name = "support", description = "SUPPORT API")
@Slf4j
public class SupportController {

    private static final String MESSAGE = "message";

    private final SupportService supportService;

    @Operation(summary = "REQ-SUPPORT-01", description = "후원 목록 보기")
    @GetMapping
    public ResponseEntity<Object> getSupportList() {
        log.info("===== [SupportController] getSupportList start =====");

        Map<String, Object> responseBody = new HashMap<>();

        List<Support> supportList = supportService.getSupportList();
        List<SupportResponseGetDto> responseList = new ArrayList<>();

        for(Support s: supportList) {
            SupportResponseGetDto getSupport = SupportResponseGetDto.builder()
                    .supportId(s.getId()).supportLink(s.getSupportLink())
                    .thumbnail(s.getSupportThumbnail())
                    .title(s.getTitle())
                    .uploadDate(s.getUploadDate())
                    .content(s.getContent())
                    .build();
            responseList.add(getSupport);
        }

        responseBody.put(MESSAGE, "후원 목록 불러오기 성공");
        responseBody.put("data", responseList);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
