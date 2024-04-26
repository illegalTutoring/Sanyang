package com.b301.canvearth.domain.admin.dto;

import com.b301.canvearth.domain.admin.entity.News;
import lombok.Getter;

@Getter
public class NoticeRequestPostDto {

    private String title;
    private String content;
    private News type;


    public NoticeRequestPostDto(String title, String content, News type) {
        this.title = title;
        this.content = content;
        this.type = type;
    }
}
