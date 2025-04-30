package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "create_time", nullable = false, unique = true, length = 50)
    private Date createTime;

    @Column(name = "update_time", nullable = false, unique = true, length = 50)
    private Date updateTime;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password", nullable = false, unique = true, length = 50)
    private String password;

    @Column(name = "avatar", nullable = false, unique = true, length = 50)
    private String avatar;

    @Column(name = "sex", nullable = false, unique = true, length = 50)
    private int sex;

    @Column(name = "age", nullable = false, unique = true, length = 50)
    private int age;
}
