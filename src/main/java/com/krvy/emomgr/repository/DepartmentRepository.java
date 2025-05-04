package com.krvy.emomgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krvy.emomgr.database.Department;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find department by name
    Optional<Department> findByName(String name);

    // Find departments by location
    List<Department> findByLocation(String location);

    // Find departments containing name (case insensitive)
    List<Department> findByNameContainingIgnoreCase(String nameFragment);

    // Count departments by location
    long countByLocation(String location);

    // Check if a department exists by name
    boolean existsByName(String name);
}
