package com.b301.canvearth.domain.notice.repository;

import com.b301.canvearth.domain.notice.entity.Notice;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @NonNull
    Page<Notice> findAll(@NonNull Pageable pageable);

    Notice findTop1ByOrderByIdDesc();

    Long countBy();
}
