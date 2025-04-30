package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "员工姓名", nullable = true, unique = false, length = 50)
    private String name;

    @Column(name = "所属部门ID", nullable = true, unique = true, length = 50)
    private Long department_id;

    @Column(name = "职位", nullable = true, unique = false, length = 50)
    private String position;

    @Column(name = "入职日期", nullable = true, unique = false, length = 50)
    private Date hire_date;

    @Column(name = "创建时间", nullable = false, unique = false, length = 50)
    private Date create_time;

    @Column(name = "更新时间", nullable = false, unique = false, length = 50)
    private Date update_time;
}
