package com.krvy.emomgr.service;

import com.krvy.emomgr.database.Employee;
import com.krvy.emomgr.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService implements Services<Employee> {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee save(Employee entity) {
        return employeeRepository.save(entity);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Iterable<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee update(Employee entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }
        if (entity.getId() == null) {
            throw new IllegalArgumentException("Entity ID cannot be null for update operation");
        }
        if (!employeeRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("Cannot update non-existent employee with ID: " + entity.getId());
        }
        return employeeRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return employeeRepository.existsById(id);
    }

    @Override
    public long count() {
        return employeeRepository.count();
    }
}
