package com.b301.canvearth.domain.calendar.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Cleanup;
import lombok.Getter;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name="Calendar")
public class Calendar {

    @Id
    @Column(name="calendar_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable = false)
    private String userId;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="company")
    private String company;

    @Column(name="start_date")
    private String startDate;

    @Column(name="end_date")
    private String endDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="upload_date")
    private Date uploadDate;

    @Type(ListArrayType.class)
    @Column(columnDefinition = "varchar[]")
    private List<String> tag;

    @Column(name="original_path")
    private String originalPath;

    @Column(name="thumbnail_path")
    private String thumbnailPath;

    @Column(name="watermark_path")
    private String watermarkPath;

    @Builder
    public Calendar(Long id, String userId, String title, String company, String startDate, String endDate, Date uploadDate,
                    List<String> tag, String originalPath, String thumbnailPath, String watermarkPath) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
        this.uploadDate = uploadDate;
        this.tag = tag;
        this.originalPath = originalPath;
        this.thumbnailPath = thumbnailPath;
        this.watermarkPath = watermarkPath;
    }
}
