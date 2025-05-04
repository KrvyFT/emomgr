package com.krvy.emomgr.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krvy.emomgr.database.Salary;
import com.krvy.emomgr.repository.SalaryRepository;

@Service
public class SalaryService implements Services<Salary> {
    private SalaryRepository salaryRepository;

    @Override
    public Salary save(Salary entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }
        if (entity.getEmployeeID() == null) {
            throw new IllegalArgumentException("Employee ID cannot be null for save operation");
        }
        return salaryRepository.save(entity);
    }

    @Override
    public Optional<Salary> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return salaryRepository.findById(id);
    }

    @Override
    public Iterable<Salary> findAll() {
        return salaryRepository.findAll();
    }

    @Override
    public Salary update(Salary entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }
        if (entity.getEmployeeID() == null) {
            throw new IllegalArgumentException("Employee ID cannot be null for update operation");
        }
        if (!salaryRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("Cannot update non-existent salary with ID: " + entity.getId());
        }
        return salaryRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        if (!salaryRepository.existsById(id)) {
            throw new IllegalArgumentException("Cannot delete non-existent salary with ID: " + id);
        }
        salaryRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return salaryRepository.existsById(id);
    }

    @Override
    public long count() {
        return salaryRepository.count();
    }

}
