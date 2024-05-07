package com.b301.canvearth.domain.admin.dto.request;

import com.b301.canvearth.domain.embed.entity.EmbedType;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class EmbedRequestPutDto {
    private EmbedType type;
    private String link;
}
