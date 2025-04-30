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

    @Column(name = "创建时间", nullable = false, unique = true, length = 50)
    private Date create_time;

    @Column(name = "更新时间", nullable = false, unique = true, length = 50)
    private Date update_time;

    @Column(name = "用户名", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "密码", nullable = false, unique = true, length = 50)
    private String password;

    @Column(name = "头像", nullable = false, unique = true, length = 50)
    private String photo;

    @Column(name = "性别", nullable = false, unique = true, length = 50)
    private boolean sex;

    @Column(name = "年龄", nullable = false, unique = true, length = 50)
    private int age;
}
