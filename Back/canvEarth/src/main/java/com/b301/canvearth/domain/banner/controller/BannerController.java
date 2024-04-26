package com.b301.canvearth.domain.banner.controller;


import com.b301.canvearth.domain.banner.dto.BannerListResponseGetDto;
import com.b301.canvearth.domain.banner.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "banner", description = "배너 API")
@RequestMapping("/api/banner")
public class BannerController {

    private final BannerService bannerService;
    private final static String MESSAGE = "message";

    @Operation(summary = "REQ-BANNER-01", description = "배너 이미지 보기")
    @GetMapping()
    public ResponseEntity<Object> getBanner(){

        log.info("===== [BannerController] getBanner START =====");

        List<BannerListResponseGetDto> data = bannerService.findAllBanner();

        log.info("banner list: {}", data);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put(MESSAGE, "배너 목록 전달 완료");
        responseBody.put("data", data);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
