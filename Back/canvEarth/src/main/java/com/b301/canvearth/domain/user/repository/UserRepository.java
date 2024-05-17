package com.b301.canvearth.domain.user.repository;

import com.b301.canvearth.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/*
    JPA UserRepository
        1. existByUserName : username 으로 데이터 유무 확인
        2. findByUserName : username 으로 데이터 검색
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUserName(String userName);
    User findByUserName(String userName);
}
