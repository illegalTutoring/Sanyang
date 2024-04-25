package com.b301.canvearth.domain.work.repository;

import com.b301.canvearth.domain.work.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
}
