package com.b301.canvearth.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/*
    User Entity : PostgreSQL 에서 User 예약어가 존재하기 때문에 실제 table 이름은 Member 이다.
        1. id : 아이디
        2. username : 유저 네임 or 닉네임 (유니크)
        3. userPassword : 비밀번호
        4. role : 권한
 */
@Entity
@Getter
@Setter
@ToString
@Table(name="Member")
public class User {

    @Id
    private String id;
    @Column(unique=true, nullable=false)
    private String userName;
    @Column(nullable=false)
    private String userPassword;
    @Column(nullable=false)
    private String role;
}
