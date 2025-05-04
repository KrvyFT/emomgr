package com.krvy.emomgr.controller;

import com.krvy.emomgr.database.Employee;
import com.krvy.emomgr.service.EmployeeService;

public class EmployeeController {
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    public Employee getEmployeeById(long id) {
        var employee = employeeService.findById(id);
        if (employee.isPresent()) {
            return employee.get();
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

}
