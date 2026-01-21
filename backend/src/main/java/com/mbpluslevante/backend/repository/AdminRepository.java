package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.Admin;
import com.mbpluslevante.backend.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>
{
    Optional<Admin> findByUsername(String username);
}
