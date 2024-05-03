package com.b301.canvearth.domain.notice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class NoticeTitleListResponseDto {

    private Long id;
    private String title;

    @Builder
    public NoticeTitleListResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
