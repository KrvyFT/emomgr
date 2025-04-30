package com.krvy.emomgr.database;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findById(long id);

    Optional<User> findByUsernameAndPassword(String username, String password);

    @Query("SELECT password FROM User  WHERE username = :username")
    public String findPasswordByUsername(String username);

}