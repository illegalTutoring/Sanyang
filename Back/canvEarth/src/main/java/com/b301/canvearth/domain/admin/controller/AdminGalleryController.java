package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.request.GalleryRequestPostDto;
import com.b301.canvearth.domain.admin.dto.request.GalleryRequestPutDto;
import com.b301.canvearth.domain.admin.dto.response.GalleryResponsePutDto;
import com.b301.canvearth.domain.gallery.entity.Gallery;
import com.b301.canvearth.domain.gallery.service.GalleryService;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/api/admin/gallery")
@Tag(name = "admin gallery", description = "ADMIN GALLERY API")
@Slf4j
public class AdminGalleryController {

    private static final String MESSAGE = "message";

    private final GalleryService galleryService;

    @Operation(summary = "REQ-ADMIN-02", description = "갤러리 등록")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> registGallery(@RequestPart MultipartFile image,
                                                @RequestPart("data") GalleryRequestPostDto requestPostDto,
                                                HttpServletRequest request){
        log.info("===== [AdminGalleryController] registGallery start =====");
        log.info("[requestImageName]: {}", image.getOriginalFilename());
        log.info("[requestData]: {}", requestPostDto);

        Map<String, Object> responseBody = new HashMap<>();

        // image라는 form-data는 받았지만 빈 파일일 경우
        if(image.isEmpty()) {
            String errorMessage = "image가 비어있습니다.";
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        String isValidGalleryDto = requestPostDto.isValid();
        if(!isValidGalleryDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidGalleryDto);
            log.error(errorMessage);
            throw new CustomException(ErrorCode.NO_REQUIRE_ARGUMENT, errorMessage);
        }

        Gallery insertGallery =  galleryService.insertGallery(image, requestPostDto, request);
        log.info("insertGallery: {}", insertGallery);

        responseBody.put(MESSAGE, "갤러리 등록을 완료하였습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "REQ-ADMIN-02", description = "갤러리 삭제")
    @DeleteMapping("/{galleryId}")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> deleteGallery(@PathVariable("galleryId") Long galleryId) {
        log.info("===== [AdminGalleryController] deleteGallery start =====");
        log.info("[path variable]: {}", galleryId);

        Map<String, Object> responseBody = new HashMap<>();

        galleryService.deleteGallery(galleryId);

        responseBody.put(MESSAGE, "갤러리 삭제가 완료되었습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

    @Operation(summary = "REQ-ADMIN-02", description = "갤러리 수정")
    @PutMapping("/{galleryId}")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> modifyGallery(@PathVariable("galleryId") Long galleryId,
                                                @RequestPart(value="image", required = false) MultipartFile image,
                                                @RequestPart("data") GalleryRequestPutDto requestPutDto) {
        log.info("===== [AdminGalleryController] modifyGallery start =====");
        log.info("[path variable]: {}", galleryId);
        log.info("[requestData]: {}", requestPutDto);

        Map<String, Object> responseBody = new HashMap<>();

        String isValidGalleryDto = requestPutDto.isValid();
        if(!isValidGalleryDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidGalleryDto);
            log.error(errorMessage);
            throw new CustomException(ErrorCode.NO_REQUIRE_ARGUMENT, errorMessage);
        }

        Gallery modifyGallery = galleryService.modifyGallery(galleryId, image, requestPutDto);

        GalleryResponsePutDto responsePutDto = GalleryResponsePutDto.builder()
                .original(modifyGallery.getOriginalPath())
                .thumbnail(modifyGallery.getThumbnailPath())
                .build();

        responseBody.put(MESSAGE, "갤러리 수정이 완료되었습니다.");
        responseBody.put("data", responsePutDto);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
