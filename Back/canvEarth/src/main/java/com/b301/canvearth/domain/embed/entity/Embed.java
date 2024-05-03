package com.b301.canvearth.domain.embed.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "embed")
@ToString @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Embed {

    @Id
    @Column(name = "embed_id")
    private int order;

    @Column(name = "embed_type")
    private EmbedType type;

    @Column(name = "embed_link")
    private String link;

    @Builder
    public Embed(int order, EmbedType type, String link) {
        this.order = order;
        this.type = type;
        this.link = link;
    }
}
