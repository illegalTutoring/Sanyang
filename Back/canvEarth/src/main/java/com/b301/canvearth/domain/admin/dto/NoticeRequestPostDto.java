package com.b301.canvearth.domain.admin.dto;

import com.b301.canvearth.domain.admin.entity.News;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class NoticeRequestPostDto {

    private String title;
    private String content;


    public NoticeRequestPostDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
