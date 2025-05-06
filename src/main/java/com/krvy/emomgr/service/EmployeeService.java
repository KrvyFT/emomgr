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
    public Employee update(Long id, Employee entity) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    existingEmployee.setName(entity.getName());
                    existingEmployee.setPosition(entity.getPosition());
                    existingEmployee.setDepartmentId(entity.getDepartmentId());
                    return employeeRepository.save(existingEmployee);
                })
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
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
