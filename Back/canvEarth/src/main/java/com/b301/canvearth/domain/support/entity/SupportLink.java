package com.b301.canvearth.domain.support.entity;

import lombok.Getter;

@Getter
public class SupportLink {

    private final String name;
    private final String link;

    public SupportLink(String name, String link) {
        this.name = name;
        this.link = link;
    }
}
