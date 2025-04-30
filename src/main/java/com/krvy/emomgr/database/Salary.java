package com.krvy.emomgr.database;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "salary")
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "员工ID", nullable = true, unique = true, length = 50)
    private Long employee_id;

    @Column(name = "薪资金额", nullable = true, unique = false, length = 50)
    private int salary_amount;

    @Column(name = "发放时间", nullable = true, unique = false, length = 50)
    private Date pay_date;

    @Column(name = "创建时间", nullable = false, unique = true, length = 50)
    private Date create_time;

    @Column(name = "更新时间", nullable = false, unique = true, length = 50)
    private Date update_time;
}
