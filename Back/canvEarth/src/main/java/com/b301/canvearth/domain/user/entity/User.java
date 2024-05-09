package com.b301.canvearth.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
