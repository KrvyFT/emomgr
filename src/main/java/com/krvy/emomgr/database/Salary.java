package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "salary")
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = true, unique = true, length = 50)
    private Long employeeId;

    @Column(name = "salary_amount", nullable = true, unique = false, length = 50)
    private int salaryAmount;

    @Column(name = "pay_date", nullable = true, unique = false, length = 50)
    private Date payDate;

    @Column(name = "create_time", nullable = false, unique = true, length = 50)
    private Date createTime;

    @Column(name = "update_time", nullable = false, unique = true, length = 50)
    private Date updateTime;
}
