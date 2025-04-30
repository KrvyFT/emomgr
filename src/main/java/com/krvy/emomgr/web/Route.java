package com.krvy.emomgr.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
class Route {
    @GetMapping("/{id}")
    public String getUserById(@PathVariable Long id) {
        return "User ID: " + id;
    }
}