package com.krvy.emomgr.controller;

import com.krvy.emomgr.database.User;
import com.krvy.emomgr.service.UserService;
import com.krvy.emomgr.util.JwtUtil;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password) {
        var pwd = userService.findPasswordByUsername(username);
        Map<String, Object> response = new HashMap<>();
        if (pwd == null) {
            response.put("status", "error");
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }
        try {
            if (username.equals(username) && pwd.equals(password)) {
                User user = userService.getUserByUsername(username);
                String token = JwtUtil.generateToken(username);
                response.put("id", user.getId());
                response.put("username", user.getUsername());
                response.put("avatar", user.getAvatar());
                response.put("sex", user.getSex());
                response.put("age", user.getAge());
                response.put("token", token);

                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error during login: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }

        response.put("status", "error");
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam int Age,
            @RequestParam int Sex) {
        Map<String, Object> response = new HashMap<>();
        if (userService.existsByUsername(username)) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return ResponseEntity.status(409).body(response);
        }

        try {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setAge(Age);
            user.setSex(Sex);
            user.setAvatar("Default");

            long millis = System.currentTimeMillis();
            Date date = new Date(millis);
            user.setCreateTime(date);
            user.setUpdateTime(date);

            userService.saveUser(user);

            String token = JwtUtil.generateToken(username);

            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("avatar", user.getAvatar());
            response.put("sex", user.getSex());
            response.put("age", user.getAge());
            response.put("token", token);
            response.put("status", "success");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error creating user: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
