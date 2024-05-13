package com.b301.canvearth.domain.banner.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @ToString
@Table(name = "banner")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Banner {

    @Id
    @Column(name="image_path", nullable = false, unique = true)
    private String path;

    @Column(name = "coordinate_x")
    private double coordinateX;

    @Column(name = "coordinate_y")
    private double coordinateY;

    @Column(name = "banner_order")
    private int order;

    @Builder
    public Banner(String path, double coordinateX, double coordinateY, int order) {
        this.path = path;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.order = order;
    }
}
