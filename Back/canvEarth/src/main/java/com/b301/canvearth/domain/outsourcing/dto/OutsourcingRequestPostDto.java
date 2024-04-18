package com.b301.canvearth.domain.outsourcing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class OutsourcingRequestPostDto {

    private String outsourcingPassword;

    @Builder
    public OutsourcingRequestPostDto(String outsourcingPassword) {
        this.outsourcingPassword = outsourcingPassword;
    }
}
