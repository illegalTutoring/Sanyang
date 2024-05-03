package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.NoticeRequestPostDto;
import com.b301.canvearth.domain.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/notice")
@Tag(name = "admin notice", description = "ADMIN NOTICE API")
public class AdminNoticeController {

    private final NoticeService noticeService;
    private static final String MESSAGE = "message";


    @PostMapping()
    @Operation(summary = "REQ-ADMIN-05", description = "공지사항 등록")
    @ApiResponse(responseCode = "200", description = "공지 업로드 완료")
    @ApiResponse(responseCode = "400" ,description = "제목이 없습니다.")
    @ApiResponse(responseCode = "400" ,description = "내용이 없습니다.")
    @ApiResponse(responseCode = "500" ,description = "서버에러")
    public ResponseEntity<Object> registNotice(@RequestBody NoticeRequestPostDto data, HttpServletRequest request){
        log.info("===== [AdminNoticeController] registNotice START =====");
        log.info("[data]: {}", data);

        Map<String, Object> responseBody = new HashMap<>();
        String result = noticeService.InsertNotice(data, request);

        responseBody.put(MESSAGE, result);
        log.info("===== [AdminNoticeController] registNotice END =====");
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @PutMapping("/{noticeId}")
    @Operation(summary = "REQ-ADMIN-05", description = "공지사항 수정")
    @ApiResponse(responseCode = "200", description = "공지 수정 완료")
    @ApiResponse(responseCode = "400" ,description = "제목이 없습니다.")
    @ApiResponse(responseCode = "400" ,description = "내용이 없습니다.")
    @ApiResponse(responseCode = "404", description = "게시물을 찾을 수 없습니다.")
    @ApiResponse(responseCode = "500" ,description = "서버에러")
    public ResponseEntity<Object> modifyNotice(@PathVariable(name = "noticeId")long noticeId, @RequestBody NoticeRequestPostDto data){

        log.info("===== [AdminNoticeController] modifyNotice START =====");
        log.info("noticeId: {}", noticeId);
        log.info("data: {}", data);

        Map<String, Object> responseBody = new HashMap<>();
        String result = noticeService.updateNotice(noticeId,data);
        responseBody.put(MESSAGE, result);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @DeleteMapping("/{noticeId}")
    @Operation(summary = "REQ-ADMIN-05", description = "공지사항 삭제")
    @ApiResponse(responseCode = "200", description = "공지 삭제 완료")
    @ApiResponse(responseCode = "404", description = "게시물을 찾을 수 없습니다.")
    @ApiResponse(responseCode = "500" ,description = "서버에러")
    public ResponseEntity<Object> deleteNotice(@PathVariable(name = "noticeId")Long noticeId){
        log.info("===== [AdminNoticeController] deleteNotice START =====");
        log.info("noticeId: {}", noticeId);

        Map<String, Object> responseBody = new HashMap<>();
        String result = noticeService.deleteNotice(noticeId);
        responseBody.put(MESSAGE, result);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);

    }

}
