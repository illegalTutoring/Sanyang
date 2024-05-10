package com.b301.canvearth.domain.gallery.controller;

import com.b301.canvearth.domain.gallery.dto.GalleryListResponseGetDto;
import com.b301.canvearth.domain.gallery.entity.Gallery;
import com.b301.canvearth.domain.gallery.service.GalleryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "gallery", description = "갤러리 API")
@RequestMapping("/api/gallery")
public class GalleryController {

    private static final String MESSAGE = "message";

    private final GalleryService galleryService;

    @Operation(summary = "REQ-GALLERY-01", description = "갤러리 목록 조회")
    @GetMapping()
    public ResponseEntity<Object> getGalleryList(){
        log.info("===== [GalleryController] getGalleryList start =====");

        Map<String, Object> responseBody = new HashMap<>();

        List<Gallery> galleryList = galleryService.getGalleryList();
        List<GalleryListResponseGetDto> responseList = galleryService.changeResponseGet(galleryList);

        responseBody.put(MESSAGE, "갤러리 목록 불러오기 성공");
        responseBody.put("data", responseList);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "REQ-GALLERY-01", description = "갤러리 목록 조회(태그)")
    @GetMapping("/{tagString}")
    public ResponseEntity<Object> getGalleryListByTag(@PathVariable("tagString") String tagString) {
        log.info("===== [GalleryController] getGalleryListByTag start =====");

        Map<String, Object> responseBody = new HashMap<>();

        List<Gallery> galleryList = galleryService.getGalleryListByTags(tagString);
        List<GalleryListResponseGetDto> responseList = galleryService.changeResponseGet(galleryList);

        responseBody.put(MESSAGE, "갤러리 태그 검색 목록 불러오기 성공");
        responseBody.put("data", responseList);
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
