package com.krvy.emomgr.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krvy.emomgr.database.Salary;
import com.krvy.emomgr.service.SalaryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/salarys")
public class SalaryController {
    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping
    public ResponseEntity<List<Salary>> getAllSalarys() {
        List<Salary> salarys = (List<Salary>) salaryService.findAll();
        return ResponseEntity.ok(salarys);
    }

    @GetMapping("/{id}")
    public Salary ResponseEntity(@PathVariable Long id) {
        return salaryService.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Salary> createSalary(@Valid @RequestBody Salary salary) {
        Salary savedSalary = salaryService.save(salary);
        return new ResponseEntity<>(savedSalary, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salary> updateSalary(@PathVariable long id,
            @Valid @RequestBody Salary salaryDetails) {
        Salary updatedSalary = salaryService.update(id, salaryDetails);
        return ResponseEntity.ok(updatedSalary);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalary(@PathVariable long id) {
        salaryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
