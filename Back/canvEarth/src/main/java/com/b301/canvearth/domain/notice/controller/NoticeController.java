package com.b301.canvearth.domain.notice.controller;

import com.b301.canvearth.domain.notice.dto.NoticeDto;
import com.b301.canvearth.domain.notice.dto.NoticeTitleListResponseDto;
import com.b301.canvearth.domain.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
@Tag(name = "notice", description = "NOTICE API")
public class NoticeController {

    private final NoticeService noticeService;
    private static final String MESSAGE = "message";

    @GetMapping()
    @Operation(summary = "REQ-NOTICE-01", description = "공지사항 목록")
    @ApiResponse(responseCode = "200", description = "공지 목록 불러오기 성공")
    @ApiResponse(responseCode = "400", description = "Page index must not be less than zero")
    @ApiResponse(responseCode = "500", description = "서버에러")
    public ResponseEntity<Object> getNoticeList(@PageableDefault(page = 1, size = 10, sort="id", direction = Sort.Direction.DESC)Pageable pageable){
        log.info("===== [Notice Controller] getNoticeList START =====");

        log.info("[pageable.getPageNumber]: {} ",pageable.getPageNumber());
        log.info("[pageable.getPageSize]: {} ",pageable.getPageSize());

        Map<String, Object> responseBody = new HashMap<>();

        List<NoticeTitleListResponseDto> data = noticeService.getNoticeList(pageable);
        responseBody.put(MESSAGE, "공지 목록 불러오기 완료");
        responseBody.put("data", data);
        responseBody.put("page", noticeService.getTotalNotice(pageable.getPageSize()));

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/top")
    @Operation(summary = "REQ-NOTICE-02", description = "가장 최신의 공지사항 보기")
    @ApiResponse(responseCode = "200", description = "NoticeDto 전달")
    @ApiResponse(responseCode = "500", description = "서버에러")
    public ResponseEntity<Object> getRecentNotice(){
        log.info("===== [Notice Controller] getRecentNotice START =====");
        Map<String, Object> responseBody = new HashMap<>();

        NoticeDto data =  noticeService.getRecentNotice();
        responseBody.put("data", data);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/detail/{noticeId}")
    @Operation(summary = "REQ-NOTICE-03", description = "공지사항 상세보기")
    @ApiResponse(responseCode = "200", description = "NoticeDto 전달")
    @ApiResponse(responseCode = "500", description = "서버에러")
    public ResponseEntity<Object> getNotice(@PathVariable(name = "noticeId")Long noticeId){
        log.info("===== [Notice Controller] getNotice START =====");
        Map<String, Object> responseBody = new HashMap<>();

        NoticeDto data =  noticeService.getNotice(noticeId);
        responseBody.put("data", data);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/total")
    @Operation(summary = "REQ-NOTICE-04", description = "전체공지 수 보기")
    @ApiResponse(responseCode = "200", description = "공지 수 전달")
    @ApiResponse(responseCode = "500", description = "서버에러")
    public ResponseEntity<Object> getTotalNotice(){
        log.info("===== [Notice Controller] getTotalNotice START =====");
        Map<String, Object> responseBody = new HashMap<>();

        Long data =  noticeService.getTotalNoticeCount();
        responseBody.put("data", data);

        return ResponseEntity.ok(responseBody);

    }




}
