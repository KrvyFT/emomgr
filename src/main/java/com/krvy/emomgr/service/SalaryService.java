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
    public Salary update(Long id, Salary entity) {
        return salaryRepository.findById(id)
                .map(existingSalary -> {
                    if (entity.getEmployeeID() == null) {
                        throw new IllegalArgumentException("Employee ID cannot be null for update operation");
                    }
                    existingSalary.setEmployeeID(entity.getEmployeeID());
                    existingSalary.setSalaryAmount(entity.getSalaryAmount());
                    existingSalary.setPayDate(entity.getPayDate());
                    return salaryRepository.save(existingSalary);
                })
                .orElseThrow(() -> new RuntimeException("Salary not found with id: " + id));
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
