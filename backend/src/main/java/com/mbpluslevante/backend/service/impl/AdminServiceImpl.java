package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.dto.AdminLoginRequestDto;
import com.mbpluslevante.backend.model.Admin;
import com.mbpluslevante.backend.repository.AdminRepository;
import com.mbpluslevante.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AdminServiceImpl implements AdminService
{
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public boolean login(String username, String password) {
        Admin admin = adminRepository
                .findByUsername(username)
                .orElse(null);

        if (admin == null) {
            return false;
        }

        return passwordEncoder.matches(password, admin.getPasswordHash());
    }
}
