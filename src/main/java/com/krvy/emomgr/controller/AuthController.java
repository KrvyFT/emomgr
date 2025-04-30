package com.krvy.emomgr.controller;

import com.krvy.emomgr.database.User;
import com.krvy.emomgr.service.UserService;
import com.krvy.emomgr.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService; // 使用依赖注入

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password) {
        var status = false;
        var pwd = userService.findPasswordByUsername(username);
        Map<String, Object> response = new HashMap<>();

        if (username.equals(username) && pwd.equals(password)) {
            status = true;

            User user = userService.getUserByUsername(username);
            String token = JwtUtil.generateToken(username);
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("avatar", user.getAvatar());
            response.put("sex", user.getSex());
            response.put("age", user.getAge());
            response.put("token", token);
            response.put("status", status);

            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }
}
