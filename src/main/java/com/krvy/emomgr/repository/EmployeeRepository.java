package com.krvy.emomgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krvy.emomgr.database.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}