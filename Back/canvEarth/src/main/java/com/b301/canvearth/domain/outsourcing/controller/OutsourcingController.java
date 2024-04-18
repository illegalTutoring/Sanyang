package com.b301.canvearth.domain.outsourcing.controller;

import com.b301.canvearth.domain.outsourcing.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/outsourcing")
@Tag(name = "outsourcing", description = "OUTSOURCING API")
@Slf4j
public class OutsourcingController {
    private static final String MESSAGE = "message";

    @Operation(summary = "REQ-OUTSOURCING-01", description = "월별 외주 목록 불러오기")
    @ApiResponse(responseCode = "200", description = "XXXX년 XX월 외주 목록입니다.")
    @ApiResponse(responseCode = "400", description = "BAD_REQUEST")
    @ApiResponse(responseCode = "500", description = "서버 에러!")
    @GetMapping("/{year}/{month}")
    public ResponseEntity<Object> getOutsourcingList(@PathVariable("year") int year, @PathVariable("month") int month) {
        log.info("===== [OutsourcingController] getOutsourcingList start");

        Map<String, Object> responseBody = new HashMap<>();

        log.info("[input] year: {}, month: {}", year, month);
        List<OutsourcingResponseGetDto> list = new ArrayList<>();
        for(int i=0; i<50; i++) {
            int randYear = (int) (Math.random() * (3)) + 2022;
            int randMonth = (int) (Math.random() * (12)) + 1;
            int randEndMonth = Math.min(randMonth + (int) (Math.random() * (12)), 12);


            //log.info("[rand] randYear: {}, randMonth: {}, randEndMonth: {}", randYear, randMonth, randEndMonth);
//            if(year.equals(String.valueOf(randYear)) &&
//                    (month.equals(String.format("%02d", randMonth)) || month.equals(String.format("%02d", randEndMonth)))) {
            if(year == randYear && (month == randMonth || month == randEndMonth)) {
                OutsourcingResponseGetDto dto = OutsourcingResponseGetDto.builder().outsourcingId(i+1).userId("sanyang")
                        .client("d&f")
                        .title("외주 작업" + (i+1))
                        .startDate(String.format("%d-%02d-01", randYear, randMonth))
                        .endDate(String.format("%d-%02d-30", randYear, randEndMonth))
                        .build();
                list.add(dto);
            }
        }

        log.info("outsourcingInfo: {}", list);
        responseBody.put(MESSAGE, String.format("%s년 %s월 외주 목록입니다.", year, month));
        responseBody.put("outsourcingInfo", list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "REQ-OUTSOURCING-02", description = "외주 비밀번호 입력")
    @ApiResponse(responseCode = "200", description = "외주 비밀번호 일치")
    @ApiResponse(responseCode = "400", description = "잘못된 비밀번호 입니다. 비밀번호는 관리자에게 문의해주세요")
    @ApiResponse(responseCode = "500", description = "서버 에러!")
    @PostMapping("/{outsourcingId}")
    public ResponseEntity<Object> insertOutsourcingPassword(@PathVariable("outsourcingId") int outsourcingId,
                                                            @RequestBody OutsourcingRequestPostDto receiveData) {
        log.info("===== [OutsourcingController] insertOutsourcingPassword start");

        Map<String, Object> responseBody = new HashMap<>();

        // 암호화 되어있다면 복호화 진행

        // outsourcingPassword 검사
        if(ObjectUtils.isEmpty(receiveData.getOutsourcingPassword())) {
            String errMsg = "oustsourcingPassword가 비어있습니다.";
            log.error(errMsg);
            responseBody.put(MESSAGE, errMsg);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        // DB 조회 후 일치 검사

        if(!receiveData.getOutsourcingPassword().equals("ABC123DEF456GHI7")) {
            String errMsg = "잘못된 비밀번호 입니다. 비밀번호는 관리자에게 문의해주세요";
            log.error(errMsg);
            responseBody.put(MESSAGE, errMsg);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        OutsourcingImageInfoDto imageInfoDto = OutsourcingImageInfoDto.builder()
                .imagePath("어딘가의 있을 S3 내의 이미지 경로..").build();

        List<OutsourcingImageInfoDto> list = new ArrayList<>();
        list.add(imageInfoDto);
        list.add(imageInfoDto);

        OutsourcingResponsePostDto outsourcingInfo = OutsourcingResponsePostDto.builder().outsourcingId(1)
                .userId("sanyang").client("d&f").title("이건 목업입니다.").content("목업")
                .images(list).build();

        responseBody.put(MESSAGE, "외주 비밀번호 일치");
        responseBody.put("outsourcingInfo", outsourcingInfo);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<Object> searchOutsourcingByName(@PathVariable("name") String searchName) {
        log.info("===== [OutsourcingController] searchOutsourcingByName start");
        log.debug("searchName: {}", searchName);

        Map<String, Object> responseBody = new HashMap<>();

        List<OutsourcingSearchResponseGetDto> list = new ArrayList<>();
        for(int i=0; i<5; i++) {
            OutsourcingSearchResponseGetDto dto = OutsourcingSearchResponseGetDto.builder().outsourcingId((i+1))
                    .userId("sanyang").client("d&f")
                    .title("목업 작업중" + (i+1)).startDate("2024-04-17").endDate("2024-04-18").build();
            list.add(dto);
        }

        log.info("outsourcingSearchList: {}", list);
        responseBody.put(MESSAGE, String.format("'%s' 이름으로 검색된 결과입니다.", searchName));
        responseBody.put("outsourcingSearchList", list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
