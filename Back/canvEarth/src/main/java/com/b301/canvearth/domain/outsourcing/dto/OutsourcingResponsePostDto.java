package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class OutsourcingResponsePostDto {

    private int outsourcingId;
    private String userId;
    private String client;
    private String title;
    private String content;
    private List<OutsourcingImageInfoDto> images;

    @Builder
    public OutsourcingResponsePostDto(int outsourcingId, String userId, String client, String title, String content, List<OutsourcingImageInfoDto> images) {
        this.outsourcingId = outsourcingId;
        this.userId = userId;
        this.client = client;
        this.title = title;
        this.content = content;
        this.images = images;
    }
}
