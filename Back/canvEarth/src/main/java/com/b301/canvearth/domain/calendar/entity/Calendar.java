package com.b301.canvearth.domain.calendar.entity;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name="Calendar")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Calendar {

    @Id
    @Column(name="calendar_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable = false)
    private String userId;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="start_date")
    private String startDate;

    @Column(name="end_date")
    private String endDate;

    @Builder
    public Calendar(Long id, String userId, String title, String startDate, String endDate) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
