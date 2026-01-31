package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.dto.AdminLoginRequestDto;
import com.mbpluslevante.backend.model.Admin;
import com.mbpluslevante.backend.repository.AdminRepository;
import com.mbpluslevante.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AdminServiceImpl implements AdminService
{
    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }
    @Override
    public boolean login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username).orElse(null);
        return admin != null && admin.getPassword().equals(password);
    }
}
