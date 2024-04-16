package com.b301.canvearth.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="Member")
public class User {

    @Id
    // 정수형 ID 일때 사용하는 전략
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String user_name;
    private String user_password;
    private String role;
}
