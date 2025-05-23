package com.krvy.emomgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krvy.emomgr.database.Salary;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {

}
