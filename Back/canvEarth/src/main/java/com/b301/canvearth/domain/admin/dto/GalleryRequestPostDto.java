package com.b301.canvearth.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class GalleryRequestPostDto {

    private final String userId;
    private final String title;
    private final String createDate;
    private final List<String> tags;

    @Builder
    public GalleryRequestPostDto(String userId, String title, String createDate, List<String> tags) {
        this.userId = userId;
        this.title = title;
        this.createDate = createDate;
        this.tags = tags;
    }

    public String isValid() {
        String isValid = "valid";

        if(userId == null || userId.isEmpty()) {
            isValid = "userId";
        } else if(title == null || title.isEmpty()) {
            isValid = "title";
        } else if(createDate == null || createDate.isEmpty()) {
            isValid = "startDate";
        } else if(tags == null || tags.isEmpty()) {
            isValid = "tags";
        }
        return isValid;
    }
}
