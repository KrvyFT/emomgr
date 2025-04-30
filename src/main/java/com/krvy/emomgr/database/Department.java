package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "部门名称", nullable = true, unique = false, length = 50)
    private String name;

    @Column(name = "部门描述", nullable = true, unique = false, length = 50)
    private String description;

    @Column(name = "创建时间", nullable = false, unique = false, length = 50)
    private Date create_time;

    @Column(name = "更新时间", nullable = false, unique = false, length = 50)
    private Date update_time;
}