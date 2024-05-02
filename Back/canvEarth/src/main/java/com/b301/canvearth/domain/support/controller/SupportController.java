package com.b301.canvearth.domain.support.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/support")
@Tag(name = "support", description = "SUPPORT API")
@Slf4j
public class SupportController {

    private static final String MESSAGE = "message";

}
