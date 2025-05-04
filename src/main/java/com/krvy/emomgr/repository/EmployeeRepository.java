package com.krvy.emomgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krvy.emomgr.database.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByName(String name);

    boolean existsByName(String name);

    boolean existsByCode(String code);

    Employee update(Employee employee);
}