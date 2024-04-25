package com.b301.canvearth.domain.gallery.repository;

import com.b301.canvearth.domain.gallery.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

}
