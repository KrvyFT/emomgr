package com.krvy.emomgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krvy.emomgr.database.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
