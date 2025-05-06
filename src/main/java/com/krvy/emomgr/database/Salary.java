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

    public Long getEmployeeID() {
        return employeeId;
    }

    public void setEmployeeID(Long employeeId) {
        this.employeeId = employeeId;
    }

    public int getSalaryAmount() {
        return salaryAmount;
    }

    public void setSalaryAmount(int salaryAmount) {
        this.salaryAmount = salaryAmount;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
