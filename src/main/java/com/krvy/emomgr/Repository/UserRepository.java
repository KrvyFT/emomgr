package com.krvy.emomgr.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.krvy.emomgr.database.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findById(long id);

    Optional<User> findByUsernameAndPassword(String username, String password);

    @Query("SELECT password FROM User  WHERE username = :username")
    public String findPasswordByUsername(String username);

    boolean existsByUsername(String username);

    default User saveUser(User user) {
        return save(user);
    }

}