package com.b301.canvearth.domain.user.repository;

import com.b301.canvearth.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
//    Boolean existsByUsername(String username);
    Boolean existsByUserName(String userName);
}