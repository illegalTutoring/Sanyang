package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class OutsourcingResponsePostDto {

    private final int outsourcingId;
    private final String userId;
    private final String client;
    private final String title;
    private final String content;
    private final List<OutsourcingImageInfoDto> images;

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
