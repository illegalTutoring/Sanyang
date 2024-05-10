package com.b301.canvearth.domain.support.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SupportLink {

    private final String name;
    private final String link;

    @Builder
    public SupportLink(String name, String link) {
        this.name = name;
        this.link = link;
    }
}
