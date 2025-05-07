package com.krvy.emomgr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krvy.emomgr.database.Department;
import com.krvy.emomgr.repository.DepartmentRepository;

@Service
public class DepartmentService implements Services<Department> {
    @Autowired
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
    public Department update(Long id, Department entity) {
        return departmentRepository.findById(id)
                .map(existingDepartment -> {
                    existingDepartment.setName(entity.getName());
                    existingDepartment.setDescription(entity.getDescription());
                    return departmentRepository.save(existingDepartment);
                })
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
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
