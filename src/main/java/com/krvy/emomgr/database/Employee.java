package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = true)
    private String name;

    @Column(name = "department_id", nullable = true)
    private Long departmentId;

    @Column(name = "position", length = 100)
    private String position;

    @Column(name = "hire_date")
    private Date hireDate;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "update_time")
    private Date updateTime;
}
