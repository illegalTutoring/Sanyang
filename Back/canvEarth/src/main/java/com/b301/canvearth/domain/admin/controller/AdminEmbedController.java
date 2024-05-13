package com.b301.canvearth.domain.admin.controller;

import com.b301.canvearth.domain.admin.dto.request.EmbedRequestPutDto;
import com.b301.canvearth.domain.embed.service.EmbedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin/embed")
@Tag(name = "admin embed", description = "ADMIN EMBED API")
public class AdminEmbedController {

    private final EmbedService embedService;

    private static final String MESSAGE = "message";

    @PutMapping
    @Operation(summary = "REQ-ADMIN-04", description = "임베드 링크 변경")
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> modifyEmbedLink(@RequestBody List<EmbedRequestPutDto> data){

        log.info("===== [AdminEmbedController] modifyEmbedLink START =====");
        log.info("data: {}", data);

        Map<String, Object> responseBody = new HashMap<>();
        String m = embedService.updateEmbed(data);
        responseBody.put(MESSAGE, m);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }



}
