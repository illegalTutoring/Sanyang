package com.b301.canvearth.domain.support.dto;

import com.b301.canvearth.domain.support.entity.SupportLink;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@ToString
public class SupportResponseGetDto {

    private final Long supportId;
    private final String thumbnail;
    private final String title;
    private final Date uploadDate;
    private final List<SupportLink> supportLink;
    private final String content;

    @Builder
    public SupportResponseGetDto(Long supportId, String thumbnail, String title, Date uploadDate,
                                 List<SupportLink> supportLink, String content) {
        this.supportId = supportId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.uploadDate = uploadDate;
        this.supportLink = supportLink;
        this.content = content;
    }
}
