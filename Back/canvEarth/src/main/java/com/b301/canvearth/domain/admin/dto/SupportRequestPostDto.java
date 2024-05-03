package com.b301.canvearth.domain.admin.dto;

import com.b301.canvearth.domain.support.entity.SupportLink;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@ToString
public class SupportRequestPostDto {

    private final String title;
    private final Date uploadDate;
    private final List<SupportLink> supportLink;
    private final String content;

    @Builder
    public SupportRequestPostDto(String title, Date uploadDate,
                                 List<SupportLink> supportLink, String content) {
        this.title = title;
        this.uploadDate = uploadDate;
        this.supportLink = supportLink;
        this.content = content;
    }

    public String isValid() {
        String isValid = "valid";

        if(title == null || title.isEmpty()) {
            isValid = "title";
        }

        return isValid;
    }
}
