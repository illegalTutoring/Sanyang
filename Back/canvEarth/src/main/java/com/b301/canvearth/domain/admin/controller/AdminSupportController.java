package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.GalleryResponsePutDto;
import com.b301.canvearth.domain.admin.dto.SupportRequestPostDto;
import com.b301.canvearth.domain.admin.dto.SupportRequestPutDto;
import com.b301.canvearth.domain.admin.dto.SupportResponsePutDto;
import com.b301.canvearth.domain.gallery.entity.Gallery;
import com.b301.canvearth.domain.support.entity.Support;
import com.b301.canvearth.domain.support.service.SupportService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/support")
@Tag(name = "admin support", description = "ADMIN SUPPORT API")
@Slf4j
public class AdminSupportController {

    private static final String MESSAGE = "message";

    private final SupportService supportService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> registSupport(@RequestPart MultipartFile image,
                                                @RequestPart("data") SupportRequestPostDto requestPostDto) {
        log.info("===== [AdminSupportController] registSupport start =====");
        log.info("[requestData]: {}", requestPostDto);

        Map<String, Object> responseBody = new HashMap<>();

        // image라는 form-data는 받았지만 빈 파일일 경우
        if(image.isEmpty()) {
            String errorMessage = "image가 비어있습니다.";
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }


        String isValidSupportDto = requestPostDto.isValid();
        if(!isValidSupportDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidSupportDto);
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        Support insertSupport = supportService.insertSupport(image, requestPostDto);
        if(insertSupport == null) {
            log.error("insertSupport 비어있음.");
            responseBody.put(MESSAGE, "후원 등록을 실패하였습니다.");
            // TODO: exception 바꿔야 함
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }

        responseBody.put(MESSAGE, "후원 등록을 완료하였습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @PutMapping("{supportId}")
    public ResponseEntity<Object> modifySupport(@PathVariable("supportId") Long supportId,
                                                @RequestPart(value = "image", required = false) MultipartFile image,
                                                @RequestPart("data") SupportRequestPutDto requestPutDto) {
        log.info("===== [AdminSupportController] modifySupport start =====");
        log.info("[path variable]: {}", supportId);
        log.info("[requestData]: {}", requestPutDto);

        Map<String, Object> responseBody = new HashMap<>();

        String isValidSupportDto = requestPutDto.isValid();
        if(!isValidSupportDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidSupportDto);
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        Support modifySupport = supportService.modifySupport(supportId, image, requestPutDto);

        SupportResponsePutDto responsePutDto = SupportResponsePutDto.builder()
                .thumbnail(modifySupport.getSupportThumbnail()).build();

        responseBody.put(MESSAGE, "후원 수정이 완료되었습니다.");
        responseBody.put("data", responsePutDto);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
