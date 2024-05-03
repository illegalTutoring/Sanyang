package com.b301.canvearth.domain.work.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@ToString
public class WorkResponseGetDto {

    private Long workId;
    private String userId;
    private String title;
    private String company;
    private String startDate;
    private String endDate;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul") //날짜 포멧 바꾸기
    private Date uploadDate;
    private List<String> tags;
    private String original;
    private String thumbnail;
    private String watermark;

    @Builder
    public WorkResponseGetDto(Long workId, String userId, String title, String company, String startDate,
                              String endDate, Date uploadDate, List<String> tags, String original,
                              String thumbnail, String watermark) {
        this.workId = workId;
        this.userId = userId;
        this.title = title;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
        this.uploadDate = uploadDate;
        this.tags = tags;
        this.original = original;
        this.thumbnail = thumbnail;
        this.watermark = watermark;
    }
}
