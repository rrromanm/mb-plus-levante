package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.AdminLoginRequestDto;
import com.mbpluslevante.backend.service.AdminService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "AdminController")
public class AdminController
{
    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequestDto admin) {
        boolean success = adminService.login(
                admin.getUsername(),
                admin.getPassword()
        );
        if (!success) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok("Login successful");
    }
}
