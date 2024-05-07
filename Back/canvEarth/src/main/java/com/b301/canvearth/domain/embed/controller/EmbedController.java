package com.b301.canvearth.domain.embed.controller;

import com.b301.canvearth.domain.embed.dto.EmbedListResponseGetDto;
import com.b301.canvearth.domain.embed.service.EmbedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@Tag(name = "embed", description = "EMBED API")
@RequestMapping("/api/embed")
@RequiredArgsConstructor
public class EmbedController {

    private final EmbedService embedService;
    private static final String MESSAGE ="message";

    @GetMapping()
    @Operation(summary = "REQ-EMBED-01", description = "임베드 링크 보기")
    @ApiResponse(responseCode = "200", description = "")
    public ResponseEntity<Object> getEmbedLink(){
        Map<String, Object> responseBody = new HashMap<>();

        log.info("===== [EmbedController] getEmbedLink START =====");

        List<EmbedListResponseGetDto> data = embedService.findAllEmbed();

        log.info("embed list: {}", data);

        responseBody.put(MESSAGE, "배너 목록 전달 완료");
        responseBody.put("data", data);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
