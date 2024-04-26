package com.b301.canvearth.domain.gallery.service;


import com.b301.canvearth.domain.gallery.entity.Gallery;
import com.b301.canvearth.domain.gallery.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public List<Gallery> findAllGallery(){
        log.info("======== Start galleryService.findALlGallery ==============");
        return galleryRepository.findAll();
    }
}
