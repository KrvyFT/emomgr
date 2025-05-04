package com.krvy.emomgr.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krvy.emomgr.database.Department;
import com.krvy.emomgr.repository.DepartmentRepository;

@Service
public class DepartmentService implements Services<Department> {
    private DepartmentRepository departmentRepository;

    @Override
    public Department save(Department entity) {
        return departmentRepository.save(entity);
    }

    @Override
    public Optional<Department> findById(Long id) {
        return departmentRepository.findById(id);
    }

    @Override
    public Iterable<Department> findAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Department update(Department entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }
        if (entity.getId() == null) {
            throw new IllegalArgumentException("Entity ID cannot be null for update operation");
        }
        if (!departmentRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("Cannot update non-existent department with ID: " + entity.getId());
        }
        return departmentRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        departmentRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return departmentRepository.existsById(id);
    }

    @Override
    public long count() {
        return departmentRepository.count();
    }

}
