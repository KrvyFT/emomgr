package com.krvy.emomgr.service;

import com.krvy.emomgr.database.User;
import com.krvy.emomgr.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService implements Services<User> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(User entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }
        return userRepository.save(entity);
    }

    @Override
    public Optional<User> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return userRepository.findById(id);
    }

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User update(Long id, User entity) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(entity.getUsername());
                    if (entity.getPassword() != null) {
                        existingUser.setPassword(entity.getPassword());
                    }
                    if (entity.getAvatar() != null) {
                        existingUser.setAvatar(entity.getAvatar());
                    }
                    existingUser.setSex(entity.getSex());
                    existingUser.setAge(entity.getAge());
                    existingUser.setUpdateTime(new Date());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Cannot delete non-existent user with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public long count() {
        return userRepository.count();
    }

    public String findPasswordByUsername(String username) {
        return userRepository.findPasswordByUsername(username);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
