package com.b301.canvearth.domain.admin.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class GalleryRequestPostDto {

    private final String title;
    private final String createDate;
    private final List<String> tags;

    @Builder
    public GalleryRequestPostDto(String title, String createDate, List<String> tags) {
        this.title = title;
        this.createDate = createDate;
        this.tags = tags;
    }

    public String isValid() {
        String isValid = "valid";

        if(title == null || title.isEmpty()) {
            isValid = "title";
        } else if(createDate == null || createDate.isEmpty()) {
            isValid = "startDate";
        } else if(tags == null) {
            isValid = "tags";
        }
        return isValid;
    }
}
