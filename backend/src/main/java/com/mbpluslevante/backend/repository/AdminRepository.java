package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long>
{
    Optional<Admin> findByUsername(String username);
}
