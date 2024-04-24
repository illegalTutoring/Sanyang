package com.b301.canvearth.domain.admin.controller;


import com.b301.canvearth.domain.admin.dto.WorkRequestPostDto;
import com.b301.canvearth.domain.work.entity.Work;
import com.b301.canvearth.domain.work.service.WorkService;
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
@RequestMapping("/api/admin/work")
@Tag(name = "admin work", description = "ADMIN WORK API")
@Slf4j
public class AdminWorkController {

    private static final String MESSAGE = "message";

    private final WorkService workService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> uploadFile(@RequestPart MultipartFile image,
                                             @RequestPart("data") WorkRequestPostDto requestPostDto){
        log.info("===== [AdminWorkController] uploadFile start =====");
        log.info("[requestImageName]: {}", image.getOriginalFilename());
        log.info("[requestData]: {}", requestPostDto);

        Map<String, Object> responseBody = new HashMap<>();

        String isValidWorkDto = requestPostDto.isValid();
        if(!isValidWorkDto.equals("valid")) {
            String errorMessage = String.format("입력한 값에 문제가 있습니다. [%s] 데이터를 확인해주세요.", isValidWorkDto);
            log.error(errorMessage);
            responseBody.put(MESSAGE, errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        Work insertWork = workService.insertWork(image, requestPostDto);
        if(insertWork == null) {
            log.error("insertWork 비어있음.");
            responseBody.put(MESSAGE, "외주 작품 등록을 실패하였습니다.");
            // TODO: exception 바꿔야 함
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }

        responseBody.put(MESSAGE, "외주 작품 등록을 완료하였습니다.");
        log.info("[responseData] {}", responseBody);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
