package com.b301.canvearth.domain.admin.dto.request;

import com.b301.canvearth.domain.support.entity.SupportLink;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class SupportRequestPostDto {

    private final String title;
    private final List<SupportLink> supportLink;
    private final String content;

    @Builder
    public SupportRequestPostDto(String title, List<SupportLink> supportLink, String content) {
        this.title = title;
        this.supportLink = supportLink;
        this.content = content;
    }

    public String isValid() {
        String isValid = "valid";

        if(title == null || title.isEmpty()) {
            isValid = "title";
        } else if(supportLink == null || supportLink.isEmpty()) {
            isValid = "supportLink";
        }

        return isValid;
    }
}
