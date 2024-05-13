package com.b301.canvearth.domain.notice.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter @ToString
public class NoticeDto {
    private final Long id;

    private final String username;

    private final String title;

    private final String content;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private final Date registDate;

    private  final int views;

    @Builder
    public NoticeDto(Long id, String username, String title, String content, Date registDate, int views) {
        this.id = id;
        this.username = username;
        this.title = title;
        this.content = content;
        this.registDate = registDate;
        this.views = views;
    }
}
