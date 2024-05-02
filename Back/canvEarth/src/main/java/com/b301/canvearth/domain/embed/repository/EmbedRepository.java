package com.b301.canvearth.domain.embed.repository;

import com.b301.canvearth.domain.embed.entity.Embed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmbedRepository extends JpaRepository<Embed, Integer> {
}
