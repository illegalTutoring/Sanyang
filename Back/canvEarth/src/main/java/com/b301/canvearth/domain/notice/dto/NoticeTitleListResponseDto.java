package com.b301.canvearth.domain.notice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter @ToString
public class NoticeTitleListResponseDto {

    private Long id;
    private String title;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private Date registDate;

    @Builder
    public NoticeTitleListResponseDto(Long id, String title, Date registDate) {
        this.id = id;
        this.title = title;
        this.registDate = registDate;
    }
}
