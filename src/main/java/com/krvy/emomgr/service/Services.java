package com.krvy.emomgr.service;

import java.util.Optional;

public interface Services<T> {
    // Create a new entity
    T save(T entity);

    // Retrieve an entity by ID
    Optional<T> findById(Long id);

    // Retrieve all entities
    Iterable<T> findAll();

    // Update an entity
    T update(Long id, T entity);

    // Delete an entity by ID
    void deleteById(Long id);

    // Check if an entity exists by ID
    boolean existsById(Long id);

    // Count total entities
    long count();
}
