package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.request.BannerRequestPutDto;
import com.b301.canvearth.domain.banner.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/banner")
@Tag(name = "admin banner", description = "ADMIN BANNER API")
public class AdminBannerController {

    private final BannerService bannerService;

    private final static String MESSAGE = "message";


    @PutMapping()
    @Operation(summary = "REQ-ADMIN-03", description = "배너 이미지 변경")
    @ApiResponse(responseCode = "200", description = "배너 변경 완료")
    @ApiResponse(responseCode = "400" ,description = "파일이 없습니다.")
    @ApiResponse(responseCode = "400" ,description = "용량이 너무 큽니다.")
    @ApiResponse(responseCode = "415" ,description = "지원하지 않는 파일 형식입니다")
    @ApiResponse(responseCode = "500" ,description = "서버에러")
    public ResponseEntity<Object> modifyBannerList(@RequestPart(value = "images", required = false)List<MultipartFile> images, @RequestPart(value = "infos", required = false)  List<BannerRequestPutDto> infos){
        log.info("===== [AdminBannerController] modifyBannerList START =====");
        log.info("[images]: {}", images);
        log.info("[infos] : {}", infos);

        Map<String, Object> responseBody = new HashMap<>();

        String message = bannerService.updateBanner(images, infos);

        responseBody.put(MESSAGE, message);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
