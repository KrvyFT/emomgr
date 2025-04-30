package com.krvy.emomgr.controller;

import com.krvy.emomgr.database.Employee;
import com.krvy.emomgr.service.EmployeeService;

public class EmployeeController {
    private EmployeeService employeeService;

    public void createEmployee(Employee employee) {
        employeeService.createEmployee(employee);
    }
}
