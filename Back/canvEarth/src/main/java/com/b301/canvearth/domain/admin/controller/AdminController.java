package com.b301.canvearth.domain.admin.controller;


import com.b301.canvearth.domain.admin.dto.NoticeRequestPostDto;
import com.b301.canvearth.domain.admin.entity.News;
import com.b301.canvearth.global.util.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@Tag(name="admin", description = "관리자 API")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Validated
public class AdminController {

    private static final String MESSAGE = "message";

    @Operation(summary = "REQ-ADMIN-05", description = "공지사항 등록")
    @ApiResponse(responseCode = "200", description = "공지 업로드 완료")
    @ApiResponse(responseCode = "400", description = "제목이 없습니다")
    @ApiResponse(responseCode = "400", description = "내용이 없습니다")
    @ApiResponse(responseCode = "400", description = "카테고리를 고르세요")
    @PostMapping("/notice")
    public ResponseEntity<Object> insertNotice(@RequestBody NoticeRequestPostDto noticeInfo){

        Map<String, Object> responseBody = new HashMap<>();

        if( noticeInfo.getTitle() == null || noticeInfo.getTitle().isEmpty()){
            responseBody.put(MESSAGE, "제목이 없습니다.");
            return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
        }

        if( noticeInfo.getContent() == null || noticeInfo.getContent().isEmpty()){
            responseBody.put(MESSAGE, "내용이 없습니다.");
            return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
        }

        if( !(noticeInfo.getType() == News.NOTICE || noticeInfo.getType() == News.UPDATE)){
            responseBody.put(MESSAGE, "카테고리를 고르세요");
            return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
        }



        responseBody.put(MESSAGE, "공지 업로드 완료");
        return ResponseEntity.status(Message.RESPONSE_COMPLETED.getHttpCode()).body(responseBody);
    }

@Operation(summary = "REQ-ADMIN-05", description = " 공지사항 수정")
@ApiResponse(responseCode = "200", description = "공지 수정 완료")
@ApiResponse(responseCode = "400", description = "공지가 없습니다")
@ApiResponse(responseCode = "400", description = "제목이 없습니다")
@ApiResponse(responseCode = "400", description = "내용이 없습니다")
@ApiResponse(responseCode = "400", description = "카테고리를 고르세요")
@PutMapping("/notice/{noticeId}")
public ResponseEntity<Object> modifyNotice( @PathVariable("noticeId") int noticeId, NoticeRequestPostDto noticeInfo){

    Map<String, Object> responseBody = new HashMap<>();

    if(noticeId == 0){
        responseBody.put(MESSAGE, "공지가 없습니다");
        return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
    }

    if( noticeInfo.getTitle() == null || noticeInfo.getTitle().isEmpty()){
        responseBody.put(MESSAGE, "제목이 없습니다.");
        return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
    }

    if( noticeInfo.getContent() == null || noticeInfo.getContent().isEmpty()){
        responseBody.put(MESSAGE, "내용이 없습니다.");
        return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
    }

    if( !(noticeInfo.getType() == News.NOTICE || noticeInfo.getType() == News.UPDATE)){
        responseBody.put(MESSAGE, "카테고리를 고르세요");
        return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
    }



    responseBody.put(MESSAGE, "공지 수정 완료");
    return ResponseEntity.status(Message.RESPONSE_COMPLETED.getHttpCode()).body(responseBody);
}


@Operation(summary = "REQ-ADMIN-05", description = "공지 삭제")
@ApiResponse(responseCode = "200", description = "공지 삭제 완료")
@ApiResponse(responseCode = "400", description = "해당 글이 없습니다")
@DeleteMapping("/notice/{noticeId}")
public ResponseEntity<Object> deleteNotice(@PathVariable("noticeId") int noticeId){
        Map<String, Object> responseBody = new HashMap<>();

        if(noticeId == 0 ){
            responseBody.put(MESSAGE,"해당 글이 없습니다.");
            return ResponseEntity.status(Message.BAD_REQUEST.getHttpCode()).body(responseBody);
        }

        responseBody.put(MESSAGE, "공지 삭제 완료");
        return ResponseEntity.status(Message.RESPONSE_COMPLETED.getHttpCode()).body(responseBody);

}



}
