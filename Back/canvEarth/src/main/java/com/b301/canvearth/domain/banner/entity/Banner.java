package com.b301.canvearth.domain.banner.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @ToString
@Table(name = "banner")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Banner {

    @Id
    @Column(name = "banner_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannerId;

    @Column(name="image_path", nullable = false)
    private String path;

    @Column(name = "coordinate_x")
    private double coordinateX;

    @Column(name = "coordinate_y")
    private double coordinateY;

    @Builder
    public Banner(String path, double coordinateX, double coordinateY) {
        this.path = path;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }
}
