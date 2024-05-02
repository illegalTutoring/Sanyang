package com.b301.canvearth.domain.support.entity;

import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.util.Date;

@Entity
@Getter
@ToString
@Table(name="support")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Support {

    @Id
    @Column(name="support_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="support_thumbnail")
    private String supportThumbnail;

    @Column(name="title")
    private String title;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name="upload_date")
    private Date uploadDate;

//    @Convert(converter = SupportLink.class)
//    @Column(name="support_link", length=500)
    @Type(JsonBinaryType.class)
    @Column(name="support_link", columnDefinition = "jsonb")
    private SupportLink supportLink;

    @Column(name="content")
    private String content;
}
