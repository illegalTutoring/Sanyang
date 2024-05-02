package com.b301.canvearth.domain.embed.entity;

public enum EmbedType {
    YOUTUBE(0), CAFE(1), INSTAGRAM(2), X(3), ARTSTATION(4), PIXIV(5), ETC(6);

    private final int value;

    EmbedType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
