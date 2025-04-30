package com.krvy.emomgr.service;

import com.krvy.emomgr.database.User;
import com.krvy.emomgr.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 根据用户名查找用户
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // 根据 ID 查找用户
    public User getUserById(long id) {
        return userRepository.findById(id);
    }

    // 验证用户名和密码
    public Optional<User> validateUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public String findPasswordByUsername(String username) {
        return userRepository.findPasswordByUsername(username);
    }

    // 检查用户名是否存在
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // 保存用户
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
