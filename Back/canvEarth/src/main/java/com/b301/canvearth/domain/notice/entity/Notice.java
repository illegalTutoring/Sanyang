package com.b301.canvearth.domain.notice.entity;

import com.b301.canvearth.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@DynamicUpdate
@Getter @ToString
@Table(name = "notice")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {

    @Id
    @Column(name = "notice_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;


    @Column(name = "notice_title")
    private String title;

    @Column(name = "notice_content")
    private String content;

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul") //날짜 포멧 바꾸기
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="notice_reg_date")
    private Date registDate;

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul") //날짜 포멧 바꾸기
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="notice_mod_date")
    private Date modifyDate;

    @Column(name = "notice_views")
    @ColumnDefault("0")
    private int views;

    public void updateNotice(String title, String content){
        this.title = title;
        this.content = content;
    }

    public void updateViews(int views){
        this.views = views;
    }

    @Builder
    public Notice(User user, String title, String content) {
        this.user = user;
        this.title = title;
        this.content = content;

    }
}
