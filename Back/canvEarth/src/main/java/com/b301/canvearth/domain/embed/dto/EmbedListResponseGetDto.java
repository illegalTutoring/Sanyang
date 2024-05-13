package com.b301.canvearth.domain.embed.dto;

import com.b301.canvearth.domain.embed.entity.EmbedType;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class EmbedListResponseGetDto {
    private EmbedType type;
    private String link;

    @Builder
    public EmbedListResponseGetDto(EmbedType type, String link) {
        this.type = type;
        this.link = link;
    }
}
