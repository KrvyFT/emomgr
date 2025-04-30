package com.krvy.emomgr.service;

import com.krvy.emomgr.database.Employee;
import com.krvy.emomgr.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Creates a new employee
     * 
     * @param employee the employee information to save
     * @return the saved employee with generated ID
     */
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    /**
     * Finds an employee by their ID
     * 
     * @param id the employee ID
     * @return the employee if found
     */
    public Optional<Employee> findEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    /**
     * Retrieves all employees
     * 
     * @return list of all employees
     */
    public Iterable<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
