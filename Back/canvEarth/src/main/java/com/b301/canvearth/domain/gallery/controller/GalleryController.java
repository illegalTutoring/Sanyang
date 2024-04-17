package com.b301.canvearth.domain.gallery.controller;

import com.b301.canvearth.domain.gallery.dto.ImageDetailResponseGetDto;
import com.b301.canvearth.domain.gallery.dto.ImageListResponseGetDto;
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
    private static String path = "C:/ssafy/canvEarth/image/";
    @Operation(summary = "REQ-GALLERY-01", description = "갤러리 목록")
    @GetMapping()
    public ResponseEntity<Object> getGalleryList(){
        Map<String, Object> responseBody = new HashMap<>();
        List<ImageListResponseGetDto> list = new ArrayList<>();
        list.add(ImageListResponseGetDto.builder().imageId(1).uploadDate("2024-04-12 12:12:12").createDate("2024").imagePath(path+"eunchan1.png").build());
        list.add(ImageListResponseGetDto.builder().imageId(2).uploadDate("2024-04-12 12:12:12").createDate("2023").imagePath(path+"eunchan2.png").build());
        list.add(ImageListResponseGetDto.builder().imageId(3).uploadDate("2024-04-12 12:12:12").createDate("2022").imagePath(path+"shisa.png").build());

        responseBody.put(MESSAGE, "갤러리 목록 불러오기 성공");
        responseBody.put("imageList", list);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<Object> getGalleryDetail(@PathVariable("imageId") int imageId){
        Map<String, Object> responseBody = new HashMap<>();

        List<String> tag = new ArrayList<>();
        tag.add("사람");
        tag.add("꼬마");
        tag.add("아따맘마");
        if(imageId == 1){
            responseBody.put(MESSAGE, "이미지 상세 정보");
            ImageDetailResponseGetDto dto = ImageDetailResponseGetDto.builder().imageId(imageId).galleryId(1)
                    .userId("canvEarth").imageName("은찬이엥영").imagePath(path+"eunchan1.png")
                    .uploadDate("2024-04-12 12:12:12").createDate("2024").tag(tag)
                    .thumbnailPath(path+"eunchan2.png").watermarkPath(path+"shisa.png").build();

            responseBody.put("imageDetail", dto);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }

        responseBody.put(MESSAGE,"잘못된 요청입니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }


    @GetMapping("/search/{tag}")
    public ResponseEntity<Object> getGalleryListByTag(@PathVariable("tag")String tag){
        Map<String, Object> responseBody = new HashMap<>();
        List<ImageListResponseGetDto> list = new ArrayList<>();

        if(tag.equals("강아지")){
            list.add(ImageListResponseGetDto.builder().imageId(1).uploadDate("2024-04-12 12:12:12").createDate("2024").imagePath(path+"eunchan1.png").build());
            list.add(ImageListResponseGetDto.builder().imageId(2).uploadDate("2024-04-12 12:12:12").createDate("2023").imagePath(path+"eunchan2.png").build());
            list.add(ImageListResponseGetDto.builder().imageId(3).uploadDate("2024-04-12 12:12:12").createDate("2022").imagePath(path+"shisa.png").build());

            responseBody.put(MESSAGE, tag+"태그 검색 결과");
            responseBody.put("imageList", list);

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }

        if(tag == null || tag.isEmpty()) {
            responseBody.put(MESSAGE, "태그를 입력하세요");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        responseBody.put(MESSAGE, tag+"태그 검색 결과");
        responseBody.put("imageList", list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
