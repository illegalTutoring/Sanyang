package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OutsourcingImageInfoDto {

    private String imagePath;

    @Builder
    public OutsourcingImageInfoDto(String imagePath) {
        this.imagePath = imagePath;
    }
}
