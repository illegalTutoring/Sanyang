package com.b301.canvearth.domain.gallery.entity;

import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.List;

@Entity
@Getter @ToString
@Table(name = "gallery")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Gallery {
    @Id
    @Column(name="gallery_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long galleryId;

    @Column(name = "user_id" , nullable = false)
    private String userId;

    @Column(name = "title", nullable = false)
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "upload_date" , nullable = false)
    private String uploadDate;

    @Column(name = "create_date")
    private String createDate;

    @Type(value = StringArrayType.class)
    @Column(name = "tag", columnDefinition = "varchar[]", nullable = true)
    private List<String> tag;

    @Column(name = "original_path" , nullable = false)
    private String original;

    @Column(name = "thumbnail_path")
    private String thumbnail;

    @Column(name = "watermark_path")
    private String watermark;


    @Builder
    public Gallery(String userId, String title, String createDate, List<String> tag, String original, String thumbnail, String watermark) {
        this.userId = userId;
        this.title = title;
        this.createDate = createDate;
        this.tag = tag;
        this.original = original;
        this.thumbnail = thumbnail;
        this.watermark = watermark;
    }
}
