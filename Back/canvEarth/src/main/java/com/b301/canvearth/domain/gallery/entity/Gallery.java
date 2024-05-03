package com.b301.canvearth.domain.gallery.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Getter @ToString
@Table(name = "gallery")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Gallery {
    @Id
    @Column(name="gallery_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id" , nullable = false)
    private String userId;

    @Setter
    @Column(name = "title", nullable = false)
    private String title;

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul") //날짜 포멧 바꾸기
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "upload_date" , nullable = false)
    private Date uploadDate;

    @Setter
    @Column(name = "create_date")
    private String createDate;

    @Setter
    @Type(ListArrayType.class)
    @Column(columnDefinition = "varchar[]")
    private List<String> tags;

    @Setter
    @Column(name = "original_path" , nullable = false)
    private String originalPath;

    @Setter
    @Column(name = "thumbnail_path")
    private String thumbnailPath;

    @Setter
    @Column(name = "watermark_path")
    private String watermarkPath;

    @Builder

    public Gallery(Long id, String userId, String title, Date uploadDate, String createDate, List<String> tags,
                   String originalPath, String thumbnailPath, String watermarkPath) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.uploadDate = uploadDate;
        this.createDate = createDate;
        this.tags = tags;
        this.originalPath = originalPath;
        this.thumbnailPath = thumbnailPath;
        this.watermarkPath = watermarkPath;
    }
}
