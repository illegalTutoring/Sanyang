package com.b301.canvearth.domain.gallery.repository;

import com.b301.canvearth.domain.gallery.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    @Query(value = "SELECT * FROM gallery WHERE tags @> CAST(ARRAY(SELECT unnest(:searchTags)) AS varchar[])", nativeQuery = true)
    List<Gallery> findByTagsContaining(String[] searchTags);
}
