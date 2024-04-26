package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.BannerRequestPutDto;
import com.b301.canvearth.domain.banner.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "admin banner", description = "ADMIN BANNER API")
@RequestMapping("/api/admin/banner")
public class AdminBannerController {

    private final BannerService bannerService;

    private final static String MESSAGE = "message";



    @Operation(summary = "REQ-ADMIN-03", description = "배너 이미지 변경")
    @PutMapping()
    public ResponseEntity<Object> modifyBannerList(@RequestPart(value = "images")List<MultipartFile> images, @RequestPart(value = "infos")  List<BannerRequestPutDto> infos){
        log.info("===== [AdminBannerController] modifyBannerList START =====");
        log.info("[images]: {}", images);
        log.info("[infos] : {}", infos);

        Map<String, Object> responseBody = new HashMap<>();

        String message = bannerService.updateBanner(images, infos);

        responseBody.put(MESSAGE, message);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
